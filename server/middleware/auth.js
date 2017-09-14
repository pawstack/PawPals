const redisConfig = require('config')['redis'];
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

if (process.env.NODE_ENV === 'production') {
  const redisClient = require('redis').createClient();
  const redisStoreOptions = {
    url: redisConfig.url
  };
} else {
  const redisClient = require('redis').createClient();
  const redisStoreOptions = {
    client: redisClient,
    host: redisConfig.host,
    port: redisConfig.port
  };
}

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.session = session({
  store: new RedisStore(redisStoreOptions),
  secret: redisConfig.secret,
  resave: false,
  saveUninitialized: false
});