import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../components/Header";
import s from "../assets/styles/Playview.module.css";
import Box1 from "../components/Box1";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Public = () => {
  const { state } = useLocation();
  const [check, setCheck] = useState(state.visible);
  const user = Cookies.get('user');
  const play = state.playlistName;

  useEffect(() => {
    setCheck(state.visible);
  }, [state.visible]);

  const handleschange = async () => {
    try {
      const updatedCheck = !check;
      setCheck(updatedCheck);
      const res = await axios.post('/visible', { user, play, check: updatedCheck });
      toast.dark(res.data.message);
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  return (
    <div>
      <Header />
      <div className={s.con}>
        <h2 className={s.header}>
          {state.playlistName}
          {state.user === user ? (
            <span>
              <div className={s.wrapCheck57}>
                <input
                  type="checkbox"
                  className={s.switch}
                  onChange={handleschange}
                  checked={check}
                />
              </div>
            </span>
          ) : (
            <span></span>
          )}
        </h2>
        <div>
          {check ? (
            <span className={s.p}>public</span>
          ) : (
            <span className={s.p}>private</span>
          )}
        </div>
        <div className={s.mainsec}>
          {state.items && state.items.length > 0 && (
            state.items.map((movie, ind) => (
              <div key={ind}>
                <Box1
                  title={movie.title}
                  type={movie.type}
                  year={movie.year}
                  poster={movie.poster}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Public;
