import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
import Button from "@material-ui/core/Button";


const CategoriesIndex = ()=>{
    const [categorias, setCategorias] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/api/category")
        .then(res=>setCategorias(res.data))
    },[])

    return(
        <div>
            <h1>Categorías index</h1>
                <div>
                {categorias.map(cat=>{
                return(
                    <div key={cat.id} >
                        <Link to={`/category/${cat.nombre}`}>
                            <Button
                            variant='outlined'
                            color='primary'
                            size= "large"
                            fullWidth = "true"
                            >
                                {cat.nombre}
                            </Button>
                        </Link>
                    </div>
                )
               
            })}
                </div>
            
        </div>
        
    )
}

export default CategoriesIndex