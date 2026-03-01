<?php

$limit     = 20;
$page      = max(1, (int) ($_GET['page'] ?? 1));
$offset    = ($page - 1) * $limit;
$sortOrder = ($_GET['sort'] ?? 'newest') === 'oldest' ? 'ASC' : 'DESC';

$filters = [
    'status'   => $_GET['status']   ?? null,
    'priority' => $_GET['priority'] ?? null,
    'title'    => $_GET['search']   ?? null,
];

$where  = [];
$params = [];
$types  = '';

foreach ($filters as $field => $value) {
    if ($value === null || $value === '' || $value === 'all') {
        continue;
    }

    if ($field === 'title') {
        $where[]  = '(title LIKE ? OR description LIKE ?)';
        $params[] = "%$value%";
        $params[] = "%$value%";
        $types   .= 'ss';
    } else {
        $where[]  = "$field = ?";
        $params[] = $value;
        $types   .= 's';
    }
}

$whereSql = !empty($where) ? ' WHERE ' . implode(' AND ', $where) : '';

$stmtTotal = db()->prepare("SELECT COUNT(*) AS total FROM tickets" . $whereSql);
if (!empty($params)) {
    $stmtTotal->bind_param($types, ...$params);
}
$stmtTotal->execute();
$total      = (int) $stmtTotal->get_result()->fetch_assoc()['total'];
$totalPages = (int) ceil($total / $limit);

$sql  = "SELECT * FROM tickets" . $whereSql . " ORDER BY created_at $sortOrder LIMIT $limit OFFSET $offset";
$stmt = db()->prepare($sql);
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$result = $stmt->get_result();

$tickets = [];
while ($row = $result->fetch_assoc()) {
    $row['attachments'] = getTicketAttachments((int) $row['id']);
    $tickets[] = $row;
}

respond(200, [
    'tickets' => $tickets,
    'meta'    => [
        'total' => $total,
        'page'  => $page,
        'pages' => $totalPages,
        'limit' => $limit,
    ],
]);
