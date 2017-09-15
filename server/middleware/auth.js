const redisConfig = require('config')['redis'];
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient(redisConfig.url);

// if (process.env.NODE_ENV === 'production') {
//   const store = new RedisStore({
//     url: redisConfig.url
//   });
// } else {
//   const redisClient = require('redis').createClient();
//   const store = new RedisStore({
//     client: redisClient,
//     host: redisConfig.host,
//     port: redisConfig.port
//   });
// }

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: redisConfig.host,
    port: redisConfig.port,
    url: redisConfig.url
  }),
  secret: redisConfig.secret,
  resave: false,
  saveUninitialized: false
});