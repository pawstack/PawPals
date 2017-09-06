'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const app = express();
const database = require('../db/index');

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
app.use('/*', routes.auth);

app.post('/api/signup/owner', function (req, res) {
  database.saveDog(req.body, req.user.id, function() { res.send(200); });
});

app.post('/api/signup/walker', function (req, res) {
  database.saveWalker(req.body, req.user.id, function() { res.send(200); });
});

module.exports = app;
