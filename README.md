# Tickets — система учёта заявок на техническую поддержку

## Стек

| Слой           | Технологии                                   |
| -------------- | -------------------------------------------- |
| Frontend       | Angular 21, TypeScript 5.9, Taiga UI 4, RxJS |
| Backend        | PHP 8.5 (чистый, без фреймворков)            |
| База данных    | MySQL 8.0                                    |
| Инфраструктура | Docker Compose (Nginx + PHP-FPM + MySQL)     |

## Структура проекта

```
tickets_test/
├── client/          — Angular-приложение
│   └── src/app/
│       ├── components/    — переиспользуемые UI-компоненты
│       ├── pages/         — страницы
│       ├── services/      — HTTP-сервисы
│       ├── models/        — интерфейсы и типы
│       ├── interceptors/  — обработка HTTP-ошибок
│       └── utils/         — утилиты
├── server/          — PHP-бэкенд + Docker
│   ├── backend/
│   │   ├── index.php      — роутер (единая точка входа)
│   │   ├── api/           — обработчики эндпоинтов
│   │   ├── config/        — конфигурация, хелперы, DTO, enum'ы
│   │   ├── uploads/       — загруженные файлы
│   │   └── logs/          — логи действий
│   ├── docker/            — конфиги Nginx и Dockerfile для PHP
│   └── docs/              — документация API и схема БД
```

## Запуск

### Backend

```bash
cd server
docker-compose up -d
```

Контейнеры:

- **nginx** — `http://localhost:8080`
- **php** — PHP 8.5 FPM
- **db** — MySQL 8.0 (БД `app`, пользователь `appuser` / `secret`)

При первом запуске таблицы создаются автоматически (`init_db.php`), либо вручную:

```bash
docker exec -i <mysql_container> mysql -uappuser -psecret app < docs/database.sql
```

### Frontend

```bash
cd client
npm install
ng serve
```

Приложение доступно на `http://localhost:4200`, запросы к API проксируются на `http://localhost:8080`.

## API

| Метод  | Эндпоинт                       | Описание                                              |
| ------ | ------------------------------ | ----------------------------------------------------- |
| GET    | `/api/tickets`                 | Список заявок (пагинация, фильтры, поиск, сортировка) |
| GET    | `/api/tickets/:id`             | Заявка по ID                                          |
| POST   | `/api/tickets`                 | Создание заявки                                       |
| PUT    | `/api/tickets/:id`             | Обновление заявки                                     |
| DELETE | `/api/tickets/:id`             | Удаление заявки                                       |
| GET    | `/api/tickets/:id/attachments` | Вложения заявки                                       |
| POST   | `/api/tickets/:id/attachments` | Загрузка вложений (до 5 МБ; PDF, DOCX, JPG, PNG)      |
| DELETE | `/api/tickets/:id/attachments` | Удаление вложений                                     |
| GET    | `/api/attachments/:id`         | Скачивание файла                                      |

Полная документация — [server/docs/api-docs.json](server/docs/api-docs.json).

## Схема БД

**tickets** — `id`, `title`, `description`, `priority` (low/medium/high), `status` (open/in_progress/closed), `created_at`, `updated_at`

**ticket_attachments** — `id`, `ticket_id` (FK → tickets), `filepath`, `size`, `uploaded_at`

SQL-скрипт — [server/docs/database.sql](server/docs/database.sql).

## Маршруты фронтенда

| Путь              | Описание                                                |
| ----------------- | ------------------------------------------------------- |
| `/tickets`        | Список заявок с фильтрацией, поиском и пагинацией       |
| `/tickets/create` | Создание новой заявки                                   |
| `/tickets/:id`    | Просмотр и редактирование заявки, управление вложениями |
