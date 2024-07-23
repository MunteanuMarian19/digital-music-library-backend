// models/artist.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String, required: true },
  length: { type: String, required: true }, // Duration in mm:ss format
});

const AlbumSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  songs: [SongSchema],
});

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  albums: [AlbumSchema],
});

module.exports = mongoose.model("Artist", ArtistSchema);
