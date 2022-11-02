const router = require('express').Router();
const Cards = require('../models/cards');

module.exports = router;

module.exports.findCards = (req, res) => {
  Cards.find({})
    .then((card) => res.send({ card }));
};

module.exports.postCard = (req, res) => {
  const { name, link, likes } = req.body;
  const card = new Cards({ name, link, likes });
  card
    .save()
    .then((cards) => res.send({ cards }));
};

module.exports.deleteCard = (req, res) => {
  Cards.findById(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        return res.status(NOT_FOUND).send({ message: 'Карточка по заданному id отсутствует в базе' });
      }
      cards.remove();
      return res.status(STATUS_OK).send({ cards });
    });
};

module.exports.setLikeToCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((cards) => {
      if (!cards) {
        return res.status(NOT_FOUND).send({ message: 'Карточка по заданному id отсутствует в базе' });
      }
      return res.status(STATUS_OK).send({ cards });
    });
};

module.exports.deleteLikeFromCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((cards) => {
      if (!cards) {
        return res.status(NOT_FOUND).send({ message: 'Карточка по заданному id отсутствует в базе' });
      }
      return res.status(STATUS_OK).send({ cards });
    });
};
