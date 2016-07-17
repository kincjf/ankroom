# NODE TODO API

This is a NodeJS full API that you can use to test with your SPAs or Mobile apps.
지정 도메인 : ankroom.moblab.kr
API method 부분을 천천히 채워 나가자!

## How to use it

Google Sheet(RealRoom_개발자료 : Server-App 통신방법)을 참고 바람.


## Available APIs

### Open API

The Open API lets anyone do CRUD operation on a set of TODOs. This means that you can add a TODO and then John Doe can delete it.

Available methods:

* **POST /api/open/todos**: Adds a new TODO
* **PUT /api/open/todos/:id**: Updates the TODO with id `id`
* **GET /api/open/todos/:id**: Returns the TODO with id `id`
* **DELETE /api/open/todos/:id**: Deletes the TODO with id `id`
* **GET /api/open/todos**: Gets all fo the TODOs

### User based API

You can use this API to save TODO items for a particular user. For that, you need to use Auth0 to get the `id_token` (JWT) and send it in every request as part of the `Authorization` header.

This server validates JWT from the following account:

* **Domain**: `samples.auth0.com`
* **ClientID**: `BUIJSW9x60sIHBw8Kd9EmCbj8eDIFxDC`

Available methods:

* **POST /api/todos**: Adds a new TODO
* **PUT /api/todos/:id**: Updates the TODO with id `id`
* **GET /api/todos/:id**: Returns the TODO with id `id`
* **DELETE /api/todos/:id**: Deletes the TODO with id `id`
* **GET /api/todos**: Gets all fo the TODOs

## Running this for your Auth0 account

If you want, you can run this server for YOUR Auth0 account. For that, you just need to create a `.env` file and set the `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET` variables with the information from your account:

````bash
AUTH0_CLIENT_ID=YourClientId
AUTH0_CLIENT_SECRET=YourClientSecret
````

