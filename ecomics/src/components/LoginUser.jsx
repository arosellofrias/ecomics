import axios from "axios";
import React, { useState } from "react";
import "./compStyles/Login.css";

const LoginUser = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn ] = useState({})
  
  const loginSubmit = (body,e)=>{
    console.log("BODY==>",body)
    e.preventDefault()
    axios.post("api/user/login",body)
    .then(res=>res.data)
    .then(body=>setIsLoggedIn(body))
  }
  
  return (
    <div className="login">
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
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
