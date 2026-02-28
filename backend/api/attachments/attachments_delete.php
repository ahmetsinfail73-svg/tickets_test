<?php

require __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/delete_attachments_files.php';





$fileId = (int) ($segments[2] ?? 0);
if ($fileId <= 0) {
    respond(400, 'ID обязателен');
}
$sql = "select filepath from ticket_attachments where id = ?";
$result = db()->execute_query($sql, [$fileId]);
$attachment = $result->fetch_assoc();


if (!deleteFile([$attachment['filepath']])) {
    respond(500, 'Ошибка при удалении файла');
} 

$sql = "DELETE FROM ticket_attachments WHERE id = ?";
$result = db()->execute_query($sql, [$fileId]);
if ($result === false) {
    respond(404, 'Вложение не найдено');
}
respond(200, 'Вложение удалено');