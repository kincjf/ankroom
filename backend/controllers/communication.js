/**
 * Created by KIMSEONHO on 2016-08-16.
 */
const mailgun = require('../config/mailgun');

exports.sendContactForm = function(req, res, next) {
  const fromText = req.body.firstName + ' ' + req.body.lastName + ' ' +
    '<' + req.body.email + '>';

  const message = {
    subject: req.body.subject,
    text: req.body.message
  };

  mailgun.contactForm(fromText, message);

  res.status(200).json({ message: 'Your email has been sent. We will be in touch with you soon.' });
  next();
}
