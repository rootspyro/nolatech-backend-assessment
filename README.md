# Technical Assesment
This CRUD of users is the solve of the Technical Assesment of nolatech for the vacant of Backend Developer

## Tech Stack
NodeJS, Express, PostgreSQL, Sequelize, AWS Lambda

## API
__host:__ https://lszgnbi46h.execute-api.us-east-1.amazonaws.com/default

__basePath:__ /v1

__authentication:__ JsonWebToken 

### Authentication

#### Header
```http
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Endpoints

#### Health
This endpoint validates that the service is UP!

```http
GET /health
```

Endpoint: [lszgnbi46h.execute-api.us-east-1.amazonaws.com/default/health](https://lszgnbi46h.execute-api.us-east-1.amazonaws.com/default/health)

#### Login 
```http
POST /v1/auth/login
```

__Authorization:__ Required

```json
{
    "user": "spyro",
    "password": "3RJR#sPYT"
}
```

Endpoint: [lszgnbi46h.execute-api.us-east-1.amazonaws.com/default/v1/auth/login](https://lszgnbi46h.execute-api.us-east-1.amazonaws.com/default/v1/auth/login)


#### Get Users
```http
GET /v1/users
```

__Authorization:__ Required

##### Queries 
- page: number (example: 1)
- count: number (example: 10)

Endpoint: [lszgnbi46h.execute-api.us-east-1.amazonaws.com/default/v1/users?page=1&count=10](https://lszgnbi46h.execute-api.us-east-1.amazonaws.com/default/v1/users?page=1&count=10)


#### Get User by id
```http
GET /v1/users/{:id}
```

__Authorization:__ Required


#### Create User
```http
POST /v1/users
```
__Authorization:__ Not Required

##### Body schema
```json
{
    "username": "spyro",
    "email": "root.spyro@gmail.com",
    "firstname": "Spyridon",
    "lastname": "Mihalopoulos",
    "password": "3RJR#sPYT"
}
```

#### Update User
```http
PATCH /v1/users/{:id}
```
__Authorization:__ Required

##### Body schema
```json
{
    "username": "spyro",
    "email": "root.spyro@gmail.com",
    "firstname": "Spyridon",
    "lastname": "Mihalopoulos",
    "password": "3RJR#sPYT"
}
```

#### Delete User
```http
DELETE /v1/users/{:id}
```
__Authorization:__ Required

