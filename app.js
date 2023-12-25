const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const { PORT, MONGOURI } = process.env;

const port = PORT || 3000;

app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// Init route

indexRouter = require('./routes/user.route');
authRouter = require('./routes/auth.route');
statusRouter = require('./routes/status.route');


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/status', statusRouter);


// Connect to DB.

mongoose.connect(MONGOURI)
    .then(() => {
        console.log('Connected to database!!')
    })
    .catch((err) => {
        console.log('Fail to connect database!!', err)
    })


// Start

app.listen(port, () => {
    console.log(`Listen at http://localhost:${port}`);
});


module.exports = app;
