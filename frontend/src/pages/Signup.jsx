import React, { useState } from "react";
import s from "../assets/styles/login.module.css";
import Header from "../components/Header";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('/register',{email,password});
      console.log(res.data.message);
      Cookies.set("user",res.data.user);
      var data = res.data;
      if(res.data.message==="Successfully registered"){
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
          <div className={s.login}>Sign up</div>
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
          <input type="submit" className={s.btn} value="Sign up" />
          <p>
            Have an account <Link to="/login">click here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
