const router = require('express').Router();
const Cards = require('../models/cards');
const NotFound = require('../errors/notfound');
const { cardValidate } = require('../Validations/user');
const BadRequestError = require('../errors/badreq');
const ForbidenError = require('../errors/badreq');

module.exports = router;

module.exports.validateCard = (req, res, next) => {
  const { error } = cardValidate(req.body);
  console.log(error);
  if (error) {
    next(new BadRequestError('Ошибка валидации'));
  }
  return next();
};

module.exports.findCards = (req, res, next) => {
  Cards.find({})
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const { name, link, likes } = req.body;
  const owner = req.user._id;
  const card = new Cards({
    name, link, likes, owner,
  });
  card
    .save()
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      if (err.name === 'validationError') {
        next(new BadRequestError('Что-то пошло не так'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        next(new NotFound('карточка не найдена'));
      }
      if (!cards.owner === req.user._id) {
        next(new ForbidenError('Нельзя удалять чужую карточку'));
      }
      return cards.remove()
        .then(() => res.status(200).send({ cards }));
    })
    .catch(next);
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
    })
    .catch(next);
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
    })
    .catch(next);
};
