import React from "react";
import s from "../assets/styles/Box.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const Box = ({ title, year, type, poster }) => {


  const handleSubmit = async()=>{
    try{
      const playlistname = prompt("Enter a playlist name \n !!if you want to add this into your available playlist mention it's name");
      const user = Cookies.get("user");
      const res = await axios.post(`/addplaylist`, {playlistname,user,title,year,type, poster});
      console.log(res.data);

    }catch(err){
      console.log("Error: "+err);
    }
  }
  return (
    <div className={s.box}>
      <img
        src={poster}
        alt=""
      />
      <div className={s.txt}>
        <p className={s.txt1}>{year} / {type}</p>
        <p className={s.txt2}>{title}</p>
      </div>
      <input type="submit" className={s.btn} value="Add to playlist"  onClick={handleSubmit}/>
    </div>
  );
};

export default Box;
