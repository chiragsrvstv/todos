# TODOS APP
This TODO application is made with Node, Express and PostgreSQL. <br> 
Users can easily Add, Update or Delete their Todos.

![Alt Text](https://media.giphy.com/media/hVCPjQCtP37zQH5RMF/giphy.gif)

## Installation
1. Clone or download this repository.
2. Run `npm install` to install all the dependencies. (Requires Node, for help visit: https://nodejs.org/en/)
3. Before running this application, make sure you have the latest version of PostgreSQL installed. <br>
    Then proceed to Database Setup section to create a well defined database relevant to the project.
    For help visit: https://www.postgresql.org/docs/
4. Inside the project folder create a `.env` file to include your database configuration:
```
DB_USER="***YOUR_DATABSE_USER_NAME***"
DB_HOST="***YOUR_DATABASE_HOST***"
DB_DBPORT=***YOUR_DATABASE_PORT***

```
5. Now run `node app.js` to start the local development server on Localhost port 3000.
6. From your preferred browser visit `localhost:3000` to view the application.

## Additional Setup

### Database Setup
1. Run your psql shell by `psql postgres`
2. Create a database named `todos` and connect to it using `\c todos`.
3. Now run the below queries to create a database relevant to the project:
```
create table todoList (id SERIAL PRIMARY KEY, title VARCHAR(100) NOT NULL, category VARCHAR(50) NOT NULL);

```

4. Adding 'timestamp' and 'status' column:

```
alter table todolist add column created_at timestamptz  not null default now();
alter table todolist add column updated_at timestamptz  not null default now();
alter table todolist add column status varchar(20) not null;

```
5. Now lets create a trigger function that would add and update the timestamp automatically

```
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

```

```
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON todolist
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

```

6. After all the above steps the schema should be defined as shown below: <br>
   Check the database schema by running `\d+ todolist`.

```

                                                            Table "public.todolist"
   Column   |           Type           | Collation | Nullable |               Default                | Storage  | Stats target | Description 
------------+--------------------------+-----------+----------+--------------------------------------+----------+--------------+-------------
 id         | integer                  |           | not null | nextval('todolist_id_seq'::regclass) | plain    |              | 
 title      | character varying(100)   |           | not null |                                      | extended |              | 
 category   | character varying(50)    |           | not null |                                      | extended |              | 
 status     | character varying(20)    |           | not null |                                      | extended |              | 
 created_at | timestamp with time zone |           | not null | now()                                | plain    |              | 
 updated_at | timestamp with time zone |           | not null | now()                                | plain    |              | 
Indexes:
    "todolist_pkey" PRIMARY KEY, btree (id)
Triggers:
    set_timestamp BEFORE UPDATE ON todolist FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp()
Access method: heap


```



