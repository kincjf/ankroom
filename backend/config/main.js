const path = require('path');
const appRoot = require('app-root-path');

// root project path 찾는 방법에 대해서는 여러가지 방법이 구현되어 있으나,
// 현재는 이 방법을 사용한다.
const serverPath = 'backend';
const KRPANO_WIN_PATH = path.join(appRoot.toString(), "\\tools\\krpano-1.19-pr6-win");
const KRPANO_LINUX_PATH = path.join(appRoot.toString(), "/tools/krpano-1.19-pr6-linux64");
const VTOUR_CONFIG_PATH = "templates/vtour-normal-custom.config";
const PANOTOUR_PATH = path.join("vtour", "panos");

module.exports = {
  // Secret key for JWT signing and encryption
  "secret": "ankroom by moblab",

  "development": {
    "dialect": "sqlite",
    "storage": "./db.development.sqlite",
    "serverPort": 3001,
    "krpano": {
      win: KRPANO_WIN_PATH,
      linux: KRPANO_LINUX_PATH,
      vtour_config: VTOUR_CONFIG_PATH,
      panotour_path: PANOTOUR_PATH
    },
    logLevel: "debug"
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
    "database": "cozyhouzz",
    "host": "104.214.150.196",    // cozyhouzz.co.kr
    "dialect": "mysql",
    "pool": {
      "max": 50,
      "min": 10,
      "idle": 10000
    },
    "krpano": {
      win: KRPANO_WIN_PATH,
      linux: KRPANO_LINUX_PATH,
      vtour_config: VTOUR_CONFIG_PATH,
      panotour_path: PANOTOUR_PATH
    },
    logLevel: "info",
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
