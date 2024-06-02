import React, { useState } from "react";
import s from "../assets/styles/login.module.css";
import Header from "../components/Header";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`/login`,{email,password});
      
      Cookies.set("user",res.data.user);
      if(res.data.message==="login success"){
        navigate("/");
      }else{
        toast.dark(res.data.message);
      }

    }catch(err){
      console.log("Error: "+err);
    }
  }


  return (
    <div className={s.full}>
      <Header />
      <div className={s.loginBod}>
        <form className={s.forms} onSubmit={(e)=>handleSubmit(e)}>
          <div className={s.login}>login</div>
          <input
            type="text"
            className={s.inputbox}
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className={s.inputbox}
            placeholder="**************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="submit" className={s.btn} value="login in" />
          <p>
            Don't have an account ? <Link to="/signup">click here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
