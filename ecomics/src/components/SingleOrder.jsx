import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./compStyles/singleOrder.module.css"
import Divider from '@mui/material/Divider';


const SingleOrder = () => {
  const params = useParams();
  const id = params.orderId;
  const [orderDetails, setOrderDetails] = useState([]);
  const comics = useSelector((state) => state.comics);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/order", { params: { orderId: id } })
      .then((res) => setOrderDetails(res.data))
      .catch((e) => console.log("erorr", e));
  }, []);
  let precioTotal = 0;

  return (
    <div>
      <h1>En esta orden pediste:</h1>
      {orderDetails.map((ord) => {
        let orderFilter = comics.filter((comic) => {
          return comic.id == ord.productId;
        });
        let sumador = orderFilter[0].precio * ord.cantidad;
        precioTotal = precioTotal + sumador;
        return (
          <div>

            <div className={styles.contenedor}>
              <div className={styles.left}>
                <h5>Item:</h5>
                <p>Unidades: {`${ord.cantidad}`}</p>
                <p>
                  Del comic: <strong>{`${orderFilter[0].nombre}`}</strong>{" "}
                </p>
                <p>
                  Precio unitario:{" "}
                  <strong>${`${orderFilter[0].precio}`}</strong>{" "}
                </p>
                <p>
                  Total:{" "}
                  <strong>${`${orderFilter[0].precio * ord.cantidad}`}</strong>{" "}
                </p>
              </div>

              <div className={styles.right}>
                <img
                  className={styles.img}
                  src={`${orderFilter[0].imagenUrl}`}
                />
              </div>

            </div>
            <Divider/>
          </div>
          
        );
      })}
      <h1>PRECIO TOTAL : {`${precioTotal}`}</h1>
    </div>
  );
};

export default SingleOrder;
