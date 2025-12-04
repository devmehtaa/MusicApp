const Playlist = require('../models/playlists');
const Song = require('../models/Songs');

exports.createPlaylist = async (req, res) => {
    try{
        const {title, user, songs} = req.body;
        if(!title || !user){
            res.status(400).json({message: "title or user not found"});
        }
        const newPlaylist = await Playlist.create({
            title: title,
            user: user,
            songs: songs || []
        })
        res.status(201).json({message: "Playlist created", newPlaylist});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.addSong = async (req, res) => {
    try{
        const playlist_id = req.params.id;
        const { song_id } = req.body;
        if(!song_id || !playlist_id){
            return res.status(400).json({message: "song or playlist not found"});
        }

        const playlist = await Playlist.findById(playlist_id);
        if(!playlist){
            return res.status(404).json({message: "playlist does not exist"});
        }
        const song = await Song.findById(song_id);
        if(!song){
            return res.status(500).json({message: "Song does not exist"});
        }

        if(playlist.songs.includes(song_id)){
            return res.status(400).json({message: "Song already exists in the playlist"});
        }

        const newPlaylist = await Playlist.findByIdAndUpdate(playlist_id, 
            {$push: { songs: song_id}},
            {navigatorew: true}
        );

        res.status(200).json({newPlaylist, message: "Song added to playlist"});

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.removeSong = async (req, res) => {
    try{
        const songId = req.params.id;
        const playlistId = req.body.playlistId;
        if(!songId || !playlistId){
            return res.status(404).json({message: "song or playlist not found"});
        }
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }
        if(!playlist.songs.includes(songId)){
            return res.status(404).json({message: "Song does not exist in playlist"});
        }
        const updatedPlaylist = await Playlist.findOneAndUpdate(
            { _id: playlistId },
            {$pull: {songs: songId}},
            {new: true}
        )
        res.status(200).json({
            message: "Song removed from playlist",
            playlist: updatedPlaylist
        });

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.getAllPlaylists = async (req, res) =>{
    try{
        const userId = req.params.userId;
        if(!userId){
            res.status(404).json({message: "user not found"});
        }
        const playlist = await Playlist.find({ user: userId });
        res.status(200).json({playlist, message: "User playlist fetched"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}