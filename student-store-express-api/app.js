const express = require('express')
const app = express()

const cors = require("cors");

const storeRouter = require("./routes/storeRoutes");

app.use(cors());
app.use(express.json());

app.use("/store", storeRouter);

app.get('/', (req, res) => {
    const response = {
      ping: 'pong'
    }
    res.status(200).json(response)
})

module.exports = app
