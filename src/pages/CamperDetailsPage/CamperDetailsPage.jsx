import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperDetails } from "../../redux/vehiclesSlice";
import { useParams, Link, Outlet } from "react-router-dom";
import CamperBookingForm from "../../components/CamperBookingForm/CamperBookingForm";
import CamperFeatures from "../../components/CamperFeatures/CamperFeatures";
import CamperReviews from "../../components/CamperReviews/CamperReviews";
import css from "../CamperDetailsPage/CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    selected,
    status: camperStatus,
    reviews,
  } = useSelector((state) => state.vehicles);

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperDetails(id));
    }
  }, [dispatch, id]);

  if (camperStatus === "loading") return <p>Loading camper details...</p>;
  if (camperStatus === "failed") return <p>Error loading camper details!</p>;
  if (!selected) return <p>No camper details available.</p>;
  if (!reviews) return <p>No camper reviews available.</p>;

  return (
    <div className={css.pageContainer}>
      <header className={css.header}>
        {selected && (
          <>
            <h1>{selected.name}</h1>
            <p className={css.price}>€{selected.price.toFixed(2)}</p>
            <p className={css.location}>{selected.location}</p>
          </>
        )}
      </header>

      <div className={css.mainContent}>
        {/* Галерея зображень */}
        <div className={css.gallery}>
          {selected &&
            selected.images &&
            selected.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`View ${index + 1}`}
                className={css.galleryImage}
              />
            ))}
        </div>
        <p>
          Embrace simplicity and freedom with the Mavericks panel truck, an
          ideal choice for solo travelers or couples seeking a compact and
          efficient way to explore the open roads. This no-frills yet reliable
          panel truck offers the essentials for a comfortable journey, making it
          the perfect companion for those who value simplicity and
          functionality.
        </p>
      </div>

      <CamperFeatures selected={selected} />
      <CamperReviews reviews={reviews} />
      <hr className={css.divider} />

      {/* Форма бронювання */}
      <CamperBookingForm />

      {/* Навігація до "Features" та "Reviews" */}
      <nav className={css.tabs}>
        <Link to="features">Features</Link>
        <Link to="reviews">Reviews</Link>
      </nav>

      {/* Вихід для вкладених маршрутів */}
      <Outlet />
    </div>
  );
};

export default CamperDetailsPage;
