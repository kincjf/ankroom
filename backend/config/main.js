module.exports = {
  // Secret key for JWT signing and encryption
  "secret": "ankroom by moblab",
  "development": {
    "username": "root",
    "password": "hitit113112",
    "database": "mydb",
    "host": "ankroom.moblab.kr",
    "dialect": "mysql",
    "pool": {
      "max": 5,
      "min": 3,
      "idle": 10000
    },
    "serverPort": 3001
  },
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
