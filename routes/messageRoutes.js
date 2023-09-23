const express = require("express");
const { fetchMessages, sendMessage, updateMessageReadStatus } = require("../controllers/messageController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router()

router  
    .route('/')
    .post(protect, sendMessage)

router
    .route('/:chatId')
    .get(protect, fetchMessages)
    .put(protect, updateMessageReadStatus)

module.exports = router
