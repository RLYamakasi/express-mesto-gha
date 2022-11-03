const { celebrate, Joi, Segments } = require('celebrate');
const router = require('express').Router();
const {
  findCards, postCard, deleteCard, setLikeToCard, deleteLikeFromCard,
} = require('../controllers/cards');
const { cardValidate } = require('../Validations/cards');

module.exports = router;

router.get('/cards', findCards);
router.post('/cards', cardValidate, postCard);
router.delete('/cards/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), setLikeToCard);
router.delete('/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteLikeFromCard);
