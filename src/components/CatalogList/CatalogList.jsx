import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CamperItem from "../CamperItem/CamperItem.jsx";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import { equipmentIcons, vehicleTypeIcons } from "../../icon.js";
import css from "./CatalogList.module.css";

const CatalogList = ({ campers, onToggleFavorite }) => {
  const [visibleCount, setVisibleCount] = useState(4); // Початково показуємо 4 авто
  const [favorites, setFavorites] = useState({}); // Локальний стан для збереження фаворитів
  const navigate = useNavigate();

  // Витягуємо фільтри зі стану Redux
  const { location, equipment, vehicleType } = useSelector(
    (state) => state.filters
  );

  // Вибираємо список авто для відображення (фільтровані або повний список)
  const displayedCampers = campers;

  // Завантажити більше авто
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  // Перехід до сторінки деталей кемпера
  const handleNavigateToDetails = (id) => {
    navigate(`/catalog/${id}`);
  };

  // Обробник для зміни статусу улюбленого
  const handleToggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id], // Перемикає стан улюбленого для конкретного кемпера
    }));
  };

  if (!Array.isArray(displayedCampers) || displayedCampers.length === 0) {
    return <p className={css.noResults}>No campers match your filters.</p>;
  }

  // Відображаємо лише видимі авто
  const visibleCampers = displayedCampers.slice(0, visibleCount);

  return (
    <div className={css.catalogList}>
      {visibleCampers.map((camper) => (
        <CamperItem
          key={camper.id}
          id={camper.id}
          image={camper.gallery[0].thumb}
          name={camper.name}
          reviewsCount={camper.reviews.length}
          rating={camper.rating}
          location={camper.location}
          description={camper.description}
          features={camper.features}
          price={camper.price}
          onShowMore={() => handleNavigateToDetails(camper.id)}
          onToggleFavorite={() => handleToggleFavorite(camper.id)} // Передаємо функцію для зміни стану улюбленого
          isFavorite={favorites[camper.id] || camper.isFavorite} // Використовуємо локальний стан або значення з об'єкта camper
        >
          {/* Show selected filters for each camper */}
          <div className={css.filterInfo}>
            {location && <span className={css.filterIcon}>{location}</span>}
            {Object.keys(equipment).map(
              (type) =>
                equipment[type] && (
                  <span key={type} className={css.filterIcon}>
                    <svg className={css.icon}>
                      <use href={`/icons.svg#${equipmentIcons[type]}`} />
                    </svg>
                    {type}
                  </span>
                )
            )}
            {Object.keys(vehicleType).map(
              (type) =>
                vehicleType[type] && (
                  <span key={type} className={css.filterIcon}>
                    <svg className={css.icon}>
                      <use href={`/icons.svg#${vehicleTypeIcons[type]}`} />
                    </svg>
                    {type}
                  </span>
                )
            )}
          </div>
        </CamperItem>
      ))}
      {visibleCount < displayedCampers.length && (
        <LoadMoreButton onLoadMore={handleShowMore} />
      )}
    </div>
  );
};

export default CatalogList;
