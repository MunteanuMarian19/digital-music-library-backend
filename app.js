// app.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const artistsRouter = require("./routes/artist");
const albumRouter = require("./routes/album");

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/artists", artistsRouter);
app.use("/api/artists", albumRouter); // Using the same prefix for album routes

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

mongoose
  .connect(config.mongoURI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
