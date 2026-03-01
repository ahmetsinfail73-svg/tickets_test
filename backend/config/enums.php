<?php

enum PriorityEnum: string
{
    case LOW    = 'low';
    case MEDIUM = 'medium';
    case HIGH   = 'high';
}

enum StatusEnum: string
{
    case OPEN        = 'open';
    case IN_PROGRESS = 'in_progress';
    case CLOSED      = 'closed';
}
