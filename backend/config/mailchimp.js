/**
 * Created by KIMSEONHO on 2016-08-16.
 */
const config = require('./main');
const mailchimp = require('mailchimp-v3');

mailchimp.setApiKey(config.mailchimpApiKey);

const listID = '';

// ========================
// Subscribe to main list
// ========================
exports.subscribeToNewsletter = function(email) {
  mailchimp.post('lists/' + listID + '/members', {
    email_address: email,
    status: 'subscribed'
  })
    .then(function(result) {
      console.log(email + ' has been subscribed to Mailchimp.');
    })
    .catch(function(err) {
      console.log('Mailchimp error.');
    });
}
