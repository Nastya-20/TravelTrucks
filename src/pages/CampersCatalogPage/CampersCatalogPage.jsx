import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";
import CatalogList from "../../components/CatalogList/CatalogList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import {
  loadMoreVehicles,
  toggleFavorite,
  fetchCampers,
} from "../../redux/vehiclesSlice";
import Loader from "../../components/Loader/Loader";
import css from "./CampersCatalogPage.module.css";

const CampersCatalogPage = () => {
  const dispatch = useDispatch();
 const { vehicles, status, error } = useSelector(
   (state) => state.vehicles
 );
 const { location, equipment, vehicleType } = useSelector(
   (state) => state.filters
 );
  const campers = useSelector((state) => state.vehicles.items);

  const [filters, setFilters] = useState({
    category: "van",
    location: "California",
    page: 1,
  });

  useEffect(() => {
    dispatch(fetchCampers({ filters }));
  }, [dispatch, filters]);

  const handleShowMore = (id) => {
    console.log(`Show more details for camper ID: ${id}`);
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const handleLoadMore = () => {
    const nextPage = { ...filters, page: filters.page + 1 };
    dispatch(loadMoreVehicles(nextPage));
  };

  if (status === "loading") {
    return <Loader>Loading...</Loader>;
  }
  if (!campers || campers.length === 0) {
    return <div>No campers available</div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={css.catalogPage}>
      <FiltersPanel filters={filters} setFilters={setFilters} />
      <div className={css.catalogPageWrap}>
        <CatalogList
          campers={campers}
          onShowMore={handleShowMore}
          onToggleFavorite={handleToggleFavorite}
          filters={{ location, equipment, vehicleType }}
        />
        {vehicles && vehicles.length > 0 && (
          <LoadMoreButton onClick={handleLoadMore} />
        )}
      </div>
    </div>
  );
};

export default CampersCatalogPage;
