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
      console.log("Received reviews:", selected.reviews);
    }
  }, [selected]);

  if (reviewsStatus === "loading") {
    return <Loader>Loading reviews...</Loader>;
  }

  if (reviewsStatus === "failed") {
    return <p>Error: {error}</p>;
  }

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className={css.reviewsContainer}>
      <ul className={css.reviewsText}>
        {selected && selected.reviews && selected.reviews.length > 0 ? (
          selected.reviews.map((review, index) => (
            <li key={review.id || index}>
              <div className={css.reviewItem}>
                <div className={css.reviewerCircle}>
                  {review.reviewer_name[0].toUpperCase()}
                </div>
                <div className={css.reviewName}>
                  <p className={css.reviewerName}>{review.reviewer_name}</p>
                  <p className={css.reviewerRating}>
                    {renderStars(review.reviewer_rating)}
                  </p>
                </div>
              </div>
              <p className={css.reviewComment}>{review.comment}</p>
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
