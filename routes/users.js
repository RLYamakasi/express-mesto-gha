const router = require('express').Router();
const {
  findUsers, register, getUserById, patchUserInfo, patchUserAvatar, login,
} = require('../controllers/users');

module.exports = router;

router.get('/users', findUsers);
router.post('/signin', login);
router.post('/signup', register);
router.get('/users/:id', getUserById);
router.patch('/users/me', patchUserInfo);
router.patch('/users/me/avatar', patchUserAvatar);
