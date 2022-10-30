const jwt = require('jsonwebtoken');

module.exports.auth = (req, res) => {
  const cookie = req.cookies.token;
  console.log(req.cookies.token);
  try {
    const check = jwt.verify(cookie, 'some-secret-key');
    console.log('token: ', check);
    if (!check) {
      return res.status(500).send({ message: 'noo' });
    }
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};
