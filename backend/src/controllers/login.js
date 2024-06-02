const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const env = process.env;

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        const hasemail = await user.findOne({email:email});

        if(!hasemail){
            return res.json({"message": "Username/email doesn't exists"});
        }

        const hasMatch = await bcrypt.compare(password,hasemail.password);

        if(!hasMatch){
            return res.json({"message":"passwords does not match"});
        }

        const token = jwt.sign({email},env.secret,{expiresIn:'1h'}); 
        res.cookie('auth_tokenDoc', token, { httpOnly: false, maxAge: 3600000, secure: false });
        res.json({"message":"login success","user":email});

    }catch(err){
        console.log(`Error: `+err);
    }
}

module.exports = login;