const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
// const { uploadAudio, uploadImage } = require('../middleware/uploadMiddleware');
const upload = require('../middleware/uploadMiddleware'); 


router.get("/", songController.getAllSongs);
router.get("/search", songController.searchSong);
router.get("/play/:id", songController.play);
router.get("/:id", songController.getSong);
router.post("", upload.fields([
    { name: "coverImage", maxCount: 1},
    { name: "audioFile", maxCount: 1}]),
    songController.createSong
    );
    
module.exports = router;