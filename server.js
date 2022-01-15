const express = require('express');
const app = express()
const path = require('path')
const dotenv = require('dotenv');
const morgan = require('morgan')
const colors = require('colors');

const chats = require('./data/data')
const {chatRoutes} = require('./routes/chatRoutes')

dotenv.config({path: './.env'})

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/chats', chatRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server started running at http://localhost:${PORT}`.green.inverse);
})
