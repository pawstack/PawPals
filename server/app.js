'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const database = require('../db/index');
const device = require('express-device');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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


app.use(device.capture());
app.use(express.static(path.join(__dirname, '../public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
  next();
});
app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
app.use('/*', routes.auth);

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    console.log('socket id', socket.id)
    for (var prop in data.names) {
      if (data.owner) {
        var owner = data.user_id;
        var walker = prop;
      } else {
        var owner = prop;
        var walker = data.user_id;
      }
      socket.join(owner.toString() + walker.toString(), () => {
        console.log(socket.rooms, 'rooms of socket')
      });
    }
  });
  socket.on('new message', (data) => {
    socket.to(data.roomname).emit('new message', data);
  })
});


module.exports = server;
