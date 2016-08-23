# VR Interior Web Application "ANKRoom" - Angular 2/Express Project.

* Performs **multiple authentication with JWTs, Passport**
* **Calls APIs** authenticated and not.
* Extends the **RouterOutlet** for route pipeline changes.

> 참고 자료 : You can **learn more about how it works [in this blogpost](https://auth0.com/blog/2015/05/14/creating-your-first-real-world-angular-2-app-from-authentication-to-calling-an-api-and-everything-in-between/)**
> Clone this repository as well as [the server](https://github.com/auth0/nodejs-jwt-authentication-sample) for this example.

## Running it

* Server Port/Client Port : `3001`/`3000`


Then, run `npm install` on this project and run `npm start` to start the app. Then just navigate to [http://localhost:3000](http://localhost:3000) :boom:
And Use `npm run server` to run API server.

#####* 결론 : Front-end 실행을 위해서 "npm start" 먼저 실행 후 Back-end 서버 실행을 위해서 "npm run server" 실행


## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

* 회원정보 변경시, 로그아웃시에 대해서 jwt token을 다시 발급해줘야 된다. [참고자료 링크](http://stackoverflow.com/questions/28759590/best-practices-to-invalidate-jwt-while-changing-passwords-and-logout-in-node-js)


## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
