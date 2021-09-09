import * as React from "react";
import { Link } from "react-router-dom";


export default () => {
  return (
    <navbar>
      <div>
        <ul>
          <Link to={"/search"}>
            <li>Search</li>
          </Link>
          <Link to={"/login"}>
            <li>Login</li>
          </Link>
          <Link to={"/register"}>
            <li>Register</li>
          </Link>
        </ul>
      </div>
    </navbar>
  );
};
