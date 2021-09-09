import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendRegisterRequest } from "../state/userRegister";


export default () => {
  const dispatch = useDispatch();
  const registerUser = useSelector((state) => state.registerUser);

  const [usr, setUsr] = React.useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaDeNacimiento: "",
    direccion: "",
    password: "",
  });

  const { nombre, apellido, email,fechaDeNacimiento,direccion,token,privilegios, password } = usr;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUsr((usr) => ({ ...usr, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendRegisterRequest(usr))
      .then((data) => data)
      .catch((err) => console.log(err));
  };

  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Register</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleChange}
            className="form-control"
          ></input>
              </div>
              <br></br>
        <div className="form-group">
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
        <div className="form-group">
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
              <div className="form-group">
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            name="fechaDeNacimiento"
            value={fechaDeNacimiento}
            onChange={handleChange}
            className="form-control"
          ></input>
              </div>
              <br></br>
              <div className="form-group">
          <label>Direccion</label>
          <input
            type="text"
            name="direccion"
            value={direccion}
            onChange={handleChange}
            className="form-control"
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
            className="form-control"
          ></input>
              </div>
              <br></br>
        <div className="form-group">
          <button className="btn btn-primary"><Link to="/login">Register</Link></button>
          {registerUser.salt ? (
            <p>{`te registraste bien ${registerUser.nombre}`}</p>
          ) : (
            ""
          )}
          <Link to="/login" className="btn btn-link">
            Login
          </Link>
        </div>
        {registerUser.token?<h3>Te registraste bien {registerUser.nombre} </h3>:""}
      </form>
    </div>
  );
};
