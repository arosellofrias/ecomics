import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "./compStyles/Login.css";
import { sendLoginRequest } from "../state/userLogin";

const LoginUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*  const [isLoggedIn, setIsLoggedIn ] = useState({})  */

  const loginSubmit = (body, e) => {
    console.log("BODY==>", body);
    e.preventDefault();
    dispatch(sendLoginRequest(body));
    Swal.fire({
      title: `Bienvenido`,
      text: `gracias por visitarnos nuevamente`,
      icon: "success",
      timer: "2000",
    });
    history.push("/comics");
  };

  return (
    <div className="login">
      <h1>Logueate acá 🦸‍♂️</h1>

      <form
        className="login_form"
        onSubmit={(e) =>
          loginSubmit(
            {
              email: email,
              password: password,
            },
            e
          )
        }
      >
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
