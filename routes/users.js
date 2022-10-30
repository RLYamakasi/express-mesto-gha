const router = require('express').Router();
const {
  aboutMe, register, getUserById, patchUserInfo, patchUserAvatar, login,
} = require('../controllers/users');

module.exports = router;

router.get('/users/me', aboutMe);
router.post('/signin', login);
router.post('/signup', register);
router.get('/users/:id', getUserById);
router.patch('/users/me', patchUserInfo);
router.patch('/users/me/avatar', patchUserAvatar);
