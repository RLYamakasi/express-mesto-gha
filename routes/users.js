const router = require('express').Router();
const {
  aboutMe, getUserById, patchUserInfo, patchUserAvatar, findUsers, validate,
} = require('../controllers/users');

module.exports = router;

router.get('/users', findUsers);
router.get('/users/me', aboutMe);
router.get('/users/:id', validate, getUserById);
router.patch('/users/me', validate, patchUserInfo);
router.patch('/users/me/avatar', validate, patchUserAvatar);
