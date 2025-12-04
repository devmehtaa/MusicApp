const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.get("/", songController.getAllSongs);
router.get("/search", songController.searchSong);
router.get("/:id", songController.getSong);
router.post("", songController.createSong);

module.exports = router;