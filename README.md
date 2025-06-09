**Social API Backend**

Node.js + Express бекенд для соціальної платформи. Проєкт реалізує повноцінний REST API з підтримкою користувачів, постів, коментарів, лайків, підписок та авторизації через JWT.

##  Технології

- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (Access / Refresh Tokens)**
- **Bcrypt (хешування паролів)**
- **Cookie-based авторизація**
- **Модульна архітектура (Controller → Service → Prisma)**

##  Структура проєкту

┣ src

┣ controllers // Обробка запитів (user, post, comment, like тощо)

┣ services // Бізнес-логіка, що працює з Prisma

┣ utils // JWT, cookie, хешування паролів

┣ middleware // Авторизація, обробка помилок

┣ lib

┃ ┗ prisma.client.js // Ініціалізація Prisma клієнта

┗ server.js // Точка входу

##  Аутентифікація

- Реєстрація користувача
  
- Вхід за email та паролем
  
- Оновлення токену (Refresh)
  
- Вихід із системи (Logout)
  
- Зміна пароля
  

###  Профіль

- Створення профілю
  
- Отримання свого або чужого профілю
  
- Оновлення профілю
  

###  Пости

- Створення постів
  
- Отримання всіх постів користувача
  
- Отримання одного поста
  
- Редагування та видалення поста
  

###  Коментарі

- Створення коментаря (підтримка вкладених через `parentId`)
  
- Отримання коментарів до поста
  
- Редагування та видалення коментаря
  

###  Лайки

- Лайк / дизлайк поста
  
- Перегляд лайків користувача
  
- Кількість лайків у поста
  

###  Підписки

- Підписка / відписка від користувача
  
- Перегляд підписок та підписників

##  Встановлення

git clone https://github.com/Septors/social-api-backend.git

cd social-api-backend

npm install

## Створи файл .env

DATABASE_URL="postgresql://user:password@localhost:5432/yourdb"

ACCESS_SECRET_TOKEN=тут_секрет

REFRESH_SECRET_TOKEN=тут_рефреш_секрет

PORT=5000

## Запуск сервера

npx prisma migrate dev --name init

npm run dev


Автор
Розроблено та підтримується @Septors



