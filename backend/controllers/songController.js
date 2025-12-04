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

exports.createSong = async (req, res) => {
    try {
        const {title, artist, album, duration, coverImage, audioFile} = req.body;
        if(!title || !artist || !audioFile){
            return res.status(400).json({message: "title, artist or audio file not found"});
        }
        const newSong = await Song.create({
            title: title,
            artist: artist,
            audioFile: audioFile,
            album: album || "",
            duration: duration || 0,
            coverImage: coverImage || ""
        });
        res.status(201).json({ message: "Song created", song: newSong });
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

