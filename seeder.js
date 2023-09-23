const asyncHandler = require('express-async-handler')
const Message = require('./models/messageModel')
const Chat = require('./models/chatModel')
const User = require('./models/userModel')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')


const updateAllMessages = async (req, res) => {
    try {
        await Message.updateMany({}, {
            $set: { read: true }
        })
        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}

dotenv.config({path: './.env'})
connectDB()
updateAllMessages()
