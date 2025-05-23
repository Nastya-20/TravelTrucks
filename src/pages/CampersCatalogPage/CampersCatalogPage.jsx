import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";
import CatalogList from "../../components/CatalogList/CatalogList";
import { toggleFavorite, fetchCampers } from "../../redux/vehiclesSlice";
import Loader from "../../components/Loader/Loader";
import css from "./CampersCatalogPage.module.css";

const CampersCatalogPage = () => {
  const dispatch = useDispatch();
  const { items: campers, status, error } = useSelector((state) => state.vehicles);
  
  const [filters, setFilters] = useState({
    category: "van",
    equipment: ['gas', 'water'],
     vehicleType: "Alcove",
    location: "California",
    page: 1,
  });

  useEffect(() => {
    dispatch(fetchCampers({ filters }));
  }, [dispatch, filters]);

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

   if (status === "loading") return <Loader>Loading...</Loader>;
  if (error) return <p>Error: {error}</p>;
  if (!campers || campers.length === 0) return <div className={css.errorCampers}>No campers available</div>;

  return (
    <div className={css.catalogPage}>
      <FiltersPanel filters={filters} setFilters={setFilters} />
      <div className={css.catalogPageWrap}>
        <CatalogList campers={campers} onToggleFavorite={handleToggleFavorite} />
      </div>
    </div>
  );
};

export default CampersCatalogPage;