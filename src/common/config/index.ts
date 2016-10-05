/**
 * Created by KIMSEONHO on 2016-09-19.
 */

const env = "development";    // 이 부분을 바꿔주자, 대충 쓰자 ^^
// const env = "production";    // 이 부분을 바꿔주자, 대충 쓰자 ^^

export const config = {
  "development": {
    "serverHost": "http://localhost:3001",
    "editorImageUploadURL": "api/public/image",
    "debugging": true,
    path: {
      login: "api/auth/login",
      signup: "api/auth/register",
      changeSignup: "api/user",
      changeBizSignup: "api/user/biz",
      consulting: "api/consult",
      buildCase: "api/build-case",
      bizStore: "api/biz-store"
    }
  },
  "production": {
    "serverHost": "http://api.cozyhouzz.co.kr",
    "editorImageUploadURL": "api/public/image",
    path: {
      login: "api/auth/login",
      signup: "api/auth/register",
      changeSignup: "api/user",
      changeBizSignup: "api/user/biz",
      consulting: "api/consult",
      buildCase: "api/build-case",
      bizStore: "api/biz-store"
    }
  }
}[env];
