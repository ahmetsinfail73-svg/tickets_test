<?php

$ticketId = (int) $id;
$ticket   = findTicketOrFail($ticketId);

$ticket['attachments'] = getTicketAttachments($ticketId);

respond(200, $ticket);
