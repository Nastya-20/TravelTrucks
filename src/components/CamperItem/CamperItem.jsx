import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { featureIcons } from "../../icon";
import css from "./CamperItem.module.css";

const CamperItem = ({
  id,
  image,
  name,
  reviewsCount = 0,
  rating = 0,
  location = "Unknown",
  description = "No description available",
  selectedFeatures = {},
  price = null,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [loading, setLoading] = useState(false);

  const featureNames = {
    AC: "AC",
    TV: "TV",
    bathroom: "Bathroom",
    kitchen: "Kitchen",
    microwave: "Microwave",
    radio: "Radio",
    refrigerator: "Refrigerator",
    water: "Water",
  };

  const equipment = Object.keys(selectedFeatures)
        .filter((key) => selectedFeatures[key] === true)
        .map((key) => featureNames[key] || key);

  const handleClick = () => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  };

  return (
    <div className={css.catalogItem}>
        {/* Зображення кемпера */}
      <img src={image} alt={name} className={css.catalogItemImage} />
      <div className={css.catalogItemWrapper}>
         {/* Назва кемпера */}
        <div className={css.catalogItemTitle}>
          <h3 className={css.catalogItemName}>{name}</h3>
          {/* Ціна */}
          <p className={css.catalogItemPrice}>
            {price ? `€${price.toFixed(2)}` : "N/A"}
            <svg
              className={`${css.catalogItemHeartIcon} ${
                isFavorite ? css.favorite : ""
              }`}
              onClick={() => onToggleFavorite && onToggleFavorite()}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="26"
              height="24"
            >
              <use href="/icons.svg#icon-heart" />
            </svg>
          </p>
        </div>
 {/* Рейтинг та відгуки */}
        <div className={css.catalogItemReviews}>
          <svg className={css.catalogItemRat}>
            <use href="/icons.svg#icon-Rating" />
          </svg>
          <span className={css.catalogItemRating}>
            {rating.toFixed(1)}
          </span>
          <span className={css.catalogItemReviewsCount}>
            ({reviewsCount} reviews)
          </span>
             {/* Локація */}
          <p className={css.catalogItemLocation}>
            <svg className={css.catalogItemMap} aria-hidden="true">
              <use href="/icons.svg#icon-Map" />
            </svg>
            {location}
          </p>
        </div>
      {/* Короткий опис */}
        <p className={css.catalogItemDescription}>{description}</p>
        {/* Іконки характеристик */}
        <div className={css.catalogItemFeatures}>
          {equipment.length ? (
            equipment.map((feature, index) => (
              <span key={index} className={css.ItemFeature}>
                <svg className={css.icon} aria-hidden="true">
                  <use href={`/icons.svg#${featureIcons[feature]}`} />
                </svg>
                <span className={css.catalogItemFeatureName}>{feature}</span>
              </span>
            ))
          ) : (
            <p>No features available</p>
          )}
        </div>
 {/* Кнопка Show more */}
        <Link to={`/catalog/${id}`}>
          <button className={css.catalogItemBtn} onClick={handleClick}>
            Show more
          </button>
        </Link>
        {loading && <Loader />}{" "}
        {/* Показуємо Loader, якщо завантаження активне */}
      </div>
    </div>
  );
};

export default CamperItem;

