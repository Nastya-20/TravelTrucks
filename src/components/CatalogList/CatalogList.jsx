import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CamperItem from "../CamperItem/CamperItem.jsx";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
//import Loader from "../../components/Loader/Loader.jsx";
import css from "./CatalogList.module.css";

const CatalogList = ({ campers, onToggleFavorite }) => {
  const [visibleCount, setVisibleCount] = useState(4); // Початково показуємо 4 авто
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

  if (!Array.isArray(displayedCampers) || displayedCampers.length === 0) {
    return <p className={css.noResults}>No campers match your filters.</p>;
  }

  // Відображаємо лише видимі авто
  const visibleCampers = displayedCampers.slice(0, visibleCount);

  // Filter equipment icons
  const equipmentIcons = {
    AC: "icon-wind",
    Automatic: "icon-diagram",
    Kitchen: "icon-cup-hot",
    TV: "icon-tv",
    Bathroom: "icon-ph_shower",
  };

  // Filter vehicle type icons
  const vehicleTypeIcons = {
    Van: "icon-bi_grid-1x2",
    FullyIntegrated: "icon-bi_grid",
    Alcove: "icon-bi_grid-3x3-gap",
  };

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
          onToggleFavorite={onToggleFavorite}
          isFavorite={camper.isFavorite}
        >
        {/* Show selected filters for each camper */}
          <div className={css.filterInfo}>
            {location && <span className={css.filterIcon}>{location}</span>}
            {Object.keys(equipment).map(
              (type) =>
                equipment[type] && (
                  <span
                    key={type}
                    className={css.filterIcon}
                  >
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
                  <span
                    key={type}
                    className={css.filterIcon}
                  >
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
