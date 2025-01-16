import React from "react";
import css from "./CamperItem.module.css";

const CamperItem = ({
  image,
  name,
  reviewsCount,
  rating,
  location,
  description,
  features,
  price,
  onShowMore,
  onToggleFavorite,
  isFavorite,
}) => {
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
            Price: <strong>{price}</strong>
            <svg className={css.catalogItemHeartIcon}>
              <use href="/icons.svg#icon-heart" />
            </svg>
          </p>
        </div>

        {/* Рейтинг та відгуки */}
        <div className={css.catalogItemreviews}>
          <svg className={css.catalogItemRating}>
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
        <button onClick={onShowMore}>Show more</button>

      </div>
    </div>
  );
};

export default CamperItem;
