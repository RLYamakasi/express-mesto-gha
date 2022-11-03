const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const { userValidate } = require('../Validations/user');
const BadRequestError = require('../errors/badreq');
const AuthError = require('../errors/autherror');
const NotFound = require('../errors/notfound');
const ErrorLogin = require('../errors/errorlogin');

module.exports.validate = (req, res, next) => {
  const { error } = userValidate(req.body);
  if (error) {
    next(new BadRequestError('Ошибка валидации'));
  }
  return next();
};

module.exports.findUsers = (req, res, next) => {
  Users.find({})
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports.aboutMe = (req, res, next) => {
  Users.findOne({ _id: req.user._id })
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new ErrorLogin('Что-то пошло не так'));
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new AuthError('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          res.cookie('token', token, {
            httpOnly: true,
          });
          return res.send({ token });
        });
    })
    .catch(next);
};

module.exports.register = (req, res, next) => {
  const {
    name, avatar, about, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      email,
      password: hash,
      name,
      avatar,
      about,
    }))
    .then((users) => res.send({ message: users }))
    .catch((err) => {
      if (err.name === 'validationError') {
        next(new BadRequestError('Что-то пошло не так'));
      }
      if (err.code === 11000) {
        next(new AuthError('Email зарегистрирован'));
      } else {
        console.log(err)
        next(err);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь не найден'));
      }
      return res.status(200).send({ user });
    })
    .catch(next);
};

module.exports.patchUserInfo = (req, res, next) => {
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
      if (err.name === 'validationError') {
        next(new BadRequestError('Что-то пошло не так'));
      } else {
        next(err);
      }
    });
};

module.exports.patchUserAvatar = (req, res, next) => {
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
      if (err.name === 'validationError') {
        next(new BadRequestError('Что-то пошло не так'));
      } else {
        next(err);
      }
    });
};
