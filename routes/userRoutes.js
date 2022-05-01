const express = require('express')
const {protect} = require('../middlewares/authMiddleware')
const { register, authUser, allUsers, changeDisplayPicture } = require('../controllers/userController')
const router = express.Router()

router.route('/').get(protect, allUsers).post(register)
router.route('/login').post(authUser)
router.route('/:userId').patch(protect, changeDisplayPicture)
module.exports = router