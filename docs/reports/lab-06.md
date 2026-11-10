# ЛР6. Клиент API и mock

Адрес API: VITE_API_BASE_URL=http://localhost:5000, путь /api/access-requests. Режим переключается константой USE_MOCK в src/api/tickets.js.

## Состояния списка

loading, empty, data, error: одно поле screen, одновременно показывается одно состояние.

## Чеклист трёх отказов

| Отказ | Как воспроизвести | Ветка в коде | Текст человеку | Скрин |
|---|---|---|---|---|
| 400 | title abc, клиентская проверка отключена | !response.ok, status 400 | Проверьте поля | да |
| 500 | FORCE_500 = true | !response.ok, status 500 | Сервер не смог обработать запрос | да |
| Нет связи | USE_MOCK = false, сервер на порту 5000 не запущен | catch | Нет связи с сервером | да |

## Network

Отказ без связи: в Network виден неуспешный запрос к localhost:5000/api/access-requests (failed, ERR_CONNECTION_REFUSED), инициатор tickets.js. Успешное создание через mock: mock без HTTP, запрос в Network появится после подключения сервера в ЛР12.

## Прочее

id и number выдаёт mock в ответе (ДОП-103 и далее), клиент их не вычисляет. Во время POST кнопка disabled (isSubmitting), повторный клик не создаёт дубликат.
