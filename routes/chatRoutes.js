const express = require('express')
const { getChats, getSingleChat } = require('../controllers/chatController')
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router()

router.route('/').post(protect, accessChat).get(protect, fetchChats)
router.route('/group').post(protect, createGroupChat)
router.route('/group/rename').put(protect, renameGroupChat)
router.route('/group/remove').put(protect, removeFromGroupChat)
router.route('/group/add').put(protect, addToGroupChat)

module.exports = router