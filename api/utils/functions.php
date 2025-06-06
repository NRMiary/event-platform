<?php
declare(strict_types=1);

// -------------------------------------------------------------------------------------------------
// Fonction utilitaire : Connexion PDO
// -------------------------------------------------------------------------------------------------
function dbConnect(): PDO {
    // -------------------------------------------------------------------------------------------------
    // Si on est en production sur InfinityFree, on utilise les identifiants fixes
    // On insère donc directement les paramètres de connexion MySQL tels qu'ils sont
    // -------------------------------------------------------------------------------------------------
    $ifHost = 'sql100.infinityfree.com';          
    $ifDb   = 'if0_39171481_multi_event';  
    $ifUser = 'if0_39171481';          
    $ifPass = 'appeventapi1234';           

    // Vérifier la variable $_SERVER['HTTP_HOST'] qui correspondra au domaine donné (app-event-api.infinityfreeapp.com).
    if (
        isset($_SERVER['HTTP_HOST']) &&
        strpos($_SERVER['HTTP_HOST'], 'infinityfreeapp.com') !== false
    ) {
        $host   = $ifHost;
        $db     = $ifDb;
        $user   = $ifUser;
        $pass   = $ifPass;
        $charset= 'utf8mb4';

        $dsn = "mysql:host={$host};dbname={$db};charset={$charset}";
        $opts = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        return new PDO($dsn, $user, $pass, $opts);
    }

    // -------------------------------------------------------------------------------------------------
    // Sinon on est en local (développement) : paramètres MySQL locaux
    // -------------------------------------------------------------------------------------------------
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
    if (ob_get_length()) {
        ob_clean();
    }
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}
