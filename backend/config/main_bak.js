const path = require('path');

// root project path 찾는 방법에 대해서는 여러가지 방법이 구현되어 있으나,
// 현재는 이 방법을 사용한다.
const appRoot = require('app-root-path');
const serverPath = 'backend';
const krpano_win = path.join(appRoot.toString(), serverPath, "\\tools\\krpano-1.19-pr6-win");
const krpano_linux = path.join(appRoot.toString(), serverPath, "/tools/krpano-1.19-pr6-linux64");
const krpano_win_vtour_config = path.join(krpano_win, "templates/vtour-normal-custom.config");
const krpano_linux_vtour_config = path.join(krpano_linux, "templates/vtour-normal-custom.config");


module.exports = {
  // Secret key for JWT signing and encryption
  "secret": "ankroom by moblab",

  "development": {
    "dialect": "sqlite",
    "storage": "./db.development.sqlite",
    "serverPort": 3001,
    "krpano": {
      win: krpano_win,
      linux: krpano_linux,
      vtour_config_win: krpano_win_vtour_config,
      vtour_config_linux: krpano_linux_vtour_config
    }
  },

  // 동시 작업시 하나의 DB를 쓰기 때문에 치명적인 문제가 있다.
  // "development": {
  //   "username": "root",
  //   "password": "hitit113112",
  //   "database": "mydb",
  //   "host": "ankroom.moblab.kr",
  //   "dialect": "mysql",
  //   "pool": {
  //     "max": 5,
  //     "min": 3,
  //     "idle": 10000
  //   },
  //   "serverPort": 3001
  // },

  "production": {
    "username": "root",
    "password": "hitit113112",
    "database": "ankroom_production",
    "host": "ankroom.moblab.kr",
    "dialect": "mysql",
    "pool": {
      "max": 50,
      "min": 10,
      "idle": 10000
    },
    "krpano": {
      win: path.join(__dirname, "\\tools\\krpano-1.19.pre6-win"),
      linux: path.join(__dirname, "/tools/krpano-1.19.pre6-linux64"),
      vtour_config: path.join(__dirname, "config/vtour-normal-custom.config")
    },

    // Setting port for server
    "serverPort": 3001,
    // Configuring Mailgun API for sending transactional email
    "mailgun_priv_key": "mailgun private key here",
    // Configuring Mailgun domain for sending transactional email
    "mailgun_domain": "mailgun domain here",
    // Mailchimp API key
    "mailchimpApiKey": "mailchimp api key here",
    // Stripe API key
    "stripeApiKey": "stripe api key goes here"
  }
}
