const Song = require('../models/models')
const mongoose = require('mongoose')

//get all song
    const getSongs = async (req, res) => {
        const songs = await Song.find({}).sort({createdAt: 1})

        res.status(200).json(songs)
    }

//create a song
    const createSongs = async(req, res) => {
        const {Name, Artist, Albums, Date} = req.body
        
        //add document to db
        try{
            const newSong = await Song.create({Name, Artist, Albums, Date})
            res.status(200).json(newSong)
        }catch (error){
            res.status(400).json({error: error.message})
        }
    }

//delete a song
    const deleteSongs = async (req, res) => {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Invalid Id'})
        }

        const deletedSong = await Song.findOneAndDelete({_id: id})

        if (!deletedSong){
            return res.status(404).json({error: 'No such song'})
        }

        res.status(200).json(deletedSong)

    }


//update a song
const updateSongs = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid Id' })
    }

    const updatedSong = await Song.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!updatedSong) {
        return res.status(404).json({ error: 'No such song' })
    }

    res.status(200).json(updatedSong)
}


module.exports = {
    getSongs,
    createSongs,
    deleteSongs,
    updateSongs
}