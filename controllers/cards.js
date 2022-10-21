const router = require('express').Router();
const Cards = require('../models/cards');

const {
  ERROR_CODE, NOT_FOUND, BAD_REQ, STATUS_OK, ValidationError, CastError,
} = require('../app');

module.exports = router;

module.exports.findCards = (req, res) => {
  Cards.find({})
    .then((card) => res.send({ card }))
    .catch((err) => res
      .status(BAD_REQ)
      .send({ message: err.message }));
};

module.exports.postCard = (req, res) => {
  const { name, link, likes } = req.body;
  const card = new Cards({ name, link, likes });
  card
    .save()
    .then((cards) => res.send({ cards }))
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

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        return res.status(NOT_FOUND).send({ message: 'Карточка по заданному id отсутствует в базе' });
      }
      return res.status(STATUS_OK).send({ cards });
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
