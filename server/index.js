const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');


const swaggerDocument = require('./doc/swagger');

const port = process.env.DASHBOARD_SERVER_PORT;

const db = require('./db');
const userRouter = require('./routes/user-router');
const jwtRouter = require('./routes/jwt-router');
const nbaRouter = require('./routes/nba-router');
const cryptoRouter = require('./routes/crypto-router');
const unsplashRouter = require('./routes/unsplash-router');
const hearthstoneRouter = require('./routes/hearthstone-router');
const quotesRouter = require('./routes/quotes-router');
const prefsRouter = require('./routes/user-prefs-router');
const aboutRouter = require('./routes/about-router');

const cryptoSocket = require('./controllers/crypto-socket');

const app = express();
if (port == undefined) {
    console.log("DASHBOARD SERVER PORT NOT FOUND");
    port = 3000;
}

const apiPort = port

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

// app.use('/api', userRouter);
// app.use('/jwt', jwtRouter);
app.use(
    userRouter,
    jwtRouter,
    nbaRouter,
    cryptoRouter,
    unsplashRouter,
    hearthstoneRouter,
    quotesRouter,
    prefsRouter,
    aboutRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))