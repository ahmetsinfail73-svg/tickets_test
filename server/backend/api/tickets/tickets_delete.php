<?php

$data     = json_decode(file_get_contents('php://input'), true);
$ticketId = (int) ($data['id'] ?? 0);

if ($ticketId <= 0) {
    respond(400, 'ID обязателен');
}

$result = db()->execute_query(
    'SELECT filepath FROM ticket_attachments WHERE ticket_id = ?',
    [$ticketId]
);

$files = [];
while ($row = $result->fetch_assoc()) {
    $files[] = $row['filepath'];
}

if (!empty($files) && !deleteFiles($files)) {
    respond(500, 'Ошибка при удалении файлов');
}

$result = db()->execute_query('DELETE FROM tickets WHERE id = ?', [$ticketId]);

if ($result === false || db()->affected_rows === 0) {
    respond(404, 'Тикет не найден');
}

respond(200, 'Тикет удалён');

