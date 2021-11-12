const express = require('express')
const cors = require('cors')

const port = process.env.DASHBOARD_SERVER_PORT;

const db = require('./db');

const app = express()
if (port == undefined)
    port = 3000;

const apiPort = port

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))