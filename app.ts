const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRouter = require('./routes/users.ts');

// Passport authentication and session
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const authenticate = require('./authenticate.ts');
// All Routers
const bookRouter = require('./routes/bookRouter.ts');
const indexRouter = require('./routes/indexRouter.ts');

const User = require('./models/registration.ts');

const config = require('./config.ts');

const PORT = 3000;
const app = express();

// adding express middleware
/* function isLoggedIn(req, res, next) {
    if (!(req.session && req.session.user)) {
        return res.send('Not logged in!');
    }
    next();
} */


app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200', 'localhost:4200'],
  credentials: true
}));
// app.use(indexRouter);

// Express session
// app.use(cookieParser('12345-54321'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
/* app.use(session({
  name: 'session-id',
  secret: '12345',
  saveUninitialized: true,
  resave: true,
  cookie:
   { path: '/',
     _expires: null,
     originalMaxAge: 2000 * 60 * 60 * 60,
     httpOnly: false
    },
  store: new FileStore()
})); */

/* app.use(session({
  secret: 'a4f8071f-c873-4447-8ee2',
  name: 'My Session',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 86400, httpOnly: false, domain: 'localhost' },
  store: new (require('express-sessions'))({
      storage: 'mongodb',
      db: 'bookstore',
      instance: mongoose, // optional
      host: 'localhost', // optional
      collections: 'sessions',
      expire: 86400
      /* instance: mongoose, // optional
      host: 'localhost', // optional
      port: 27017, // optional
      db: 'test', // optional
      collection: 'sessions', // optional
      expire: 86400 // optional */
  /* })
})); */

// Mongos Store
app.use(session({
  secret: 'do-not-hack-it',
  name: 'My Session',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
  mongooseConnection: db,
  collection: 'sessions',
  db: 'bookstore'
  }),
  ttl: 1 * 24 * 60 * 60, // 1 day
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Establishing the connection
const url = config.mongoUrl;
const connect = mongoose.connect(url, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);


connect.then((db) => {
    console.log('Connection Successful');
}, (err) => { console.log('Cannot connect to the database bookstore ', err); });

app.listen(PORT, () => {
    console.log('Server started at port: ' + PORT);
});

// Before accessing books router and catching any error
function auth(req, res, next) {
  console.log(req.session);
  console.log('Req. user ', req.user);
  if (!req.user) {
      // let authHeader = req.headers.authorization;
      // console.log('Auth header is: ', authHeader);
      // console.log(req.user);
      let err = new Error('Authentication Error');
      return next(err);
  } else {
      next();
  }
}

app.use('/register', usersRouter);
app.use(auth);
app.use('/books', bookRouter);


/* app.get('*', function(req, res) {
  res.render('error');
  console.log('Error occurred');
}); */
module.exports = app;
