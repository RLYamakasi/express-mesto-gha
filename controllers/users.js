const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const router = require('express').Router();
const Users = require('../models/users');

const ERROR_CODE = 400;
const ERROR_LOGIN = 401;
const NOT_FOUND = 404;
const BAD_REQ = 500;
const STATUS_OK = 200;
const ValidationError = 'ValidationError';
const CastError = 'CastError';

module.exports = router;

module.exports.findUsers = (req, res) => {
  Users.find({})
    .then((user) => res.send({ user }))
    .catch((err) => res
      .status(BAD_REQ)
      .send({ message: err.message }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Пользователь не найден' });
      }
      bcrypt.compare(password, user.password);
      const randomString = crypto
        .randomBytes(16)
        .toString('hex');
      const token = jwt.sign(
        { _id: user._id },
        randomString,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        });
      return res.send({ token });
    })
    .then((matched) => {
      if (!matched) {
        return res
          .status(ERROR_LOGIN)
          .send({ message: 'Неправильные почта или пароль' });
      }
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports.register = (req, res) => {
  const {
    name, avatar, about, email, password,
  } = req.body;
  if (!validator.isEmail(email)) {
    return res
      .status(ERROR_CODE)
      .send({ message: 'Неправильные почта или пароль' });
  }
  return bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      email,
      password: hash,
      name,
      avatar,
      about,
    }))
    .then((users) => res.send({ users }))
    .catch((err) => {
      if (err.name === ValidationError) {
        return res
          .status(ERROR_CODE)
          .send({ message: err.message });
      }
      return res
        .status(BAD_REQ)
        .send({ message: err.message });
    });
};

// module.exports.postUser = (req, res) => {
//   const {
//     name, avatar, about, email, password,
//   } = req.body;
//   if (!validator.isEmail(email)) {
//     return res
//       .status(ERROR_CODE)
//       .send({ message: 'Такая почта не зарегистрирована' });
//   }
//   const user = new Users({
//     name, avatar, about, email, password,
//   });
//   return user
//     .save()
//     .then((users) => res.send({ users }))
//     .catch((err) => {
//       if (err.name === ValidationError) {
//         return res
//           .status(ERROR_CODE)
//           .send({ message: err.message });
//       }
//       return res
//         .status(BAD_REQ)
//         .send({ message: err.message });
//     });
// };

module.exports.getUserById = (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь по заданному id отсутствует в базе' });
      }
      return res.status(STATUS_OK).send({ user });
    })
    .catch((err) => {
      if (err.name === CastError) {
        return res
          .status(ERROR_CODE)
          .send({ message: err.message });
      }
      return res.status(BAD_REQ).send({ message: err.message });
    });
};
module.exports.patchUserInfo = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === ValidationError) {
        return res
          .status(ERROR_CODE)
          .send({ message: err.message });
      }
      return res
        .status(BAD_REQ)
        .send({ message: err.message });
    });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === ValidationError) {
        return res
          .status(ERROR_CODE)
          .send({ message: err.message });
      }
      return res
        .status(BAD_REQ)
        .send({ message: err.message });
    });
};
