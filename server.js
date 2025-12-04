require("dotenv").config();
const express = require('express');

const app = express();
app.use(express.json());

// connect MongoDB
const connectDB = require('./backend/config/db');
connectDB();

const authRoutes = require("./backend/routes/authRoutes");
app.use("/auth", authRoutes);

const songRoutes = require('./backend/routes/songRoutes');
app.use('/songs', songRoutes);

const playlistRoutes = require('./backend/routes/playlistRoutes');
app.use("/playlists", playlistRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Backend is running");
});