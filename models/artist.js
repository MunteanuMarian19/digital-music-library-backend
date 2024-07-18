// models/artist.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: String,
  length: String,
});

const AlbumSchema = new Schema({
  title: String,
  description: String,
  songs: [SongSchema],
});

const ArtistSchema = new Schema({
  name: String,
  albums: [AlbumSchema],
});

module.exports = mongoose.model("Artist", ArtistSchema);
