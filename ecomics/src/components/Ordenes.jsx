import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder"
import axios from "axios";

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
            {console.log("userId==>",userId )}             
            <h1>ordenes</h1>
            {console.log("ORDERS=>", orders)}
            {orders.length !== 0 ? 
            <>
            {orders.map(order=>(
                <div>
                    <h3>Order Id:{order.id}</h3>
                    <h3>Fecha:{order.fecha}</h3>
                    <h3>Forma de pago: {order.formaDePago}</h3>
                    <Link to= {`/singleOrder/${order.id}`}><button>Mas detalles</button></Link>
                </div>
            ))}
            </> : <h1>Loading..</h1>}
        
        </div>
       
    )
}

export default Ordenes