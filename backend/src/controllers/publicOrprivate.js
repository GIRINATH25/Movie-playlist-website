const movie = require('../models/movie');

const publicOrprivate = async (req, res) => {
  try {
    const { user, play, check } = req.body;

    const playlist = await movie.findOne({ playlistName: play, user: user });
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const result = await movie.updateOne(
      { playlistName: play, user: user },
      { $set: { visible: check } }
    );

    if (result.nModified === 0) {
      return res.status(400).json({ message: 'Failed to update visibility' });
    }

    res.status(200).json({ message: 'Visibility updated successfully' });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = publicOrprivate;
