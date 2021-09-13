import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios"

export default ()=>{
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user.id

    useEffect(()=>(
        axios.post("http://localhost:3001/api/cart", { cartId:userId})
        .then(res=>console.log("DATIIITA",res.data))
    ),[])
    


    return(
        <div>
            {console.log("ISLOGGED==>", isLoggedIn)}
            {console.log("")}
            <h1>esto es un carrito</h1>
        </div>
    )
}