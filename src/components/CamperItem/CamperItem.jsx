import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./CamperItem.module.css";

const CamperItem = ({
  id,
  image,
  name,
  reviewsCount,
  rating,
  location,
  description,
  features,
  price,
  isFavorite,
  onToggleFavorite,
}) => {
  const [loading, setLoading] = useState(false);

  // Функція для обробки кліку на "Show more" та затримки завантаження
  const handleClick = () => {
    setLoading(true); // Встановлюємо стан завантаження в true
    setTimeout(() => setLoading(false), 2000); // Симулюємо затримку завантаження
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
          <p className={css.catalogItemprice}>
            {price ? `€${price.toFixed(2)}` : "N/A"}
            <svg
              className={`${css.catalogItemHeartIcon} ${
                isFavorite ? css.favorite : ""
              }`}
              onClick={onToggleFavorite}
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
        <div className={css.catalogItemreviews}>
          <svg className={css.catalogItemRat}>
            <use href="/icons.svg#icon-Rating" />
          </svg>
          <span className={css.catalogItemRating}> {rating.toFixed(1)}</span>
          <span className={css.catalogItemreviewsCount}>
            ({reviewsCount} reviews)
          </span>
          {/* Локація */}
          <p className={css.catalogItemlocation}>
            {" "}
            <svg className={css.catalogItemMap}>
              <use href="/icons.svg#icon-Map" />
            </svg>
            {location}
          </p>
        </div>
        {/* Короткий опис */}
        <p className={css.catalogItemdescription}>{description}</p>
        {/* Іконки характеристик */}
        <div className={css.catalogItemfeatures}>
          {Array.isArray(features) &&
            features.map((feature, index) => (
              <span key={index} className={css.catalogItemfeature}>
                <svg className={css.icon}>
                  <use href={`/icons.svg#${feature.icon}`} />
                </svg>
                <span className={css.catalogItemfeatureName}>
                  {feature.name}
                </span>
              </span>
            ))}
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
