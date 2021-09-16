import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const Ordenes = ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    useEffect(()=>{
        axios.get("http://localhost:3001/api/order",{params:{userId:userId, orderId:5, saraza:3}})
        .then(res=>console.log("DATA_ORDENES==>", res.data))
        .catch(e=>console.log("erorr", e))
    },[])
    return(
        <div>
            {console.log("userId==>",userId )}             
            <h1>ordenes</h1>
        
        
        </div>
       
    )
}

export default Ordenes