import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchCamperDetails, fetchReviews } from "../../redux/vehiclesSlice";
import CamperBookingForm from "../../components/CamperBookingForm/CamperBookingForm";
import CamperFeatures from "../../components/CamperFeatures/CamperFeatures";
import CamperReviews from "../../components/CamperReviews/CamperReviews";
import Loader from "../../components/Loader/Loader";
import css from "../CamperDetailsPage/CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, camperDetailsStatus, reviews, reviewsStatus } = useSelector(
    (state) => state.vehicles
  );

  const location = useLocation();
  const [activeTab, setActiveTab] = useState("features");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    dispatch(fetchCamperDetails(id));
    dispatch(fetchReviews(id)); 
  }, [dispatch, id]);

  useEffect(() => {
    if (location.pathname.includes("reviews")) {
      setActiveTab("reviews");
    } else {
      setActiveTab("features");
    }
  }, [location]);

  const openModal = (image) => {
    setCurrentImage(image); // встановлюємо поточне зображення
    setIsModalOpen(true); // відкриваємо модальне вікно
  };

  const closeModal = () => {
    setIsModalOpen(false); // закриваємо модальне вікно
    setCurrentImage(null); // очищаємо поточне зображення
  };

  if (camperDetailsStatus === "loading" || reviewsStatus === "loading") {
    return <Loader>Loading...</Loader>;
  }

  if (camperDetailsStatus === "failed") {
    return <div>Error loading camper details</div>;
  }

  if (!selected) {
    return <div>No camper details available</div>;
  }

  return (
    <div className={css.CamperDetailsContainer}>
      {isModalOpen && currentImage && (
        <div className={css.modal} onClick={closeModal}>
          <img src={currentImage} alt="Full view" className={css.modalImage} />
        </div>
      )}
      <h1 className={css.CamperDetailsName}>
        {selected.name || "Camper Name Not Available"}
      </h1>
      <div className={css.CamperDetailsSelected}>
        {/* Rating and reviews count */}
        <div className={css.CamperDetailsreviews}>
          <svg className={css.CamperDetailsRatingIcon}>
            <use href="/icons.svg#icon-Rating" />
          </svg>
          <span className={css.CamperDetailsRating}>
            {selected.rating ? selected.rating.toFixed(1) : "N/A"}
          </span>
          <span className={css.CamperDetailsreviewsCount}>
            ({selected.reviewsCount || 0} reviews)
          </span>
        </div>
        {/* Location */}
        <div className={css.CamperDetailslocation}>
          <svg className={css.CamperDetailsItemMap}>
            <use href="/icons.svg#icon-Map" />
          </svg>
          <p className={css.DetailsLocation}>
            {selected.location || "Location not specified"}
          </p>
        </div>
      </div>
      <p className={css.CamperDetailsPrice}>
        €{selected.price ? selected.price.toFixed(2) : "N/A"}
      </p>

      {selected.gallery && selected.gallery.length > 0 ? (
        <div className={css.CamperDetailsgallery}>
          {selected.gallery.map((image, index) => (
            <img
              key={index}
              src={image.thumb}
              alt={`View ${index + 1}`}
              className={css.galleryImage}
              onClick={() => openModal(image.original)}
            />
          ))}
        </div>
      ) : (
        <p>No images available</p>
      )}

      <p className={css.CamperDetailsText}>
        Embrace simplicity and freedom with the Mavericks panel truck, an ideal
        choice for solo travelers or couples seeking a compact and efficient way
        to explore the open roads. This no-frills yet reliable panel truck
        offers the essentials for a comfortable journey, making it the perfect
        companion for those who value simplicity and functionality.
      </p>

      <nav className={css.CamperDetailsTabs}>
        <Link
          to="features"
          className={activeTab === "features" ? css.active : ""}
        >
          Features
        </Link>
        <Link
          to="reviews"
          className={activeTab === "reviews" ? css.active : ""}
        >
          Reviews
        </Link>
      </nav>
      <hr className={css.divider} />
      <div className={css.CamperInfoContainer}>
        {activeTab === "features" && <CamperFeatures selected={selected} />}
        {activeTab === "reviews" &&
          (reviews ? (
            <CamperReviews reviewsStatus={reviewsStatus} />
          ) : (
            <p className={css.CamperInfoError}>No camper reviews available.</p>
          ))}
        <CamperBookingForm />
      </div>
    </div>
  );
};

export default CamperDetailsPage;
