import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { createReviewRequest, reviewRequest } from "../state/review";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const Reviews = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const paramsId = Number(params.id);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = JSON.parse(localStorage.getItem("user"));
  const idUser = user.id?user.id:0
  /* const idUser = Number(isLoggedIn.id); */
  const [review, setReview] = React.useState({
    rating: "",
    comentario: "",
    userId: idUser,
    productId: paramsId,
  });

  const { rating, comentario, userId, productId } = review;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setReview((review) => ({ ...review, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userId === 0){Swal.fire({
      title: `No podes calificar`,
      text: `Necesitas loguearte`,
      icon: "success",
      timer: "2000",
    });}
    dispatch(createReviewRequest(review)).then((res) => {
      if (res.payload) {
        Swal.fire({
          title: `${res.payload}`,
          text: ` Ya calificaste este arti­culo`,
          icon: "success",
          timer: "2000",
        });
      } else {
        Swal.fire({
          title: `Review enviado`,
          text: `Calificaste correctamente`,
          icon: "success",
          timer: "2000",
        });
      }
    });
  };

  React.useEffect(() => {
    dispatch(reviewRequest(paramsId));
  }, [paramsId,review]);

  const allReviewsSingle = useSelector((state) => state.allReviewsSingle);


  return (
    <div className="login">
      <h2>Review</h2>
      <form
        className="login_form"
        name="form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          aria-label="required"
          placeholder="Rating de 1 a 5"
          type="number"
          name="rating"
          value={rating}
          onChange={handleChange}
          className="form-control"
        ></input>
        <br></br>
        <textarea
          aria-label="required"
          placeholder="Comentario"
          type="text"
          name="comentario"
          value={comentario}
          onChange={handleChange}
          className="form-control"
          rows="5"
        ></textarea>
        <br></br>
        <button type="submit" className="submit_btn">
          Enviar
        </button>
      </form>
      <div>
        {allReviewsSingle.map((review) => (
          <div>
            <h2>
              Rating:<Stack spacing={1}>
              <Rating name="half-rating" value={review.rating} precision={0.1} readOnly />
            </Stack>

            </h2>

            <h2>
              Comentario:<strong>{review.comentario}</strong>
            </h2>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;