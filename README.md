# Tickets — система учёта заявок на техническую поддержку

## Стек

| Слой           | Технологии                                   |
| -------------- | -------------------------------------------- |
| Frontend       | Angular 21, TypeScript 5.9, Taiga UI 4, RxJS |
| Backend        | PHP 8.5 (чистый, без фреймворков)            |
| База данных    | MySQL 8.0                                    |
| Инфраструктура | Docker Compose (Nginx + PHP-FPM + MySQL)     |

## Переменные среды

### MySQL (`server/docker-compose.yml`)

| Переменная            | Значение  | Описание            |
| --------------------- | --------- | ------------------- |
| `MYSQL_ROOT_PASSWORD` | `root`    | Пароль root         |
| `MYSQL_DATABASE`      | `app`     | Имя базы данных     |
| `MYSQL_USER`          | `appuser` | Пользователь БД     |
| `MYSQL_PASSWORD`      | `secret`  | Пароль пользователя |

### PHP (`server/backend/config/database.php`)

| Параметр  | Значение  | Описание                    |
| --------- | --------- | --------------------------- |
| `host`    | `db`      | Хост MySQL (имя контейнера) |
| `user`    | `appuser` | Пользователь БД             |
| `pass`    | `secret`  | Пароль                      |
| `db`      | `app`     | Имя базы данных             |
| `charset` | `utf8mb4` | Кодировка соединения        |

### PHP-лимиты (`server/docker/php/Dockerfile`)

| Параметр              | Значение | Описание                    |
| --------------------- | -------- | --------------------------- |
| `upload_max_filesize` | `400M`   | Макс. размер загрузки файла |
| `post_max_size`       | `400M`   | Макс. размер POST-запроса   |

### Nginx (`server/docker/nginx/default.conf`)

| Параметр                  | Значение | Описание                  |
| ------------------------- | -------- | ------------------------- |
| `client_max_body_size`    | `10m`    | Макс. размер тела запроса |
| `client_body_buffer_size` | `10m`    | Буфер тела запроса        |

### Frontend (`client/src/app/environments/environments.ts`)

API URL задаётся в `src/app/environments/environments.ts`:

```typescript
export const environment = {
	API_URL: 'http://localhost:8080/api',
}
```

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
