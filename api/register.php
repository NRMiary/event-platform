<?php
declare(strict_types=1);

// Inclut le fichier contenant les fonctions utilitaires (dbConnect, sendJson, etc.)
require_once __DIR__ . '/utils/functions.php';

// Récupère le contenu brut de la requête (format JSON) et le décode en tableau associatif
$input = json_decode(file_get_contents('php://input'), true);

// Vérifie que tous les champs requis sont présents dans les données reçues
if (
    empty($input['event_id']) ||   // ID de l'événement
    empty($input['firstname']) ||  // Prénom du participant
    empty($input['lastname']) ||   // Nom du participant
    empty($input['email'])         // Email du participant
) {
    // Envoie une réponse JSON avec un message d'erreur et le code HTTP 400 (Bad Request)
    sendJson(['error' => 'Données manquantes'], 400);
}

// Convertit l'ID de l'événement en entier pour éviter les injections et valider le type
$eventId = (int) $input['event_id'];
// Nettoie les champs texte en supprimant les espaces superflus
$first   = trim($input['firstname']);
$last    = trim($input['lastname']);
// Nettoie et valide l'adresse e-mail au format correct
$email   = filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL);

// Si l’email n’est pas valide (filter_var renvoie false), on renvoie une erreur
if (!$email) {
    // Envoie une réponse JSON avec un message d'erreur et le code HTTP 400 (Bad Request)
    sendJson(['error' => 'E-mail invalide'], 400);
}

// Établit une connexion à la base de données via PDO
$pdo = dbConnect();

// Prépare la requête SQL pour insérer une nouvelle inscription dans la table "registrations"
$stmt = $pdo->prepare("
    INSERT INTO registrations (event_id, firstname, lastname, email, created_at)
    VALUES (:event_id, :firstname, :lastname, :email, NOW())
");

// Exécute la requête en liant les paramètres aux variables correspondantes
$stmt->execute([
    ':event_id'  => $eventId,
    ':firstname' => $first,
    ':lastname'  => $last,
    ':email'     => $email,
]);

// Envoie une réponse JSON confirmant l'enregistrement de l’inscription (code HTTP 200 par défaut)
sendJson([
    'success' => true,
    'message' => 'Inscription enregistrée'
]);
