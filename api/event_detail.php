<?php
declare(strict_types=1);

// Inclut le fichier contenant les fonctions utilitaires (dbConnect, sendJson, etc.)
require_once __DIR__ . '/utils/functions.php';

// Vérifie que le paramètre "id" est présent dans l'URL et qu'il s'agit d'un nombre
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    // Envoie une réponse JSON avec un message d'erreur et le code HTTP 400 (Bad Request)
    sendJson(['error' => 'ID manquant ou invalide'], 400);
}

// Convertit la valeur de l'id en entier pour éviter les injections SQL et autres problèmes
$eventId = (int) $_GET['id'];

// Établit une connexion à la base de données en utilisant PDO
$pdo = dbConnect();

// Prépare la requête SQL pour récupérer l'événement correspondant à l'id fourni
$stmt = $pdo->prepare('SELECT * FROM events WHERE id = :id');

// Exécute la requête en liant le paramètre :id à la variable $eventId
$stmt->execute([':id' => $eventId]);

// Récupère le résultat de la requête (un tableau associatif représentant l'événement)
$event = $stmt->fetch();

// Si aucun événement n'a été trouvé avec cet id, on renvoie une erreur 404
if (!$event) {
    // Envoie une réponse JSON avec un message d'erreur et le code HTTP 404 (Not Found)
    sendJson(['error' => 'Événement non trouvé'], 404);
}

// Si l'événement existe, on renvoie ses données au format JSON (code HTTP 200 par défaut)
sendJson($event);
