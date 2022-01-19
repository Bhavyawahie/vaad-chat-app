const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    email: {
        type: String,
        required: [true, "Enter a valid email address!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    displayPicture: {
        type: String,
        required: [true, "Please upload a displayPicture for your profile"],
        default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    }
}, {
    timestamps: true
})

userSchema.methods.matchPasswords = async function (enterPassword) {
    return bcrypt.compare(enterPassword, this.password)
}

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    this.password = await bcrypt.hash(this.password, salt)
})

const userModel = mongoose.model('User', userSchema)
module.exports = userModel