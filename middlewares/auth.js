const jwt = require('jsonwebtoken');

const router = require('express').Router();

module.exports.auth = (req, res, next) => {
  const cookie = req.cookies.token;
  try {
    const tokenCheck = jwt.verify(cookie, 'some-secret-key');
    if (!tokenCheck) {
      return res.status(500).send({ message: 'noo' });
    }
    req.user = tokenCheck;
    next();
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

module.exports = router;
