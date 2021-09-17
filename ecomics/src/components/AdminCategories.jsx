import * as React from "react";
import { Link } from "react-router-dom";

const AdminCategories = ()=>{
    const user = localStorage.getItem("user");
    return(
        <div>
            {user && JSON.parse(user).privilegios === true ? <><div><h1>Categorías</h1></div></> : <div><h1>You shall not pass.</h1></div>}
        </div>
    )
}

export default AdminCategories