Зміни в серверному коді:
Перейменовані назви моделей баз даних.
Перероблено деструкторизацію в функціях контролерів для відповідних методів.
Додана перевірка try-catch в контролерах.
Переписана логіка запитів до бази даних.
Переписані проміжні ПО.
Створено error logger, встановлено додатковий пакет node-schedule для автоматичного зберігання помилок в server/backup_errors.
Створено маршрутизатор, контролер та модель бази даних для модератора, а також міграції для них.
Створені сідери з користувачами та паролями для модератора (moderator@gmail.com, moderator@gmail.com).
Створено моделі для переміщення чату в базу даних PostgreSQL.
Змінено контролер addMessage для роботи з PostgreSQL.
Додано ButtonGroup.
Доданий запит до бази даних MongoDB у server/Exam/DB/find.mongodb.js.
Додані SQL-запити для створення чату у server/Exam/DB/chat.session.sql, знімки екрану зберігаються у папці server/Exam/db.

    - Card number: 4111111111111111
    - Expires end: 10/23
    - cvc/cvv: 505

Зміни в клієнтському коді:

Виправлені методи REST-контролера.
Розроблений REST-контролер для зручної роботи.
Створено сторінку HowItWorksPage у client/src/pages/HowItWorksPage.
Створено сторінку TimerPage у client/src/pages/TimerPage та таймер слайс у client/src/store/slices/timerSlice.js.
Створено сторінку ModeratorPage у client/src/pages/ModeratorPage.
Переписана вся логіка чату для роботи з PostgreSQL.
Переписані класові компоненти на функціональні.
Проведено відладку.