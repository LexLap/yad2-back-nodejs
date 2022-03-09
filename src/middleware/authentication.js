const jwt = require('jsonwebtoken')
const logger = require('../logger/winston')
const User = require('../models/userModel')
const JWT_SECRET = process.env.JWT_SECRET

const auth = async (req, res, next) => {
    try {

        // const token = req.header('Authorization').replace('Bearer ', '');
        console.log(req.params.token)

        const token = req.params.token
        const result = jwt.verify(token, JWT_SECRET)

        const user = await User.findOne({ _id: result._id })

        if (user) {
            req.userId = result._id
            console.log('1')

        } else {
            logger.log('error', "Request from unknown user id:" + result._id)
            res.status(401).send({
                message: "Request from unknown user id"
            })
            return
        }

        next()

    } catch (error) {
        logger.log('error', error.message)
        res.status(401).send({
            message: error.message
        })
        return
    }
}

module.exports = auth