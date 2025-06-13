<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: https://app-event.netlify.app');

// Inclut le fichier contenant les fonctions utilitaires (dbConnect, sendJson, etc.)
require_once __DIR__ . '/utils/functions.php';

// Récupère le contenu brut de la requête (format JSON) et le décode en tableau associatif
$input = json_decode(file_get_contents('php://input'), true);

// Vérifie que le champ "email" est présent et qu'il est bien formé
if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    // Envoie une réponse JSON avec un message d'erreur et le code HTTP 400 (Bad Request)
    sendJson(['error' => 'E-mail invalide'], 400);
}

// Supprime les espaces superflus autour de l'adresse e-mail
$email = trim($input['email']);

// Établit une connexion à la base de données via PDO
$pdo = dbConnect();

// Prépare la requête SQL pour insérer l'adresse e-mail dans la table des abonnés à la newsletter
// - INSERT IGNORE : évite une erreur si l'e-mail existe déjà (ignore la duplication)
// - subscribed_at : enregistre la date et l'heure actuelles grâce à NOW()
$stmt = $pdo->prepare("
    INSERT IGNORE INTO newsletter_subscribers (email, subscribed_at)
    VALUES (:email, NOW())
");

// Exécute la requête en liant le paramètre :email à la variable $email
$stmt->execute([':email' => $email]);

// Envoie une réponse JSON confirmant l'inscription à la newsletter (code HTTP 200 par défaut)
sendJson([
    'success' => true,
    'message' => 'Email ajouté à la newsletter'
]);
