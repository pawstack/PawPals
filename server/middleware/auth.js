const redisConfig = require('config')['redis'];
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

if (process.env.NODE_ENV === 'production') {
  const store = new RedisStore({
    url: redisConfig.url
  });
} else {
  const redisClient = require('redis').createClient();
  const store = new RedisStore({
    client: redisClient,
    host: redisConfig.host,
    port: redisConfig.port
  });
}

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.session = session({
  store: store,
  secret: redisConfig.secret,
  resave: false,
  saveUninitialized: false
});