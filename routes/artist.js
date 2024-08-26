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

// Search for artists by name
router.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  try {
    // Find artists whose name contains the query (case-insensitive)
    const artists = await Artist.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(artists);
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

// Get a specific album by its ID (under an artist)
router.get("/:artistId/albums/:albumId", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.artistId);
    if (!artist) return res.status(404).json({ message: "Artist not found" });

    const album = artist.albums.id(req.params.albumId);
    if (!album) return res.status(404).json({ message: "Album not found" });

    res.json(album);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new album to an artist
router.post("/:artistId/albums", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.artistId);
    if (!artist) return res.status(404).json({ message: "Artist not found" });

    const album = {
      title: req.body.title,
      description: req.body.description,
      songs: req.body.songs || [],
    };

    artist.albums.push(album);
    const updatedArtist = await artist.save();
    res.status(201).json(updatedArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an album
router.put("/:artistId/albums/:albumId", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.artistId);
    if (!artist) return res.status(404).json({ message: "Artist not found" });

    const album = artist.albums.id(req.params.albumId);
    if (!album) return res.status(404).json({ message: "Album not found" });

    album.set(req.body);
    const updatedArtist = await artist.save();
    res.json(updatedArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an album
router.delete("/:artistId/albums/:albumId", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.artistId);
    if (!artist) return res.status(404).json({ message: "Artist not found" });

    const albumIndex = artist.albums.findIndex(
      (album) => album._id.toString() === req.params.albumId
    );
    if (albumIndex === -1)
      return res.status(404).json({ message: "Album not found" });

    artist.albums.splice(albumIndex, 1);
    const updatedArtist = await artist.save();

    res.json(updatedArtist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
