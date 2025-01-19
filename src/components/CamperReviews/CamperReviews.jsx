import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../redux/vehiclesSlice";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import css from "../CamperReviews/CamperReviews.module.css";

const CamperReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, reviewsStatus, error } = useSelector(
    (state) => state.vehicles
  );

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selected && selected.reviews) {
      console.log("Received reviews:", selected.reviews); // Додаємо консольний лог для перевірки
    }
  }, [selected]);

  if (reviewsStatus === "loading") {
    return <Loader>Loading reviews...</Loader>;
  }

  if (reviewsStatus === "failed") {
    return <p>Error: {error}</p>;
  }
console.log("Selected reviews in render:", selected?.reviews);
  return (
    <div className={css.reviewsContainer}>
      <ul className={css.reviewsText}>
        {selected && selected.reviews && selected.reviews.length > 0 ? (
          selected.reviews.map((review, index) => (
            <li key={index}>
              <p>Reviewer: {review.reviewer_name}</p>{" "}
              <p>{review.comment}</p>
              <p>Rating: {review.reviewer_rating}</p>{" "}
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

export default CamperReviews;
