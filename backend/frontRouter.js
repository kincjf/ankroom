/**
 * Created by KIMSEONHO on 2016-08-16.
 */
const passport = require('passport'),
  express = require('express'),
  AuthenticationController = require('./controllers/authentication'),
  UserController = require('./controllers/user'),
  // ChatController = require('./controllers/chat'),
  // CommunicationController = require('./controllers/communication'),
  // StripeController = require('./controllers/stripe'),
  passportService = require('./config/passport'),   // 설정값 로딩때문에 필요함

  quoter  = require('./tests/quoter');    // test route


// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Constants for role types
const REQUIRE_ADMIN = "Admin",
      REQUIRE_OWNER = "Owner",
      REQUIRE_CLIENT = "Client",
      REQUIRE_MEMBER = "Member";

module.exports = function(app) {
  // Initializing route groups
  var apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router();
    // chatRoutes = express.Router(),
    // payRoutes = express.Router(),
    // communicationRoutes = express.Router();

  //=========================
  // Test Routes
  //=========================

  // Test normal route
  apiRoutes.get('/random', function(req, res) {
    res.status(200).json({ quote: quoter.getRandomOne() });
  });

  // Test protected route, 회원 id를 포함한 정보는 jwt값으로 인코딩해서 보내야 함.
  apiRoutes.get('/protected', requireAuth, function(req, res) {
    res.status(200).json({ content: 'The protected test route is functional!'});
  });

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // Password reset request route (generate/send token)
  authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);

  authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);

  //=========================
  // Member Routes
  //=========================

  // Set user routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/user', userRoutes);

  // View public user profile route
  userRoutes.get('/:memberIdx', requireAuth, UserController.viewProfile);

  // Update user profile route
  userRoutes.put('/:memberIdx', requireAuth, UserController.updateProfile, requireLogin, AuthenticationController.login);

  // View business user profile route
  userRoutes.get('/biz/:memberIdx', requireAuth, UserController.viewBizProfile);

  // update business user profile route
  userRoutes.put('/biz/:memberIdx', requireAuth, UserController.updateBizProfile);


  //=========================
  // Chat Routes
  //=========================

  // Set chat routes as a subgroup/middleware to apiRoutes
  // apiRoutes.use('/chat', chatRoutes);

  // View messages to and from authenticated user
  // chatRoutes.get('/', requireAuth, ChatController.getConversations);

  // Retrieve single conversation
  // chatRoutes.get('/:conversationId', requireAuth, ChatController.getConversation);

  // Send reply in conversation
  // chatRoutes.post('/:conversationId', requireAuth, ChatController.sendReply);

  // Start new conversation
  // chatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversation);

  //=========================
  // Payment Routes
  //=========================
  // apiRoutes.use('/pay', payRoutes);

  // Webhook endpoint for Stripe
  // payRoutes.post('/webhook-notify', StripeController.webhook);

  // Create customer and subscription
  // payRoutes.post('/customer', requireAuth, StripeController.createSubscription);

  // Update customer object and billing information
  // payRoutes.put('/customer', requireAuth, StripeController.updateCustomerBillingInfo);

  // Delete subscription from customer
  // payRoutes.delete('/subscription', requireAuth, StripeController.deleteSubscription);

  // Upgrade or downgrade subscription
  // payRoutes.put('/subscription', requireAuth, StripeController.changeSubscription);

  // Fetch customer information
  // payRoutes.get('/customer', requireAuth, StripeController.getCustomer);

  //=========================
  // Communication Routes
  //=========================
  // apiRoutes.use('/communication', communicationRoutes);

  // Send email from contact form
  // communicationRoutes.post('/contact', CommunicationController.sendContactForm);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
