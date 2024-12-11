const express = require('express')
const song = require('../models/models')
const router = express.Router()
const {
    getSongs,
    createSongs,
    deleteSongs,
    updateSongs
} = require('../controllers/controllers')


//GET All Workouts
router.get('/all', getSongs)


//Post a new Workout
router.post('/new', createSongs)

//Deleet a Workout
router.delete('/delete/:id', deleteSongs)

//Update a Workout
router.patch('/update/:id', updateSongs)

module.exports= router