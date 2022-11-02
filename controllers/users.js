const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const { userValidate } = require('../Validations/user');

module.exports.validate = (req, res, next) => {
  const { error } = userValidate(req.body);
  if (error) {
    return res.status(400).json({ message: 'ошибка валидации' });
  }
  next();
};

module.exports.findUsers = (req, res) => {
  Users.find({})
    .then((user) => res.send({ user }));
};

module.exports.aboutMe = (req, res) => {
  console.log(req.user);
  Users.findOne({ _id: req.user._id })
    .then((user) => res.send({ user }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res
          .status(409)
          .send({ message: 'Пользователь не найден' });
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res
              .status(409)
              .send({ message: 'Неправильные почта или пароль' });
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          res.cookie('token', token, {
            httpOnly: true,
          });
          return res.send({ token });
        });
    });
};

module.exports.register = (req, res) => {
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
    .then((users) => res.send({ message: 'вы зарегистрировались' }))
    .catch((err) => {
      if (err.code === 11000) {
        res.send({ message: 'email уже зарегистрирован' });
      }
    });
};

module.exports.getUserById = (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по заданному id отсутствует в базе' });
      }
      return res.status(200).send({ user });
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
    .then((user) => res.send(user));
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
    .then((user) => res.send(user));
};
