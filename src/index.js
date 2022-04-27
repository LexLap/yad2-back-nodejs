const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const adsRouter = require('./routers/adsRouter')
const usersRouter = require('./routers/usersRouter')
const imagesRouter = require('./routers/imagesRouter')

const port = process.env.PORT;
const app = express();

app.use(cors())
app.use(express.json())

app.use("/", usersRouter)
app.use("/ads", adsRouter)
app.use("/images", imagesRouter)


app.use(async function (err, req, res, next) {

    if (!err) return next();

    res.status(500).send({
        message: "Global server error"
    })
});

app.use(async (req, res) => res.status(404).send({ message: "Page not found" }))

app.listen(port, () => console.log("Server connected, port:", port));