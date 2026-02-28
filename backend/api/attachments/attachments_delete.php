<?php

require __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/delete_attachment_files.php';


$data = json_decode(file_get_contents('php://input'), true);

$id = (int) ($data['id'] ?? 0);
if ($id <= 0) {
    respond(400, 'ID обязателен');
}
$sql = "select filepath from ticket_attachments where id = ?";
$result = db()->execute_query($sql, [$id]);

deleteFile([$result->fetch_assoc()['filepath']]);

$sql = "DELETE FROM ticket_attachments WHERE id = ?";
$result = db()->execute_query($sql, [$id]);
if ($result === false) {
    respond(404, 'Вложение не найдено');
}

if (!deleteFile([$result->fetch_assoc()['filepath']])) {
    respond(500, 'Ошибка при удалении файла');
} else {
    respond(200,'Файл удален');
}