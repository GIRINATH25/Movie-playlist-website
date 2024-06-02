const user = require(`../models/user`);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = process.env;

const register = async(req,res)=>{
    try{
        const {email,password} = req.body;

        const hasemail = await user.findOne({email:email});

        if(hasemail){
            return res.json({"message": "Username/email already exists"});
        }

        const hash = await bcrypt.hash(password,12);

        if (!hash) {
            return res.json({ "message": "Error in hashing password" });
        }

        const token = jwt.sign({email},env.secret,{expiresIn:'1h'}); 
        const save = await user.create({email:email,password:hash,token:token});

        if(!save){
            return res.json({"message": "Error in storing data"});
        }

        res.cookie('auth_tokenDoc', token, { httpOnly: false, maxAge: 3600000,secure:false });
        res.json({"message": "Successfully registered","user":email});
    }catch(err){
        console.log(`Error: ${err}`);
    }
}

module.exports = register;