<?php

$data = json_decode(file_get_contents('php://input'), true);

$ticketId = (int) ($data['id'] ?? 0);
if ($ticketId <= 0) {
    respond(400, 'ID обязателен');
}

$dto    = new UpdateTicketDto($data);
$errors = $dto->validate();

if (!empty($errors)) {
    respond(400, $errors);
}

[$fields, $params] = $dto->toSqlSet();
$params[] = $ticketId;

$sql    = 'UPDATE tickets SET ' . implode(', ', $fields) . ' WHERE id = ?';
$result = db()->execute_query($sql, $params);

if ($result === false) {
    respond(404, 'Тикет не найден');
}

respond(200, 'Тикет обновлён');

