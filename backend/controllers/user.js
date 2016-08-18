/**
 * Created by KIMSEONHO on 2016-08-16.
 */
const Member = require('../models/Member');
const BusinessMember = require('../models/BusinessMember');

//========================================
// Member Routes
//========================================
exports.viewProfile = function(req, res, next) {
  const userId = req.params.userId;

  if (!req.user._id == userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.'}); }
  Member.findById(userId, function(err, user) {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }

    res.status(200).json({ user: user });
    return next();
  });
}
