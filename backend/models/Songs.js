const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    duration: { type: Number },
    coverImage: { type: String },  // URL
    audioFile: { type: String, required: true } // URL
});

module.exports = mongoose.model("Song", songSchema);