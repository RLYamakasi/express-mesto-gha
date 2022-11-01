const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
  const cookie = req.cookies.token;
  console.log(cookie);
  try {
    const tokenCheck = jwt.verify(cookie, 'some-secret-key');
    if (!tokenCheck) {
      return res.status(500).send({ message: 'noo' });
    }
    req.user = tokenCheck;
    next();
  } catch (err) {
    return res.status(401).send({ message: err });
  }
};
