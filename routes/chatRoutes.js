const express = require('express')
const { getChats, getSingleChat } = require('../controllers/chatController')
const router = express.Router()

router.route('/').get(getChats)
router.route('/:id').get(getSingleChat)

module.exports = router