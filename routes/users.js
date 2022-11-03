const { celebrate, Joi, Segments } = require('celebrate');
const router = require('express').Router();
const {
  aboutMe, getUserById, patchUserInfo, patchUserAvatar, findUsers, validate,
} = require('../controllers/users');

module.exports = router;

router.get('/users', findUsers);
router.get('/users/me', aboutMe);
router.get('/users/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
router.patch('/users/me', validate, patchUserInfo);
router.patch('/users/me/avatar', validate, patchUserAvatar);
