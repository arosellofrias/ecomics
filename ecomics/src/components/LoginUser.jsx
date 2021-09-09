import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./compStyles/Login.css";
import {sendLoginRequest} from "../state/userLogin"

const LoginUser = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 /*  const [isLoggedIn, setIsLoggedIn ] = useState({})  */
  
  const loginSubmit = (body,e)=>{
    console.log("BODY==>",body)
    e.preventDefault()
    dispatch(sendLoginRequest(body))
  }
  
  return (
    <div className="login">
      {console.log("ISLOGGEDIN===>>>",isLoggedIn )}
        <h1>Logueate acá 🦸‍♂️</h1>
        
        
      <form className="login_form" onSubmit={(e)=>(loginSubmit({
        email:email,
        password: password
      },e))}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit_btn">
          <Link to="/comics">Ingresar</Link>
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
