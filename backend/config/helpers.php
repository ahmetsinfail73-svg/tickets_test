<?php

function respond(int $code, string|array $data): never
{
    http_response_code($code);

    if (is_string($data)) {
        $response = ['message' => $data];
        if ($code >= 400) {
            $response['statusCode'] = $code;
        }
        echo json_encode($response);
    } else {
        echo json_encode($data);
    }

    exit;
}

function findTicketOrFail(int $ticketId, bool $returnRow = true): ?array
{
    if ($ticketId <= 0) {
        respond(400, 'Некорректный ID тикета');
    }

    $stmt = db()->prepare('SELECT * FROM tickets WHERE id = ?');
    $stmt->bind_param('i', $ticketId);
    $stmt->execute();

    if ($returnRow) {
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
            respond(404, 'Тикет не найден');
        }
        return $result->fetch_assoc();
    }

    $stmt->store_result();
    if ($stmt->num_rows === 0) {
        respond(404, 'Тикет не найден');
    }

    return null;
}

function getTicketAttachments(int $ticketId): array
{
    $stmt = db()->prepare(
        'SELECT id, filepath, size, uploaded_at
         FROM ticket_attachments
         WHERE ticket_id = ?
         ORDER BY uploaded_at DESC'
    );
    $stmt->bind_param('i', $ticketId);
    $stmt->execute();
    $result = $stmt->get_result();

    $attachments = [];
    while ($row = $result->fetch_assoc()) {
        $attachments[] = $row;
    }

    return $attachments;
}

function deleteFiles(array $filepaths): bool
{
    $uploadsDir = __DIR__ . '/../uploads/';

    foreach ($filepaths as $filepath) {
        $fullPath = $uploadsDir . $filepath;

        if (!file_exists($fullPath) || !unlink($fullPath)) {
            return false;
        }
    }

    return true;
}
