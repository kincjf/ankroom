/**
 * Created by KIMSEONHO on 2016-09-19.
 */

const env = "development";    // 이 부분을 바꿔주자, 대충 쓰자 ^^

export const config = {
  "development": {
    "serverHost": "http://localhost:3001",
    "editorImageUploadURL": "api/public/image",
    "debugging": true
  },
  "production": {

  }
}[env];
