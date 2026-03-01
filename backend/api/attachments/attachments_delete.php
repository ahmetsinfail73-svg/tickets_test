<?php

$fileId = (int) ($segments[2] ?? 0);

if ($fileId <= 0) {
    respond(400, 'ID обязателен');
}

$result     = db()->execute_query('SELECT filepath FROM ticket_attachments WHERE id = ?', [$fileId]);
$attachment = $result->fetch_assoc();

if (!$attachment) {
    respond(404, 'Вложение не найдено');
}

if (!deleteFiles([$attachment['filepath']])) {
    respond(500, 'Ошибка при удалении файла');
}

$result = db()->execute_query('DELETE FROM ticket_attachments WHERE id = ?', [$fileId]);

if ($result === false) {
    respond(404, 'Вложение не найдено');
}

respond(200, 'Вложение удалено');