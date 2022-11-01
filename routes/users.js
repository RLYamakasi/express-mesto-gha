const router = require('express').Router();
const {
  aboutMe, getUserById, patchUserInfo, patchUserAvatar,
} = require('../controllers/users');

module.exports = router;

router.get('/users/me', aboutMe);
router.get('/users/:id', getUserById);
router.patch('/users/me', patchUserInfo);
router.patch('/users/me/avatar', patchUserAvatar);
