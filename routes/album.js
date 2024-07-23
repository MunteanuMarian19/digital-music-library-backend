// routes/album.js
const express = require("express");
const router = express.Router();
const Artist = require("../models/artist");

// Add a new album to an artist
router.post("/:artistId/albums", async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the incoming request body

    const artist = await Artist.findById(req.params.artistId);
    if (!artist) {
      console.error("Artist not found:", req.params.artistId);
      return res.status(404).json({ message: "Artist not found" });
    }

    const album = {
      title: req.body.title,
      description: req.body.description,
      songs: req.body.songs || [], // Default to an empty array if no songs are provided
    };

    console.log("Album to add:", album); // Log the album data being saved

    artist.albums.push(album);
    const updatedArtist = await artist.save();
    res.status(201).json(updatedArtist);
  } catch (err) {
    console.error("Error adding album:", err.message); // Log errors
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
