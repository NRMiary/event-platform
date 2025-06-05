<?php
declare(strict_types=1);

// -------------------------------------------------------------------------------------------------
// Fonction utilitaire : Connexion PDO
// -------------------------------------------------------------------------------------------------
function dbConnect(): PDO {
    $host   = '127.0.0.1';
    $db     = 'multi_event';
    $user   = 'root';
    $pass   = '';
    $charset= 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $opts = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    return new PDO($dsn, $user, $pass, $opts);
}

// -------------------------------------------------------------------------------------------------
// Fonction utilitaire : Envoi JSON et arrêt du script
// -------------------------------------------------------------------------------------------------
function sendJson(array $data, int $statusCode = 200): void {
    // Pas de sortie HTML préalable
    if (ob_get_contents()) {
        ob_clean();
    }
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}
