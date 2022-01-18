const asyncHandler = require('express-async-handler')
const chats = require('../data/data');

//@DESC:     Get all the chats from the dummy data
//@ROUTE:    /api/chats/
//@ACCESS:   
const getChats = asyncHandler(async (req, res) => {
    res.status(200).json(chats)
})


//@DESC:     Get a single chat
//@ROUTE:    /api/chats/:id
//@ACCESS:
const getSingleChat = asyncHandler(async (req, res) => {
    const id = req.params.id
    if(id) {
        const chat = chats.find(chat => chat._id === id)
        res.status(200).json(chat)
    }
})

module.exports = {
    getChats,
    getSingleChat
}