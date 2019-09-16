const User = require('../models/registration.ts');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// For authenticating
const passport = require('passport');


router.use(bodyParser.json());


router.post('/', function(req, res, next) {
  console.log('Request in express route ', req.body);
  User.register(new User({ username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName,
    email: req.body.email, city: req.body.city, contactNumber: req.body.phoneNumber, state: req.body.state,
    pinCode: req.body.pinCode, gender: req.body.gender }), req.body.password, (error, user) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        console.log('Error occurred', error);
        res.json({ error: error });
      }
      else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          console.log('User got it: ', user);
          res.json({ success: true, status: true });
          // res.redirect('/');
      });
      }

      });
    });


router.post('/login', passport.authenticate('local'), (req, res) => {
    // Creating a token
    // var token = authenticate.getToken({ _id: req.user._id });
    console.log('In Users.ts Req.user is: ', req.user);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    console.log('Successful');
    res.json({ success: true, response: req.user });
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
        // req.logout();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log('Before req.session');
        req.session.destroy();
        res.clearCookie('My Session');
        res.json({ success: true });
        // this.router.navigate(['login']);
    } else {
        let err = new Error('You are not logged in!');
        res.status = 403;
        next(err);
    }
});

module.exports = router;
