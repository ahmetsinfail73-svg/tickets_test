<?php

$fileId = (int) $segments[2];

$result = db()->execute_query('SELECT filepath FROM ticket_attachments WHERE id = ?', [$fileId]);

if (!$result) {
    respond(500, 'Ошибка базы данных');
}

$attachment = $result->fetch_assoc();

if (!$attachment) {
    respond(404, 'Вложение не найдено');
}

$filePath = __DIR__ . '/../../uploads/' . $attachment['filepath'];

if (!file_exists($filePath)) {
    respond(404, 'Файл не найден на сервере');
}

header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($filePath));
readfile($filePath);
exit;