const router = require('express').Router();
const users = require('../models/users');
const express = require('express');
const app = express()
module.exports = router;


module.exports.findUsers = (req, res) => {
  users.find({})
    .then((user) => res.send({ user }))
    .catch((err) => res.send({ message: err.message }));
};

module.exports.postUser = (req, res) => {
  const {name,avatar,about} = req.body;
  const user = new users({name,avatar,about});
  return user
    .save()
    .then((user) => res.send({ user }))
    .catch((err) => {
      res
        .status(400)
        .send({ message: err.message });
    });
};

module.exports.getUserById = (req, res) => {
  users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({message:'Пользователь по заданному id отсутствует в базе'})
      }
      return res.status(200).send({ user })})
    .catch((err) => {
      return res.status(400).send({ message: err.message })
    })
};

module.exports.patchUserInfo = (req, res) => {
  const { name, about } = req.body;
  users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      res
        .status(400)
        .send({ message: err.message});
    });
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