const { findCards,postCard,deleteCard,setLikeToCard,deleteLikeFromCard  } = require('../controllers/cards');
const router = require('express').Router();
const express = require('express');
module.exports = router;



router.get('/cards',findCards);
router.post('/cards', postCard );
router.delete('/cards/:cardId',deleteCard);
router.put('/cards/:cardId/likes',setLikeToCard);
router.delete('/cards/:cardId/likes', deleteLikeFromCard);
