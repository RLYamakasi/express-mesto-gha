const router = require('express').Router();
const {
  findUsers, postUser, getUserById, patchUserInfo, patchUserAvatar,
} = require('../controllers/users');

module.exports = router;
router.get('/users', findUsers);
router.post('/users', postUser);
router.get('/users/:id', getUserById);
router.patch('/users/me', patchUserInfo);
router.patch('/users/me/avatar', patchUserAvatar);
