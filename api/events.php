<?php

declare(strict_types=1);

header('Access-Control-Allow-Origin: https://app-event.netlify.app');

// Inclut le fichier contenant les fonctions utilitaires (dbConnect, sendJson, etc.)
require_once __DIR__ . '/utils/functions.php';

// Établit une connexion à la base de données via PDO
$pdo = dbConnect();

// Exécute directement une requête pour récupérer les informations des événements
// Les résultats sont triés par date croissante (du plus ancien au plus récent)
$stmt = $pdo->query(
    'SELECT id, title, date_event, description, location, image 
     FROM events 
     ORDER BY date_event ASC'
);

// Récupère tous les résultats sous forme de tableau associatif
$events = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Envoie la liste des événements au format JSON (code HTTP 200 par défaut)
// - JSON_UNESCAPED_UNICODE : conserve les caractères spéciaux tels quels
// - JSON_PRETTY_PRINT : formate le JSON avec des sauts de ligne et des indentations pour plus de lisibilité
sendJson($events);
