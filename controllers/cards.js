const router = require('express').Router();
const Cards = require('../models/cards');
const NotFound = require('../errors/notfound');

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

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        next(new NotFound('карточка не найдена'));
      }
      cards.remove();
      return res.status(200).send({ cards });
    });
};

module.exports.setLikeToCard = (req, res, next) => {
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
        next(new NotFound('карточка не найдена'));
      }
      return res.status(200).send({ cards });
    });
};

module.exports.deleteLikeFromCard = (req, res, next) => {
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
        next(new NotFound('карточка не найдена'));
      }
      return res.status(200).send({ cards });
    });
};
