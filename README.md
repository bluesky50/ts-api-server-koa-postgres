## Project Description
This project implements an endpoint server built using NodeJS + Koa and written in TypeScript. The server endpoints use JWT middleware to authenticate requests.

## Features
- Project implements user access routes for login and registration.
- Project implements server status endpoint.
- Project implements JWT authentication middleware.
- Project implements CRUD endpoints for Users, Posts, and Comments that requires JWT for authentication.
- The server persists data in a Postgres database.

## Objectives
Create server endpoints for data using Typescript + Koa.
Added JWT authentication middleware.
Created user access routes.
Created object oriented code structure.
Created server status routes.

## Rotues
```
1. GET /status - response { data }
```

```
1. GET /access/me - request: * Authorization header jwt*, response { data }
2. POST /access/login - request: { username, password }, response: { data }
3. POST /access/register - request: { username, email, password }, response: { data }
```

```
1. GET /users - response: { data }
2. GET /users/:id - request: User, response: { data }
3. POST /users - request: User, response: { data }
4. PUT /users/:id - response: { data }
5. DELETE /users/:id - response: { data }
```
```
1. GET /posts - response: { data }
2. GET /posts/:id - request: Post, response: { data }
3. POST /posts - request: { title, content } * Authorizaion header jwt*, response: { data }
4. PUT /posts/:id - response: { data }
5. DELETE /posts/:id - response: { data }
```
```
1. GET /comments - response: { data }
2. GET /comments/:id - request: Comment, response: { data }
3. POST /comments - request: { postId, content } * Authorization header jwt*, response: { data }
4. PUT /comments/:id - response: { data }
5. DELETE /comments/:id - response: { data }
```

## Models
```
Post { title, content, authorId }
```
```
User { username, email, password }
```
```
Comment { postId, useId, content }
```