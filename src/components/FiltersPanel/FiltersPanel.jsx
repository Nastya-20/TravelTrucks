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
  const dispatch = useDispatch();
  const [localLocation, setLocalLocation] = useState(() => localStorage.getItem("location") || ""); // Локальний стан

  const { equipment, vehicleType } = useSelector((state) => state.filters);
  
  // Оновлення `location` в Redux
  const handleLocationChange = (e) => {
     setLocalLocation(e.target.value); 
  };

  // Виклик пошуку
  const handleSearch = () => {
    dispatch(setLocation(localLocation));
    dispatch(fetchFilteredResults({ location: localLocation, equipment, vehicleType }));
    localStorage.setItem("location", localLocation); // Зберігаємо в localStorage
  };

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
            value={localLocation}
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
        onClick={handleSearch}>
           Search
      </button>
    </div>
  );
};

export default FiltersPanel;



