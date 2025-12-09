const multer = require("multer");
const path = require("path");

// single storage that handles both image + audio
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "coverImage") {
      cb(null, path.join(__dirname, "..", "uploads", "images"));
    } else if (file.fieldname === "audioFile") {
      cb(null, path.join(__dirname, "..", "uploads", "audio"));
    } else {
      cb(new Error("Invalid fieldname"));
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    // name file by songId if provided in body
    const songId = req.body.songId || Date.now(); 
    cb(null, songId + ext);
  }
});

const upload = multer({ storage });

module.exports = upload;
