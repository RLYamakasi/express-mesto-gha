const jwt = require('jsonwebtoken');
const ErrorLogin = require('../errors/errorlogin');

module.exports.auth = (req, res, next) => {
  const cookie = req.cookies.token;
  console.log(cookie);
  try {
    const tokenCheck = jwt.verify(cookie, 'some-secret-key');
    if (!tokenCheck) {
      return next(new ErrorLogin('Что-то пошло не так'));
    }
    req.user = tokenCheck;
    next();
  } catch (err) {
    return next(new ErrorLogin('Что-то пошло не так'));
  }
};
