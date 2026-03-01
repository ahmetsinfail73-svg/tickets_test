<?php

function db(): mysqli
{
    static $mysqli = null;

    if ($mysqli === null) {
        $host = 'db';
        $user = 'appuser';
        $pass = 'secret';
        $db   = 'app';

        $mysqli = new mysqli($host, $user, $pass, $db);

        if ($mysqli->connect_error) {
            http_response_code(500);
            die(json_encode(['message' => 'Ошибка подключения к базе', 'statusCode' => 500]));
        }

        $mysqli->set_charset('utf8mb4');
    }

    return $mysqli;
}