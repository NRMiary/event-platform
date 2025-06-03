<?php
declare(strict_types=1);

/**
 * Établit une connexion à la base de données MySQL en utilisant PDO.
 *
 * @return \PDO Objet PDO représentant la connexion à la base de données.
 * @throws \PDOException Si la connexion échoue.
 */
function dbConnect(): \PDO
{
    // Informations de connexion à la base de données
    $host    = '127.0.0.1';    // Adresse du serveur MySQL
    $port    = '3306';         // Port utilisé par MySQL
    $dbName  = 'multi_event';  // Nom de la base de données
    $user    = 'root';         // Nom d'utilisateur MySQL
    $pass    = '';             // Mot de passe MySQL (vide si aucun mot de passe défini)
    $charset = 'utf8mb4';      // Jeu de caractères à utiliser (recommandé pour supporter les emojis et caractères spéciaux)

    // Chaîne de connexion (Data Source Name) en précisant l'hôte, le port, le nom de la base et le charset
    $dsn = "mysql:host=$host;port=$port;dbname=$dbName;charset=$charset";

    try {
        // Création d'une instance PDO avec les options suivantes :
        // - ERRMODE_EXCEPTION : lance une exception en cas d'erreur SQL
        // - DEFAULT_FETCH_MODE : renvoie les résultats sous forme de tableau associatif
        // - EMULATE_PREPARES   : désactive l'émulation des requêtes préparées (utilise les vraies requêtes préparées de MySQL)
        return new \PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    } catch (\PDOException $e) {
        // Si une exception est levée lors de la connexion :
        // - Définit le code de réponse HTTP à 500 (erreur serveur)
        // - Renvoie un message JSON d'erreur avec les détails
        http_response_code(500);
        echo json_encode([
            'error' => 'Connexion MySQL impossible : ' . $e->getMessage()
        ]);
        exit; // Arrête l'exécution du script
    }
}

/**
 * Envoie une réponse JSON au client avec le code HTTP spécifié.
 *
 * @param mixed $data  Données à encoder en JSON.
 * @param int   $status Code de statut HTTP (par défaut 200).
 */
function sendJson($data, int $status = 200): void
{
    // Définit le code de statut HTTP de la réponse
    http_response_code($status);
    // Définit l'en-tête Content-Type pour indiquer que la réponse est du JSON UTF-8
    header('Content-Type: application/json; charset=utf-8');
    // Encode les données en JSON en conservant les caractères UTF-8 et en formatant pour la lisibilité
    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE | // Préserve les caractères Unicode tels quels (pas de \uXXXX)
        JSON_PRETTY_PRINT        // Indente le JSON pour une meilleure lisibilité
    );
    exit; // Arrête l'exécution du script après envoi de la réponse
}
