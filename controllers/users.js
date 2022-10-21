const router = require('express').Router();
const Users = require('../models/users');

const {
  ERROR_CODE, NOT_FOUND, BAD_REQ, STATUS_OK, ValidationError, CastError,
} = require('../app');

module.exports = router;

module.exports.findUsers = (req, res) => {
  Users.find({})
    .then((user) => res.send({ user }))
    .catch((err) => res
      .status(BAD_REQ)
      .send({ message: err.message }));
};

module.exports.postUser = (req, res) => {
  const { name, avatar, about } = req.body;
  const user = new Users({ name, avatar, about });
  return user
    .save()
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
