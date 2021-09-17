import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"

const CategoriesIndex = ()=>{
    const [categorias, setCategorias] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/api/category")
        .then(res=>setCategorias(res.data))
    },[])

    return(
        <div>
            <h1>Categorías index</h1>
            {console.log("categorias==>", categorias)}
            {categorias.map(cat=>{
                {console.log("CAT==>", cat)}
                return(
                    <div key={cat.id}>
                        <Link to={`/category/${cat.nombre}`}><button>{cat.nombre}</button></Link>
                    </div>
                )
               
            })}
        </div>
        
    )
}

export default CategoriesIndex