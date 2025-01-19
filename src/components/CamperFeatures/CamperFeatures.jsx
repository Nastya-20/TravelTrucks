import React from "react";
import classNames from "classnames";
import { equipmentIcons, vehicleTypeIcons } from "../../icon";
import css from "../../components/CamperFeatures/CamperFeatures.module.css"; 


const CamperFeature = ({
  selected,
  equipment = {},
  vehicleType = {},
  toggleEquipmentFilter,
  toggleVehicleTypeFilter,
}) => {
  if (!selected) {
    return <p className={css.CamperInfoError}>No camper details available.</p>;
  }

  console.log("Selected Vehicle Details:", selected);

  const features = selected.features || [];
  const details = selected.details || {};

  return (
    <div className={css.CamperFeatureDetails}>
      {/* Active Filters Section */}
      <section className={css.activeFilters}>
        <div className={css.activeFilterIcons}>
          {/* Display equipment filters */}
          {Object.keys(equipment).map(
            (type) =>
              equipment[type] && (
                <button
                  key={type}
                  className={classNames(css.equipment, {
                    [css.active]: equipment[type],
                  })}
                  onClick={() => toggleEquipmentFilter(type)}
                  type="button"
                >
                  <svg className={css.CamperFeatureIcon}>
                    <use href={`/icons.svg#${equipmentIcons[type]}`} />
                  </svg>
                </button>
              )
          )}
          {/* Display vehicle type filters */}
          {Object.keys(vehicleType).map(
            (type) =>
              vehicleType[type] && (
                <button
                  key={type}
                  className={classNames(css.vehicle, {
                    [css.active]: vehicleType[type],
                  })}
                  onClick={() => toggleVehicleTypeFilter(type)}
                  type="button"
                >
                  <svg className={css.CamperFeatureIcon}>
                    <use href={`/icons.svg#${vehicleTypeIcons[type]}`} />
                  </svg>
                </button>
              )
          )}
        </div>
      </section>

      {/* Vehicle Details Section */}
      <section className={css.features}>
        <h2 className={css.CamperFeatureTitle}>Vehicle Details</h2>
        <hr className={css.CamperFeatureDivider} />
        <ul className={css.CamperFeatureList}>
          {features.length > 0 ? (
            features.map((feature, index) => (
              <li key={index} className={css.CamperFeatureKey}>
                {feature}
              </li>
            ))
          ) : (
            <p>No features available</p>
          )}
        </ul>
        <table>
          <tbody className={css.CamperFeatureTable}>
            {details && (
              <>
                <tr className={css.CamperFeatureTr}>
                  <td>Form</td>
                  <td>{selected.form ? selected.form : "N/A"}</td>
                </tr>
                <tr className={css.CamperFeatureTr}>
                  <td>Length</td>
                  <td>{selected.length ? selected.length : "N/A"}</td>
                </tr>
                <tr className={css.CamperFeatureTr}>
                  <td>Width</td>
                  <td>{selected.width ? selected.width : "N/A"}</td>
                </tr>
                <tr className={css.CamperFeatureTr}>
                  <td>Height</td>
                  <td>{selected.height ? selected.height : "N/A"}</td>
                </tr>
                <tr className={css.CamperFeatureTr}>
                  <td>Tank</td>
                  <td>{selected.tank ? selected.tank : "N/A"}</td>
                </tr>
                <tr className={css.CamperFeatureTr}>
                  <td>Consumption</td>
                  <td>{selected.consumption ? selected.consumption : "N/A"}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default CamperFeature;
