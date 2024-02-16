require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const firstData = require('./routes/firstData');
const userRoutes = require('./routes/user')
const projectInfo = require('./routes/projectInfo')

require('express-async-errors');

// express app
const app = express();

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/firstDataSets',  firstData) // first submit data
app.use('/api/user', userRoutes)
app.use('/api/projectInfo', projectInfo)

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  });

// connect to database
const db_uri = `${process.env.MONGO_URI}`;

mongoose.connect(db_uri)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to database & listening on port ', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })
