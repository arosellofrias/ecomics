import * as React from "react";
import { Link } from "react-router-dom";

const AdminCategories = ()=>{
    const user = localStorage.getItem("user");
    return(
        <div>
            {user && JSON.parse(user).privilegios === true ? <><div><h1>Categorías</h1></div></>
             : 
             <div>
                 <h1>You shall not pass.</h1>
                 <img src="https://media1.giphy.com/media/YkfhemFXalh7O/giphy.gif?cid=790b7611ea781e4c2093f9763f595210ca323b2befef5596&rid=giphy.gif&ct=g" alt="Necesitas ser admin" />
                <Link to={"/comics"} ><h1>Volver al Home</h1></Link>

            </div>}
        </div>
    )
}

export default AdminCategories