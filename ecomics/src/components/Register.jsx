import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendRegisterRequest } from "../state/userRegister";
import "./compStyles/Login.css";
import Swal from 'sweetalert2'

export default () => {
  const dispatch = useDispatch();
  const registerUser = useSelector((state) => state.registerUser);

  const [usr, setUsr] = React.useState({
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    password: "",
  });

  const { nombre, apellido, email, direccion, password } =
    usr;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUsr((usr) => ({ ...usr, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendRegisterRequest(usr)).then(res => {
      Swal.fire({
        title: `Te registraste correctamente`,
        text: `Registrado correctamente`,
        icon: "success",
        timer: "2000"
      })})
  };

  return (
    <div className="login">
      <h2>Register</h2>
      <form
        className="login_form"
        name="form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          aria-label="required"
          placeholder="Nombre"
          type="text"
          name="nombre"
          value={nombre}
          onChange={handleChange}
          className="form-control"
        ></input>
        <br></br>
        <input
          aria-label="required"
          placeholder="Apellido"
          type="text"
          name="apellido"
          value={apellido}
          onChange={handleChange}
          className="form-control"
        ></input>
        <br></br>
        <input
          aria-label="required"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="form-control"
        ></input>
        <br></br>
        <input
          aria-label="required"
          placeholder="Direccion"
          type="text"
          name="direccion"
          value={direccion}
          onChange={handleChange}
          className="form-control"
        ></input>
        <br></br>
        <input
          aria-label="required"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="form-control"
        ></input>
        <br></br>
        <button type="submit" className="submit_btn">
          Register
        </button>
      </form>
    </div>
  );
};