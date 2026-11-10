# РИС и Web — Лабораторные

- **Студент:** Хаким Зохра Салсабиль
- **Группа:** ТРИС-2-23
- **Тема:** Система управления заявками на допуск в лабораторию
- **Статус темы:** ждём утверждения
- **Стек:** Vue 3 + ASP.NET Core + PostgreSQL (код позже)

## Документация

### ЛР1
- [Заявка на тему](docs/project-proposal.md)
- [Требования](docs/lab-01-requirements.md)

### ЛР2
- [Архитектура](docs/architecture.md)
- [Модель данных](docs/data-model.md)
- [API](docs/api-contract.md)
- [Матрица требований](docs/requirements-matrix.md)

## Запуск клиента (ЛР3)

Нужен Node.js LTS.

```
cd frontend
npm install
npm run dev
```

Открыть адрес, который напишет терминал (обычно http://localhost:5173).

## ЛР4: компоненты и маршруты

Маршруты клиента (Vue Router):

| Адрес | Экран |
|---|---|
| / | список заявок |
| /new | создание заявки |
| /login | вход |

Структура frontend/src:

- App.vue: AppHeader и router-view
- router.js: три маршрута
- ticketsStore.js: единственный общий массив заявок
- components/AppHeader.vue, components/TicketTable.vue
- pages/TicketList.vue, pages/TicketNew.vue, pages/Login.vue

Таблица получает массив через props, источник данных: ticketsStore.js.

## ЛР5: форма и список в памяти

Форма создания (/new) добавляет заявку в общий массив в ticketsStore.js. Сервера и базы данных пока нет, список хранится только в памяти браузера.

Проверки на клиенте:

- title: 5–80 символов после trim
- laboratoryId: целое число больше нуля (v-model.number)
- description: 10–500 символов

Что происходит при отправке:

- корректные данные: запись со статусом New добавляется в список, открывается страница /
- некорректные данные: запись не добавляется, под полем показывается ошибка
- Enter не перезагружает страницу (@submit.prevent)
- после F5 добавленные записи исчезают: это ожидаемо, сервера и БД пока нет

Отчёт: docs/reports/lab-05.md