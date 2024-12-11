const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Artist:{
        type: String,
        required: true
    }, 
    Albums: {
        type: String,
        required: true
    },
    Date: {
        type: Number,
        required: true
    }
},{timestamps: true})


module.exports = mongoose.model('song', SongSchema)