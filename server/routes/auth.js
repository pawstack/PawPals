const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    if (req.query.code) { //temp token retrieved from stripe and used to finalize stripe_user_id
      // console.log('the req query is ', req.query);
      res.redirect('/api/signup/payment/stripeid/?code=' + req.query.code + '&userid=' + req.user.email);
    } else {
      res.render('index.ejs');
    }
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

// router.route('/auth/google/callback')
//   .get((req, res) => {
//     console.log('in /auth/goolge/callback');
//     debugger;
//     middleware.passport.authenticate('google', {
//       successRedirect: '/profile',
//       failureRedirect: '/login'
//     });
//   });


// router.get('/auth/google/callback', middleware.passport.authenticate('google', {
//   successRedirect: '/profile',
//   failureRedirect: '/login'
// }));

router.route('/auth/google/callback')
  .get((req, res) => {
    // console.log('req user is ', req.user);
    // console.log('res is ', res);
    middleware.passport.authenticate('google', function(err, user, info) {
      // console.log('error is ', err);
      // console.log('user is ', user);
      // console.log('info is ', info);
      if (err) {
        console.log('ERROR authenticating from Google callback: ', err);
        res.sendStatus(500);
      } else {
        req.logIn(user, function(err) {
          if (!user.owner && !user.walker) {
            return res.redirect('/signup/start');
          } else if (user.owner && !user.walker) {
            return res.redirect('/browse');
          } else if (!user.owner && user.walker) {
            return res.redirect('/walker');
          }
        });
      }
    })(req, res);
  });



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
