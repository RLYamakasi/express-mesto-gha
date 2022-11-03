const router = require('express').Router();
const {
  findCards, postCard, deleteCard, setLikeToCard, deleteLikeFromCard, validateCard,
} = require('../controllers/cards');

module.exports = router;

router.get('/cards', findCards);
router.post('/cards', validateCard, postCard);
router.delete('/cards/:cardId', validateCard, deleteCard);
router.put('/cards/:cardId/likes', validateCard, setLikeToCard);
router.delete('/cards/:cardId/likes', validateCard, deleteLikeFromCard);
