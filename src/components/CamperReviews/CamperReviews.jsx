import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../redux/vehiclesSlice";
import { useParams } from "react-router-dom";

const CamperReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, status, error } = useSelector((state) => state.vehicles);

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Reviews</h2>
      {selected && selected.reviews.length > 0 ? (
        <ul>
          {selected.reviews.map((review) => (
            <li key={review.id}>
              <p>{review.comment}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default CamperReviews;
