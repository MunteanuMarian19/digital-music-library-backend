// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const artistsRouter = require("./routes/artist"); // Ensure this path is correct

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI, {
    // Remove useNewUrlParser and useUnifiedTopology
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // Add new options for the new driver version
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of the default 30 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/artists", artistsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
