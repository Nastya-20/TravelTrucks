import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CamperItem from "../CamperItem/CamperItem.jsx";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./CatalogList.module.css";

const CatalogList = ({ campers, onToggleFavorite }) => {
  const [visibleCount, setVisibleCount] = useState(4); // Початково показуємо 4 авто
  const navigate = useNavigate();

  // Витягуємо фільтри зі стану Redux
  const { filteredResults, loading, error } = useSelector(
    (state) => state.filters
  );

  // Вибираємо список авто для відображення (фільтровані або повний список)
  const displayedCampers = filteredResults.length ? filteredResults : campers;

  // Завантажити більше авто
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  // Перехід до сторінки деталей кемпера
  const handleNavigateToDetails = (id) => {
    navigate(`/campers/${id}`);
  };

  // Умовний контент
  if (loading) {
    return (
      <div className={css.loading}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className={css.error}>Error: {error}</p>;
  }

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
          onToggleFavorite={onToggleFavorite}
          isFavorite={camper.isFavorite}
        />
      ))}
      {visibleCount < displayedCampers.length && (
        <LoadMoreButton onLoadMore={handleShowMore} />
      )}
    </div>
  );
};

export default CatalogList;
