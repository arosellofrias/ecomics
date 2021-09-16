import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleOrder = ()=>{
    const params = useParams()
    const id = params.orderId
    const [orderDetails, setOrderDetails] = useState([])
    const comics = useSelector((state) => state.comics);
    useEffect(()=>{
        axios.get("http://localhost:3001/api/order",{params:{orderId:id}})
        .then(res=>setOrderDetails(res.data))
        .catch(e=>console.log("erorr", e))
    },[])
    let precioTotal = 0
  
    return(
        <div>
            {console.log("singleORder===>", orderDetails)}
            {console.log("comics==>", comics)}
            <h1>En esta orden pediste:</h1>
             {orderDetails.map(ord=>{
                 console.log("y estoo===>", ord)
                 let orderFilter = comics.filter((comic)=>{
                     return(
                         comic.id == ord.productId
                     )
                 })
                
                 let sumador = (orderFilter[0].precio * ord.cantidad)
                 precioTotal = precioTotal + sumador

                 
              return (
                  <div>
                      {console.log("SUMVUELTAS==>",sumador)}
                      {console.log("totalVueltas===>",precioTotal )}
                      <h5>Item:</h5>
                      {console.log("ord", ord)}
                      {console.log("filtromap",orderFilter)}
                      <div> 
                          <ul>
                               <li><p>Unidades:   {`${ord.cantidad}`}</p></li> 
                               <li><p>Del comic: <strong>{`${orderFilter[0].nombre}`}</strong> </p></li> 
                               <li><p>Precio unitario: <strong>${`${orderFilter[0].precio}`}</strong> </p></li>
                               <li><p>Total: <strong>${`${orderFilter[0].precio * ord.cantidad}`}</strong> </p></li>
                          </ul>
                       {/*  <p>{ord.cantidad}</p>
                        <h3>{orderFilter[0].nombre}</h3> */}
                     
                     
                     </div>
                    
                      
                      
                      
                  </div>
              )
            })}  
            {console.log("LAPOSSSSTA=>",precioTotal )} 
            <h1>PRECIO TOTAL : {`${precioTotal}`}</h1> 
            
        </div>
       
    )
}

export default SingleOrder