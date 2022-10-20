const router = require('express').Router();
const cards = require('../models/cards');
const express = require('express');
const app = express()
module.exports = router;

module.exports.findCards = (req, res) => {
  cards.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => res.send({ message: err.message }));
};


module.exports.postCard = (req, res) => {
  const {name,link,likes,createdAt} = req.body;
  const card = new cards({name,link,likes,createdAt});
  card
    .save()
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
        return;
      }
      res.status(500).send(err);
    });
  };

module.exports.deleteCard = (req, res) => {
  cards.findByIdAndRemove(req.params.cardId)
  .then(cards => res.send({ cards }))
  .catch((err) => {
    if (err.name === "CastError") {
      res.status(404).send({ message: err.message });
      return;
    }
    res.status(500).send(err);
  });
};
module.exports.setLikeToCard = (req, res) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
        return;
      }
      res.status(500).send(err);
    });
  };

module.exports.deleteLikeFromCard = (req, res) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
        return;
      }
      res.status(500).send(err);
    });
  };