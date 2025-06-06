<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: http://localhost:5173');


// Inclut la fonction sendJson() et dbConnect()
require_once __DIR__ . '/utils/functions.php';

// Vérifie que $_GET['id'] est présent et numérique
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    sendJson(['error' => 'ID manquant ou invalide'], 400);
}

$eventId = (int) $_GET['id'];
$pdo     = dbConnect();

// Récupère l’événement
$stmt = $pdo->prepare('SELECT * FROM events WHERE id = :id');
$stmt->execute([':id' => $eventId]);
$event = $stmt->fetch();

if (!$event) {
    sendJson(['error' => 'Événement non trouvé'], 404);
}

// Envoie les données JSON de l’événement (200 OK)
sendJson($event);
