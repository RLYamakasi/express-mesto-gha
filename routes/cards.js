const { celebrate, Joi, Segments } = require('celebrate');
const router = require('express').Router();
const {
  findCards, postCard, deleteCard, setLikeToCard, deleteLikeFromCard, validateCard,
} = require('../controllers/cards');

module.exports = router;

router.get('/cards', findCards);
router.post('/cards', validateCard, postCard);
router.delete('/cards/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), setLikeToCard);
router.delete('/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteLikeFromCard);
