const express = require('express')
const logger = require('../logger/winston')
const User = require('../models/userModel')
const router = new express.Router()

router.post('/subscribe', async (req, res) => {

    let email = { email: req.body.email }
    if (await User.findOne(email)) {
        res.status(400).send("EMAIL_EXISTS")
    } else
        try {

            const user = new User(req.body)
            const token = await user.generateAuthToken()
            await user.save()
            res.status(201).send({
                token,
                user: { username: user.email, id: user._id }
            })
        } catch (e) {
            res.status(500).send({
                message: "Internal server error"
            })
        }

})

router.post('/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.status(200).send({
            token,
            user
        })

    } catch (error) {
        logger.log('error', error.message)
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

router.post("/logout", async (req, res) => {

    try {
        const user = await User.findByToken(req.body.token)
        user.token = ""
        await user.save()
        res.send();
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})


module.exports = router 