<?php

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/helpers.php';
require_once __DIR__ . '/config/dto.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$uri      = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$method   = $_SERVER['REQUEST_METHOD'];
$segments = explode('/', $uri);

if ($segments[0] !== 'api') {
    respond(404, 'Ресурс не найден');
}

$resource = $segments[1] ?? null;
$id       = $segments[2] ?? null;
$sub      = $segments[3] ?? null;

if ($resource === 'tickets' && $sub === 'attachments') {
    match ($method) {
        'POST'   => require __DIR__ . '/api/attachments/attachments_post.php',
        'GET'    => require __DIR__ . '/api/attachments/attachments_get.php',
        'DELETE' => require __DIR__ . '/api/attachments/attachments_delete.php',
        default  => respond(405, 'Метод не разрешён'),
    };
}

match ($resource) {
    'tickets' => match ($method) {
        'GET'    => $id
            ? require __DIR__ . '/api/tickets/tickets_get_one.php'
            : require __DIR__ . '/api/tickets/tickets_get.php',
        'POST'   => require __DIR__ . '/api/tickets/tickets_post.php',
        'PUT'    => require __DIR__ . '/api/tickets/tickets_put.php',
        'DELETE' => require __DIR__ . '/api/tickets/tickets_delete.php',
        default  => respond(405, 'Метод не разрешён'),
    },
    'attachments' => match ($method) {
        'GET'   => require __DIR__ . '/api/attachments/attachments_download.php',
        default => respond(405, 'Метод не разрешён'),
    },
    default => respond(404, 'Ресурс не найден'),
};