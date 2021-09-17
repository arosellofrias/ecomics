import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Admin = () => {
  const user = localStorage.getItem("user");

  return (
    <div>
      {user && JSON.parse(user).privilegios === true ? (
        <>
          <div>
            <h1>Panel admin</h1>
            <Link to="/admin/create">
              <Button variant="outlined" color="primary" size="large">
                Crear Productos
              </Button>
            </Link>
            <Link to="/admin/productos">
              <Button variant="outlined" color="primary" size="large">
                Admin Productos
              </Button>
            </Link>
            <Link to="/admin/users">
              <Button variant="outlined" color="primary" size="large">
                Admin usuarios
              </Button>
            </Link>
            <Link to="/admin/categories">
              <Button variant="outlined" color="primary" size="large">
                Admin Categorías
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div>
          <h1>You shall not pass</h1>
          <img
            src="https://media1.giphy.com/media/YkfhemFXalh7O/giphy.gif?cid=790b7611ea781e4c2093f9763f595210ca323b2befef5596&rid=giphy.gif&ct=g"
            alt="Necesitas ser admin"
          />
          <Link to={"/comics"}>
            <h1>Volver al Home</h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Admin;
