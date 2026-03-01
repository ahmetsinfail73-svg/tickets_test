<?php

require __DIR__ . '/database.php';

$tables = [
    'tickets' => "
        CREATE TABLE IF NOT EXISTS tickets (
            id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title       VARCHAR(255)                          NOT NULL,
            description TEXT,
            priority    ENUM('low', 'medium', 'high')         NOT NULL DEFAULT 'medium',
            status      ENUM('open', 'in_progress', 'closed') NOT NULL DEFAULT 'open',
            created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ",
    'ticket_attachments' => "
        CREATE TABLE IF NOT EXISTS ticket_attachments (
            id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            ticket_id   INT UNSIGNED NOT NULL,
            filepath    VARCHAR(255) NOT NULL,
            size        INT UNSIGNED NOT NULL,
            uploaded_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ",
];

foreach ($tables as $name => $sql) {
    if (db()->query($sql)) {
        echo "Table '$name' — OK\n";
    } else {
        echo "Error creating '$name': " . db()->error . "\n";
    }
}
