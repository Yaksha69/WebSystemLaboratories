require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const songRoutes = require('./routes/route')

//express app
const app = express();
const cors = require('cors');

// Add this before your routes
app.use(cors());

//middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/songs',songRoutes)

//connect to db 
mongoose.connect(process.env.DB_URI)
    .then(() => {
    //listen to a port number
    app.listen(process.env.PORT, () =>{
        console.log('Connected to Database & Listening to Port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })