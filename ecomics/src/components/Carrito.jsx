import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios"
import styles from "./compStyles/comics.module.css"

export default ()=>{
    const [carritoProductos, setCarritoProductos] = useState([])
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user.id
    const comics = useSelector((state) => state.comics);
    let array = []
    let dataArray = []
    let prueba = [] 
    
    useEffect(()=>{
        axios.post("http://localhost:3001/api/cart", { cartId:userId})
        
        .then(res=>{
            dataArray = res.data
            /* console.log("ESESTEEEEEEE=>",dataArray) */
            res.data.map(obj=>{
            console.log("RESDATA", res.data)
            console.log("objjjjjj", obj)
            array.push(obj.productId)
        })})
        .then(()=>setCarritoProductos(array))
    },[])

    
    let carritoComics = comics.filter(comic=>carritoProductos.includes(comic.id)) 
   /*  let dataMapeado = dataArray.map(item=>{
        prueba = carritoComics.includes(item.id)
        {console.log("?????????=>", prueba)}
    }) */
     

    return(
        <div>
        <div className={styles.comics}>
            {console.log("arregloAMapear??=>>", carritoComics)}
            {carritoComics.map(singleCarritoComic=>(
                <div key={singleCarritoComic.id} className={styles.singleComic}>
                    <h1 className={styles.h1}>{singleCarritoComic.nombre}</h1>
                    <img className={styles.img} src={singleCarritoComic.imagenUrl}/>
                    <p>PRECIO:${}</p>
                </div>
            ))}
            
        </div>
        <h1>PRECIO</h1>
        </div>
    )
}