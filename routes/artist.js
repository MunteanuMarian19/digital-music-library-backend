// routes/artist.js
const express = require("express");
const router = express.Router();
const Artist = require("../models/artist");

// Get all artists
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single artist by ID
router.get("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new artist
router.post("/", async (req, res) => {
  const artist = new Artist(req.body);
  try {
    const newArtist = await artist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an artist
router.put("/:id", async (req, res) => {
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedArtist)
      return res.status(404).json({ message: "Artist not found" });
    res.json(updatedArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an artist
router.delete("/:id", async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    res.json({ message: "Artist deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search for artists by name
router.get("/search/:name", async (req, res) => {
  try {
    const artists = await Artist.find({
      name: new RegExp(req.params.name, "i"),
    });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
