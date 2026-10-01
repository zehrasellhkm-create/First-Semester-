# Контракт API. Тема: Допуск в лабораторию

Адрес сервера в разработке: `http://localhost:5000`. Формат тел — JSON.
Статусы (только эти): `New`, `InProgress`, `Closed`, `Cancelled`. Отмена — статус `Cancelled`, строка не удаляется.

## Таблица запросов

| Метод и путь | Тело | Успех | Возможная ошибка |
|---|---|---|---|
| `GET /api/access-requests` | — | 200, массив или `[]` | — |
| `GET /api/access-requests/{id}` | — | 200, объект | 404 |
| `POST /api/access-requests` | `title`, `laboratoryId`, `description` | 201, `id`, `number`, `status: New` | 400 |
| `PATCH /api/access-requests/{id}/assignee` | `assigneeUserId` | 200 | 404 |
| `PATCH /api/access-requests/{id}/status` | `status` | 200 | 404, 409 |

Клиент не присылает при создании `id`, `number`, `status` и исполнителя: их определяет сервер.
Пустой список — это 200 и `[]`, а не 404.

## Примеры

### POST /api/access-requests

Запрос:

```json
{
  "title": "Допуск к стенду для лабораторной работы",
  "laboratoryId": 2,
  "description": "Нужен допуск на 3 занятия для выполнения ЛР по микроконтроллерам"
}
```

Ответ 201:

```json
{
  "id": 17,
  "number": "ДОП-104",
  "status": "New"
}
```

Ошибка 400 (поля не прошли проверку):

```json
{
  "error": "title должен быть от 5 до 80 символов"
}
```

### GET /api/access-requests/17

Ответ 200:

```json
{
  "id": 17,
  "number": "ДОП-104",
  "title": "Допуск к стенду для лабораторной работы",
  "description": "Нужен допуск на 3 занятия для выполнения ЛР по микроконтроллерам",
  "status": "New",
  "laboratoryId": 2,
  "createdByUserId": 5,
  "assigneeUserId": null
}
```

Ошибка 404: заявки с таким `id` нет.

### PATCH /api/access-requests/17/assignee

Запрос:

```json
{
  "assigneeUserId": 8
}
```

Ответ 200. Ошибка 404: нет заявки с таким `id` (или пользователя).

### PATCH /api/access-requests/17/status

Запрос:

```json
{
  "status": "InProgress"
}
```

Ответ 200. Ошибка 404: нет заявки. Ошибка 409: переход запрещён правилами (например, не назначенный исполнитель пытается взять заявку в работу).

## Что намеренно отсутствует

- метода DELETE;
- одного общего PATCH для назначения и статуса;
- путей вида `/create`.
