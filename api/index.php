<?php
declare(strict_types=1);

// Autoriser les requêtes CORS depuis localhost:5173 (ou utiliser '*' en dev)
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Gérer la requête pré-vol (OPTIONS) : on répond tout de suite
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Reste du routeur
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method     = $_SERVER['REQUEST_METHOD'];

switch ("$method $requestUri") {
    case 'GET /events':
        require __DIR__ . '/events.php';
        break;
    case 'GET /events/detail':
        require __DIR__ . '/event_detail.php';
        break;
    case 'POST /events/register':
        require __DIR__ . '/register.php';
        break;
    case 'POST /newsletter/subscribe':
        require __DIR__ . '/newsletter.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint non trouvé']);
        break;
}
