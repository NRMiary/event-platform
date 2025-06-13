<?php
declare(strict_types=1);

// Désactiver la sortie des erreurs PHP en HTML
ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');

// En-têtes CORS
header('Access-Control-Allow-Origin: https://app-event.netlify.app');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// Gérer le pré-vol (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Router les requêtes
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method     = $_SERVER['REQUEST_METHOD'];

// Cas “GET /events/detail?id=...”
if ($method === 'GET' && $requestUri === '/events/detail') {
    // On inclut le script dédié, qui appellera sendJson(...)
    require __DIR__ . '/event_detail.php';
    exit;
}

switch ("$method $requestUri") {
    case 'GET /events':
        require __DIR__ . '/events.php';
        break;

    case 'POST /events/register':
        require __DIR__ . '/register.php';
        break;

    case 'POST /newsletter/subscribe':
        require __DIR__ . '/newsletter.php';
        break;

    default:
        http_response_code(404);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Endpoint non trouvé']);
        break;
}
