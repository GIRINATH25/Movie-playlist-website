const playlist = require(`../models/movie`);

const addPlayList = async (req, res) => {
  try {
    const { playlistname, user, title, year, type, poster } = req.body;
    
    if(!user){
        return res.json({"message":"login to add play list"});
    }

    let exists = await playlist.findOne({ playlistName: playlistname, user: user });

    if (exists) {

        exists.items.push({ title, poster, year, type });
        const save = await exists.save();
        
        if(save){
            res.json({ message: "Successfully updated playlist" });
        }else{
            res.json({"message":"Error on saving playlist"});
        }
      } else {

        exists = new playlist({
          playlistName: playlistname,
          user: user,
          visible: true,
          items: [{ title, poster, year, type }],
        });
        const save = await exists.save();
        if(save){
            res.json({ message: "Successfully stored data" });
        }else{
            res.json({ message: "Error on storing data" });
        }
      }

  } catch (err) {
    console.log("Error: " + err);
  }
};

module.exports = addPlayList;
