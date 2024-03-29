const express = require('express');
const app = express()
const http = require('http')
const path = require('path')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const server = http.createServer(app)
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
require('colors');

const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddlware');

dotenv.config({path: './.env'})

connectDB()

app.use(cors())
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(express.json({limit: '50mb'}))
app.use(fileUpload())
if(process.env.NODE_ENV === 'production') {
    app.use(morgan('dev'))
    
}
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join("client/build")))
    app.get("/chats", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send("API in work!")
    })
}
app.use('/api/users', userRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`Server started running at ${PORT}`.yellow.inverse);
})

io.on('connection', (socket) => {
    console.log("Connected to the socket".red.inverse)


    socket.on('message', (message) => {
        console.log(message)
    })

    socket.on('setup', (userData) => {
        socket.join(userData.id)
        socket.emit('connected')
    })

    socket.on('joinChat', (room) => {
        socket.join(room)
        console.log(`Current User Joined Room: ${room}`)
    })

    socket.on('newMessage', (message) => {
        let chat = message.chat
        if(!chat.users){
            return console.log('chat users not defined')
        }

        chat.users.forEach(user => {
            if(user._id === message.sender._id){
                return
            }
            socket.in(user._id).emit('messageRecieved', message)
        })

    })

    socket.on('newChatCreated', () => {
        console.log('new chat created')
    })

})
