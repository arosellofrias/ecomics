import * as React from "react";
import { Link } from "react-router-dom";

const Admin = ()=>{
    const user = localStorage.getItem("user");


    return(
        <div>
        {user && JSON.parse(user).privilegios === true ? <>
            <div>
            <h1>Admin index</h1>
            <Link to="/admin/productos"><button>Admin Productos</button></Link>
            <Link to="/admin/users"><button>Admin usuarios</button></Link>
            <Link to="/admin/categories"><button>Admin Categorías</button></Link>
        
        </div>
        </>:
        <h1>You shall not pass</h1>}
        </div>
        
        
    )
}

export default Admin