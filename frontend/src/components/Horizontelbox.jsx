import React from "react";
import s from "../assets/styles/Horizontel.module.css";
import { useNavigate } from "react-router-dom";

const Horizontelbox = ({ image, playlistname, visible , full }) => {
  const navi = useNavigate();


  const handlenavi = () => {
      navi('/playview',{state:full});
  }
  
  return (
    <div className={s.con} onClick={handlenavi}>
      <img src={image} className={s.image} alt="img" />
      <div className={s.left}>
        <div className={s.playName}>{playlistname}</div>
        <div className={s.pbOrpv}>
          {visible ? <span>public</span> : <span>private</span>}
        </div>
      </div>
    </div>
  );
};

export default Horizontelbox;
