import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CamperItem from "../CamperItem/CamperItem.jsx";
//import { toggleFavorite } from "../../redux/vehiclesSlice";
import css from "./CatalogList.module.css";

const CatalogList = ({ campers }) => {
  const [visibleCount] = useState(4);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();
  
  const filters = useSelector((state) => state.filters) || {};

  // Обробник для зміни статусу улюбленого
  const handleToggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id], // Перемикає стан улюбленого для конкретного кемпера
    }));
  };

  // Перехід до сторінки деталей кемпера
  const handleNavigateToDetails = (id) => navigate(`/catalog/${id}`);

  const filteredCampers = campers.filter((camper) => {
    const matchesLocation = filters.location ? camper.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
    const matchesCategory = filters.category && filters.category !== "undefined" ? camper.category === filters.category : true;
    return matchesLocation && matchesCategory;
  });

  const displayedCampers = filteredCampers.slice(0, visibleCount);

return (
    <div className={css.catalogList}>
      {displayedCampers.map((camper) => (
        <CamperItem
          key={camper.id}
          id={camper.id}
          image={camper.gallery[0].thumb}
          name={camper.name}
          reviewsCount={camper.reviews.length}
          rating={camper.rating}
          location={camper.location}
          description={camper.description}
          selectedFeatures={camper}
          price={camper.price}
          onShowMore={() => handleNavigateToDetails(camper.id)}
          onToggleFavorite={() => handleToggleFavorite(camper.id)}
          isFavorite={favorites[camper.id]}
        />
      ))}
     </div>
  );
};

export default CatalogList;
