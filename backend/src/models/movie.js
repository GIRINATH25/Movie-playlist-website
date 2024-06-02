const mongoose = require("mongoose");

const playlistItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const playlistSchema = new mongoose.Schema({
  playlistName: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  items: [playlistItemSchema],
});

const playlist = mongoose.model("Playlist", playlistSchema);

module.exports = playlist;
