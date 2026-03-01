<?php

$ticketId = (int) $id;
findTicketOrFail($ticketId, returnRow: false);

if (!isset($_FILES['file'])) {
    respond(400, 'Файл не загружен');
}

$file = $_FILES['file'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    respond(400, 'Ошибка загрузки: ' . $file['error']);
}

if ($file['size'] > 5 * 1024 * 1024) {
    respond(400, 'Файл слишком большой');
}

$allowedMimes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
];

if (!in_array($file['type'], $allowedMimes, true)) {
    respond(400, 'Недопустимый тип файла');
}

$ext       = pathinfo($file['name'], PATHINFO_EXTENSION);
$uploadDir = __DIR__ . '/../../uploads';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$storedName = uniqid('', true) . ($ext ? ".$ext" : '');
$target     = "$uploadDir/$storedName";

if (!move_uploaded_file($file['tmp_name'], $target)) {
    respond(500, 'Не удалось сохранить файл');
}

$size = $file['size'];
$stmt = db()->prepare(
    'INSERT INTO ticket_attachments (ticket_id, filepath, size, uploaded_at)
     VALUES (?, ?, ?, NOW())'
);
$stmt->bind_param('isi', $ticketId, $storedName, $size);
$stmt->execute();

$attachmentId = $stmt->insert_id;

$stmtGet = db()->prepare(
    'SELECT id, ticket_id, filepath, size, uploaded_at FROM ticket_attachments WHERE id = ?'
);
$stmtGet->bind_param('i', $attachmentId);
$stmtGet->execute();

respond(201, $stmtGet->get_result()->fetch_assoc());
