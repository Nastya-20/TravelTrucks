import React, { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  toggleEquipment,
  toggleVehicleType,
  fetchFilteredResults,
} from "../../redux/filtersSlice";
import classNames from "classnames";
import css from "./FiltersPanel.module.css";

const FiltersPanel = () => {
  const [disabledSearch, setDisabledSearch] = useState(false);

  const { location, equipment, vehicleType } = useSelector(
    (state) => state.filters
  );

  const dispatch = useDispatch();

  const handleLocationChange = useCallback(
    (e) => {
      dispatch(setLocation(e.target.value));
    },
    [dispatch]
  );

  const toggleEquipmentFilter = useCallback(
    (type) => {
      dispatch(toggleEquipment({ type }));
    },
    [dispatch]
  );

  const toggleVehicleTypeFilter = useCallback(
    (type) => {
      dispatch(toggleVehicleType({ type }));
    },
    [dispatch]
  );

  const handleSearch = () => {
    dispatch(fetchFilteredResults({ location, equipment, vehicleType }));
    setDisabledSearch(true);  // You can disable the search button here
  };

  const equipmentIcons = useMemo(
    () => ({
      AC: "icon-wind",
      Automatic: "icon-diagram",
      Kitchen: "icon-cup-hot",
      TV: "icon-tv",
      Petrol: "icon-fuel-pump",
      Bathroom: "icon-ph_shower",
      Microwave: "icon-lucide_microwave",
      Radio: "icon-ui-radios",
      Water: "icon-ion_water-outline",
      gas: "icon-hugeicons_gas-stove",
      Refrigerator: "icon-solar_fridge-outline",
    }),
    []
  );

  const vehicleTypeIcons = {
    Van: "icon-bi_grid-1x2",
    FullyIntegrated: "icon-bi_grid",
    Alcove: "icon-bi_grid-3x3-gap",
  };

  return (
    <div className={css.filtersPanel}>
      <div className={css.filterGroupLoc}>
        <label htmlFor="location" className={css.filtersLabel}>
          Location
        </label>
        <div className={css.inputContainer}>
          <input
            type="text"
            id="location"
            name="location"
            className={css.filtersInput}
            placeholder="City"
            value={location}
            onChange={handleLocationChange}
          />
          <svg className={css.navIcon}>
            <use href="/icons.svg#icon-Map" />
          </svg>
        </div>
      </div>

      <h3 className={css.filtersName}>Filters</h3>

      <div className={css.filterGroup}>
        <p className={css.labelVehicle}>Vehicle equipment</p>
        <hr className={css.divider} />
        <div className={css.buttonsGroup}>
          {Object.keys(equipment).map((type) => (
            <button
              key={type}
              className={classNames(css.equipment, {
                [css.active]: equipment[type],
              })}
              onClick={() => toggleEquipmentFilter(type)}
              type="button"
            >
              <svg className={css.icon}>
                <use href={`/icons.svg#${equipmentIcons[type]}`} />
              </svg>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className={css.filterGroup}>
        <p className={css.labelVehicle}>Vehicle type</p>
        <hr className={css.divider} />
        <div className={css.buttonsGroup}>
          {Object.keys(vehicleType).map((type) => (
            <button
              key={type}
              className={classNames(css.vehicle, {
                [css.active]: vehicleType[type],
              })}
              onClick={() => toggleVehicleTypeFilter(type)}
              type="button"
            >
              <svg className={css.icon}>
                <use href={`/icons.svg#${vehicleTypeIcons[type]}`} />
              </svg>
              {type.replace(/FullyIntegrated/, "Fully\nIntegrated")}
            </button>
          ))}
        </div>
      </div>

      <button
        className={css.searchButton}
        onClick={handleSearch}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        disabled={disabledSearch}
      >
        Search
      </button>
    </div>
  );
};

export default FiltersPanel;

