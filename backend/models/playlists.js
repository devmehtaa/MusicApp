const mongoose = require('mongoose');

const PlaylistsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
    title: { type: String, required: true}
});

module.exports = mongoose.model("Playlist", PlaylistsSchema);