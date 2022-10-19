const router = require('express').Router();
const users = require('../models/users');
const express = require(`express`);

const app = express()
module.exports = router;

module.exports.findUsers = (req, res) => {
  users.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.send({ message: err.message }));
};

module.exports.postUser = (req, res) => {
  const {name,avatar,about} = req.body;
  const user = new users({name,avatar,about});
  return user
    .save()
    .then((users) => res.send({ users }))
    .catch((err) => console.log(err))
};

module.exports.getUserById = (req, res) => {
  users.findById(req.params.id)
    .then((users) => res.send({ users }))
    .catch((err) => res.send({ message: err.message }));
};

module.exports.patchUserInfo = (req, res) => {
  const { name, about } = req.body;
  users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => res.send({ message: err.message }));
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => res.send({ message: err.message }));
};