# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

---

## Steps to set up the database (migrations, environment variables)
1. Create a postgres database locally
- Open psql shell
- run: ```CREATE DATABASE DB_NAME;``` (DB_NAME can be whatever db name)
2. Configure new user for database
- Access created database using ```psql -U your_admin_username -d your_database_name``` (admin username most likely postgres)
3. Configure .env
- Backend .env (/backend/.env) should look like (substitute the username, password and created db name)
Note that the value of JWT_SECRET is not important for the purposes of testing
You can either configure creating a user or can use the admin username and password
```
DB_URL="postgres://<DB_USERNAME>:<DB_PASSWORD>@localhost:5432/<DB_NAME>"
JWT_SECRET=RANDOMSTRINGFORJWT
PORT=5000
```
- Frontend .env (/task-manager/.env) should look like (port should correspond with backend):
```
REACT_APP_API_URL=http://localhost:5000
```

## How to run the backend
This app was developed using bun, however using npm will be fine for the purposes of testing,
these instructions will assume that npm is being used
1. In the backend folder, run ```npm install```
2. Run npm run start

## How to run the frontend
1. In task-manager/ folder, run npm install
2. Run npm start

## Notes on testing
1. You will originally get directed to the /login page however sign up is necessary for accessing the page
2. The database gets migrated on run so the schema will get set up automatically

## Salary expectations per month
$30/hr x 40hours/week -> $4,800 a month (would rather discuss salary expectations over call !)
