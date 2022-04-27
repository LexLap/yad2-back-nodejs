const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    ads: [{
        type: mongoose.Types.ObjectId, ref: 'Advertisement'
    }],
    token: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.token = token
    await user.save()

    return token
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Wrong email or password!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Wrong email or password!')
    }

    return user
}


userSchema.statics.findByToken = async (token) => {
    let user = await User.findOne({ token })

    if (!user || user.token == "") {
        throw new Error('Token is not valid!')
    }

    return user
}


userSchema.statics.findByID = async (id) => {
    const user = await User.findOne({ id })
    return user
}


userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})



const User = mongoose.model('User', userSchema)

module.exports = User