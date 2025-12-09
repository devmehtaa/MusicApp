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
        const coverImagePath = req.files.coverImage?.[0]?.path;
    const audioFilePath  = req.files.audioFile?.[0]?.path;

        const {title, artist, album, duration} = req.body;
        if(!title || !artist){
            return res.status(400).json({message: "title, artist or audio file not found"});
        }
        const newSong = await Song.create({
            title: title,
            artist: artist,
            audioFile: audioFilePath,
            album: album || "",
            duration: duration || 0,
            coverImage: coverImagePath || ""
        });
        res.status(201).json({ message: "Song created", song: newSong });
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const fs = require('fs');

exports.play = async (req, res) => {
    try{
        const songId = req.params.id;
        if(!songId){
            return res.status(404).json({message: "songId not found"});
        }
        const filePath = path.join(__dirname, "..", "uploads", "audio", songId, ".mp3");
        if(fs.existsSync(filePath)){
            return res.status(404).json({message: "File path not found"});
        }
        const stat = fs.statSync(filePath)
        res.writeHead(200, {
            "Content-Length": stat.size,
            "Content-Type": "audio/mpeg",
        })

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);

    }catch(error){
        res.status(500).json({error: error.message});
    }
};
