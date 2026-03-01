<?php

require_once __DIR__ . '/enums.php';

abstract class BaseTicketDto
{
    public function __construct(
        public array $data
    ) {}

    abstract public function validate(): array;

    protected function validateTitle(array &$errors, bool $required): void
    {
        if ($required && !isset($this->data['title'])) {
            $errors['title'] = 'Заголовок обязателен';
            return;
        }

        if (isset($this->data['title'])) {
            $title = trim($this->data['title']);
            if ($title === '' || mb_strlen($title) < 3 || mb_strlen($title) > 255) {
                $errors['title'] = 'Заголовок должен быть от 3 до 255 символов';
            } else {
                $this->data['title'] = $title;
            }
        }
    }

    protected function validateDescription(array &$errors, bool $required): void
    {
        if ($required && !isset($this->data['description'])) {
            $errors['description'] = 'Описание обязательно';
            return;
        }

        if (isset($this->data['description'])) {
            $description = trim($this->data['description']);
            if ($description === '' || mb_strlen($description) < 20) {
                $errors['description'] = 'Описание должно быть не менее 20 символов';
            } else {
                $this->data['description'] = $description;
            }
        }
    }

    protected function validatePriority(array &$errors, bool $required): void
    {
        if ($required && !isset($this->data['priority'])) {
            $errors['priority'] = 'Приоритет обязателен';
            return;
        }

        if (isset($this->data['priority'])) {
            $this->data['priority'] = PriorityEnum::tryFrom($this->data['priority']);
            if ($this->data['priority'] === null) {
                $errors['priority'] = 'Некорректный приоритет';
            }
        }
    }

    protected function validateStatus(array &$errors): void
    {
        if (isset($this->data['status'])) {
            $this->data['status'] = StatusEnum::tryFrom($this->data['status']);
            if ($this->data['status'] === null) {
                $errors['status'] = 'Некорректный статус';
            }
        }
    }
}

class TicketDto extends BaseTicketDto
{
    public function validate(): array
    {
        $errors = [];

        $this->validateTitle($errors, required: true);
        $this->validateDescription($errors, required: true);
        $this->validatePriority($errors, required: true);
        $this->validateStatus($errors);

        return $errors;
    }
}

class UpdateTicketDto extends BaseTicketDto
{
    public function validate(): array
    {
        $errors = [];

        $this->validateTitle($errors, required: false);
        $this->validateDescription($errors, required: false);
        $this->validatePriority($errors, required: false);
        $this->validateStatus($errors);

        $updateableFields = ['title', 'description', 'priority', 'status'];
        $hasFields = false;
        foreach ($updateableFields as $field) {
            if (isset($this->data[$field])) {
                $hasFields = true;
                break;
            }
        }

        if (!$hasFields) {
            $errors['data'] = 'Нет полей для обновления';
        }

        return $errors;
    }

    public function toSqlSet(): array
    {
        $fields = [];
        $params = [];

        foreach (['title', 'description', 'priority', 'status'] as $field) {
            if (isset($this->data[$field])) {
                $fields[] = "$field = ?";
                $value = $this->data[$field];

                if ($value instanceof BackedEnum) {
                    $value = $value->value;
                }

                $params[] = $value;
            }
        }

        return [$fields, $params];
    }
}
