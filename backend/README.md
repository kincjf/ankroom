# NODE TODO API

This is a NodeJS full API that you can use to test with your SPAs or Mobile apps.
지정 도메인 : ankroom.moblab.kr
API method 부분을 천천히 채워 나가자!

참고자료 : https://github.com/joshuaslate/mern-starter/tree/master/server

## How to use it

Google Sheet(RealRoom_개발자료 : Server-App 통신방법)을 참고 바람.
테스트용 계정을 초기에 자동 생성되게 해서 간단한 로그인 테스트는 가능하다!
(bin/www 참고)

## Available APIs

### Open API

Available methods:

* **POST /api/auth/login**: login
* **POST /api/auth/register**: 회원가입
* **POST /api/auth/forgot-password**: 비밀번호 찾기
* **POST /api/auth/reset-password/:token**: 비밀번호 재등록


* **PUT /api/open/todos/:id**: Updates the TODO with id `id`
* **GET /api/open/todos/:id**: Returns the TODO with id `id`
* **DELETE /api/open/todos/:id**: Deletes the TODO with id `id`
* **GET /api/open/todos**: Gets all fo the TODOs

## Running this for your Auth0 account

If you want, you can run this server for YOUR Auth0 account. For that, you just need to create a `.env` file and set the `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET` variables with the information from your account:

````bash
AUTH0_CLIENT_ID=YourClientId
AUTH0_CLIENT_SECRET=YourClientSecret
````

