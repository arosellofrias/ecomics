import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder"
import axios from "axios";
import Divider from '@mui/material/Divider';
import Button from "@material-ui/core/Button";

const Ordenes = ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const[orders, setOrders] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/api/order",{params:{userId:userId}})
        .then(res=>setOrders(res.data))
        .catch(e=>console.log("erorr", e))
    },[])
    return(
        <div>
            <h1>Ordenes</h1>
            {orders.length !== 0 ? 
            <>
            {orders.map(order=>(
                <div>
                    <h3>Número de orden:{order.id}</h3>
                    <h3>Fecha:{order.fecha}</h3>
                    <h3>Forma de pago: {order.formaDePago}</h3>
                    <Link to= {`/singleOrder/${order.id}`}>
                    <Button
                    variant="outlined" size="large"
                    >Mas detalles</Button></Link>
                    <Divider/>
                    
                </div>
            ))}
            </> : 
            <div>
                <h1>No se pudo mostrar la lista de ordenes</h1>
                <h3>Te recomendamos volver a logearte</h3>
            </div>
            
            }
        
        </div>
       
    )
}

export default Ordenes