const express = require('express')
const router = express.Router()

router.route('/').post(register)
router.router('/login').post(authUser)
module.exports = router