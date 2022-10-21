const router = require('express').Router();
const Cards = require('../models/cards');

module.exports = router;

module.exports.findCards = (req, res) => {
  Cards.find({})
    .then((card) => res.send({ card }))
    .catch((err) => res
      .status(500)
      .send({ message: err.message }));
};

module.exports.postCard = (req, res) => {
  const { name, link, likes } = req.body;
  const card = new Cards({ name, link, likes });
  card
    .save()
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: err.message });
      }
      return res
        .status(500)
        .send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        return res.status(404).send({ message: 'Карточка по заданному id отсутствует в базе' });
      }
      return res.status(200).send({ cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
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
        return res.status(404).send({ message: 'Карточка по заданному id отсутствует в базе' });
      }
      return res.status(200).send({ cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
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
        return res.status(404).send({ message: 'Карточка по заданному id отсутствует в базе' });
      }
      return res.status(200).send({ cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};
