import React from "react";
import s from "../assets/styles/Box.module.css";

const Box1 = ({ title, year, type, poster }) => {
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
    </div>
  );
};

export default Box1;
