const movie = require(`../models/movie`);

const provider = async (req,res)=>{
    try{
        const data = await movie.find();
        res.json(data);
    }catch(err){
        console.log("Error; "+err);
    }
}

module.exports = provider;