<?php
declare(strict_types=1);

// Récupère le chemin URI de la requête (sans la partie query string)
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Récupère la méthode HTTP utilisée pour la requête (GET, POST, etc.)
$method     = $_SERVER['REQUEST_METHOD'];

// Construction d’un identifiant unique pour la requête, composé de la méthode et du chemin URI
// Exemple : "GET /events" ou "POST /newsletter/subscribe"
switch ("$method $requestUri") {
    // Si la requête est un GET sur /events, on inclut le fichier events.php
    case 'GET /events':
        require __DIR__ . '/events.php';
        break;

    // Si la requête est un GET sur /events/detail, on inclut le fichier event_detail.php
    case 'GET /events/detail':
        require __DIR__ . '/event_detail.php';
        break;

    // Si la requête est un POST sur /events/register, on inclut le fichier register.php
    case 'POST /events/register':
        require __DIR__ . '/register.php';
        break;

    // Si la requête est un POST sur /newsletter/subscribe, on inclut le fichier newsletter.php
    case 'POST /newsletter/subscribe':
        require __DIR__ . '/newsletter.php';
        break;

    // Pour toute autre combinaison méthode + URI, on renvoie un code 404 et un message d’erreur JSON
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint non trouvé']);
        break;
}
