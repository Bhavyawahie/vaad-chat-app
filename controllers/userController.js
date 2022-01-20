const asyncHandler = require('express-async-handler')
const res = require('express/lib/response')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

//  @desc:   Register a new user
//  @route:  POST /api/users/
//  @access: Public     

const register = asyncHandler(async () => {
    const {name, email, password} = req.body
    const existingUser = await User.findOne({email})
    if(existingUser){
        res.status(400)
        throw new Error('User already Exists!')
    }

    const user = await User.create({
        name, email, password
    })

    if(user) {
        await user.save()
        res.status(200)
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAppAdmin: user.isAppAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data!')
    }
})

//  @desc:   Authenticate already registered users
//  @route:  POST /api/users/login
//  @access: Public     

const authUser = asyncHandler(async () => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && await user.matchPasswords(password)){
        res.status(200).json({
            name: user.name,
            email: user.email,
            isAppAdmin: user.isAppAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password!')
    }
})

module.exports = {
    register,
    authUser
}