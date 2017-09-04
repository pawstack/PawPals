const express = require('express');
const middleware = require('../middleware');
var curl = require('curlrequest');

const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    console.log('the req query is ', req.query);
    if (req.query.code) {
      console.log('****** retrieved the temporary token.  will invoke step4 to finalize the stripe_user_id');
      res.redirect('/tokenize/?code=' + req.query.code);
    }
    res.render('index.ejs');
  });

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/tokenize')
  .get((req, res) => {
    debugger;
    // req.flash('client_secret', 'sk_test_2U8Pw3mVMwmqXjdSHbiBfFSm');
    // req.flash('code', 'ac_BKpjN5v1m4YCxeoG2ompHv9qbNILoLLc');
    // req.flash('grant_type', 'authorization_code');
    //
    // res.redirect('https://connect.stripe.com/oauth/token');

    curl.request({
      url: 'https://connect.stripe.com/oauth/token',
      data: {
        'client_secret': 'sk_test_2slmpAIrhlZSnWP7KSMNp6HX', // need to change this periodically
        'code': req.query.code,
        //'code': 'ac_BKskFL5z0e7rB4OySIe0EKWVFiD1wFVw', // will need to pull this in from the query data of the ajax get request.
        'grant_type': 'authorization_code'
      }
    }, function(err, stdout, meta) {
      console.log('curl request completed...');
      console.log('err ', err);
      console.log('stdout ', stdout);
      console.log('the type of stdout is ', typeof stdout);
      console.log('meta ', meta);
      console.log('the stripe users id that should be saved to the db is ', JSON.parse(stdout).stripe_user_id);
      res.send(JSON.parse(stdout).stripe_user_id);
      //now save the stripe_user_id in the database under the user!
      //create a customer object - Customer objects allow you to perform recurring charges and
      //  track multiple charges that are associated with the same customer.
      //  The API allows you to create, delete, and update your customers.
      //  You can retrieve individual customers as well as a list of all your customers.
      //then redirect back to the home page?  res.redirect('/home');
      //res.send(200);
    });
  });

// new users/signups also go through /login, registration happens after if they are a new user
// router.route('/signup')
//   .get((req, res) => {
//     res.render('signup.ejs', { message: req.flash('signupMessage') });
//   })
//   .post(middleware.passport.authenticate('local-signup', {
//     successRedirect: '/profile',
//     failureRedirect: '/signup',
//     failureFlash: true
//   }));

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

module.exports = router;
