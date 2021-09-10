import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { sendRegisterRequest } from "../state/userRegister";
import "./compStyles/Login.css";


export default () => {
  const dispatch = useDispatch();
  const registerUser = useSelector((state) => state.registerUser);
  const history = useHistory()

  const [usr, setUsr] = React.useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaDeNacimiento: "",
    direccion: "",
    password: "",
  });

  const { nombre, apellido, email,fechaDeNacimiento,direccion, password } = usr;

  const handleChange = (e) => {
    e.preventDefault();
    /* console.log() */
    const { name, value } = e.target;
    setUsr((usr) => ({ ...usr, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("USR",usr)
    dispatch(sendRegisterRequest(usr))
    history.push("/login")
  };

  return (
    <div className="login">
      <h2>Register</h2>
      <form  name="form" onSubmit={handleSubmit}>
        <div >
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          ></input>
              </div>
              <br></br>
        <div >
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={apellido}
            onChange={handleChange}
            className="form-control"
          ></input>
              </div>
              <br></br>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="form-control"
          ></input>
              </div>
              <br></br>
              <div >
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            name="fechaDeNacimiento"
            value={fechaDeNacimiento}
            onChange={handleChange}
            
          ></input>
              </div>
              <br></br>
              <div >
          <label>Direccion</label>
          <input
            type="text"
            name="direccion"
            value={direccion}
            onChange={handleChange}
           
          ></input>
              </div>
              <br></br>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            
          ></input>
              </div>
              <br></br>
        <div >
          <button type="submit">Register</button>
          {registerUser.salt ? (
            <p>{`te registraste bien ${registerUser.nombre}`}</p>
          ) : (
            ""
          )}
        </div>
        {registerUser.token?<h3>Te registraste bien {registerUser.nombre} </h3>:""}
      </form>
    </div>
  );
};
