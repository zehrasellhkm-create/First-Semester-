# Матрица требований. Тема: Допуск в лабораторию

Связывает три критерия ЛР1 ([lab-01-requirements.md](lab-01-requirements.md)) с моделью ([data-model.md](data-model.md)) и API ([api-contract.md](api-contract.md)).

| Требование ЛР1 | Поле или сущность | Запрос | Критерий |
|---|---|---|---|
| Студент создаёт заявку на допуск | AccessRequest: `title`, `laboratoryId`, `description` | `POST /api/access-requests` | 1 |
| Заведующий лабораторией назначает инженера | `assigneeUserId` | `PATCH /api/access-requests/{id}/assignee` | 2 |
| Инженер лаборатории переводит свою заявку в работу | `status` (New → InProgress) | `PATCH /api/access-requests/{id}/status` | 3 |
