<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: https://app-event.netlify.app');

// Gérer le pré-vol (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
// Désactive l’affichage des erreurs
ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');

// Inclut sendJson() et dbConnect()
require_once __DIR__ . '/utils/functions.php';

// Lit et décode le JSON du client
$input = json_decode(file_get_contents('php://input'), true);

// Vérifie que les champs requis sont présents
if (
    empty($input['event_id']) ||
    empty($input['name']) ||
    empty($input['email'])
) {
    sendJson(['error' => 'Données manquantes'], 400);
}

$eventId  = (int) $input['event_id'];
$fullName = trim($input['name']);
$email    = filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL);
$message  = isset($input['message']) ? trim($input['message']) : '';

if (!$email) {
    sendJson(['error' => 'E-mail invalide'], 400);
}

$pdo = dbConnect();

try {
    $stmt = $pdo->prepare("
        INSERT INTO registrations (event_id, name, email, message, created_at)
        VALUES (:event_id, :name, :email, :message, NOW())
    ");
    $stmt->execute([
        ':event_id' => $eventId,
        ':name'     => $fullName,
        ':email'    => $email,
        ':message'  => $message,
    ]);
    sendJson([
        'success' => true,
        'message' => 'Inscription enregistrée'
    ]);
} catch (PDOException $e) {
    // Ne pas renvoyer l’exception en clair, juste un message général
    sendJson(['error' => 'Erreur interne, impossible d’enregistrer'], 500);
}
