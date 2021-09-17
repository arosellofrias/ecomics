import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminCategories = ()=>{
    const user = localStorage.getItem("user");
    const[categoriaInput, setCategoriaInput] = useState("")
    const handleChange=(e)=>{
        e.preventDefault();
        setCategoriaInput(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:3001/api/admin/category", {nombre:categoriaInput})
        .then(res=>console.log(res.data))

    }
    return(
        <div>
            {user && JSON.parse(user).privilegios === true ? <><div>
                <h1>Categorías</h1>
                <h1>Crear categoría</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input value={categoriaInput} onChange={(e)=>handleChange(e)} placeholder="Crear Categoria"></input>
                    <button type ="submit">CREAR</button>
                </form>
                </div></>
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