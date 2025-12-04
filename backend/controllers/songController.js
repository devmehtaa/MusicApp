const Song = require('../models/Songs.js');

exports.getAllSongs = async (req, res) => {
    try{
        const songs = await Song.find({});
        res.json({songs: songs});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

exports.getSong = async (req, res) => {
    try{
        const id = await req.params.id;
        const song = await Song.findById(id);
        if(!song){
            res.status(500).json({message: "No song found"});
        }
        res.json(song);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.searchSong = async (req, res) => {
    try{
        const query = req.query.q;
        const songs = await Song.find({
            title: { $regex: query, $options: "i"}
        });
        res.json(songs);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

