import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import s from "../assets/styles/header.module.css";
import three from '../assets/images/1.jpg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserFromCookies = () => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        setUser(userCookie);
      }
    };
    fetchUserFromCookies();
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    setUser("");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className={s.con}>
      <img src={three} alt="logo" className={s.logo} />
      {user !== "" ? (
        <button className={s.btn} onClick={handleLogout}>Logout</button>
      ) : (
        <button className={s.btn} onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Header;
