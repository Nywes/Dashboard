const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.DASHBOARD_SERVER_PORT;

if (port == undefined)
    port = undefined;

const apiPort = port

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))