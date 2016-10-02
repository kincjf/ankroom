# VR Interior Web Application "CozyHouzz" - Angular 2/Express Project.

* Performs **multiple authentication with JWTs, Passport**
* **Calls APIs** authenticated and not.
* Extends the **RouterOutlet** for route pipeline changes.

> 참고 자료 : You can **learn more about how it works [in this blogpost](https://auth0.com/blog/2015/05/14/creating-your-first-real-world-angular-2-app-from-authentication-to-calling-an-api-and-everything-in-between/)**
> Clone this repository as well as [the server](https://github.com/auth0/nodejs-jwt-authentication-sample) for this example.

## Running it
* Client Port : `3000(development)/80(production)`
* Server Port : `3001`

Please check package.json

#####* 결론 : npm run "script-name"(backend 먼저 실행 후 Front-end 실행)


## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker.
* 메인 페이지가 한 번만 클릭되고 이후에 클릭되지 않는 문제(WARNING: sanitizing HTML stripped some content.)
 : Angular 2 최신 버전 업그레이드시 해결 가능. [참고자료 링크](https://github.com/angular/angular/issues/9392)
* 회원정보 변경시, 로그아웃시에 대해서 jwt token을 다시 발급해줘야 된다. [참고자료 링크](http://stackoverflow.com/questions/28759590/best-practices-to-invalidate-jwt-while-changing-passwords-and-logout-in-node-js)


## Author

[MobLab, Korea](http://www.moblab.kr)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
