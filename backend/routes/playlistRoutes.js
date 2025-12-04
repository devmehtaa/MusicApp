const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.post("", playlistController.createPlaylist);
router.post("/:id/add", playlistController.addSong);
router.delete("/:id/remove", playlistController.removeSong);
router.get("/:userId", playlistController.getAllPlaylists);

module.exports = router;