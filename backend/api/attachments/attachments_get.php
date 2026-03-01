<?php

$ticketId = (int) $id;
findTicketOrFail($ticketId, returnRow: false);

respond(200, getTicketAttachments($ticketId));
