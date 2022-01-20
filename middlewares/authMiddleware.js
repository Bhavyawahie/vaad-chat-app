const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { Error } = require('mongoose')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authentication.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decodedToken).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized, token is invalid!')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not, Authorized, Token not found!')
    }
})

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }
    else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

module.exports = {
    protect,
    isAdmin
}