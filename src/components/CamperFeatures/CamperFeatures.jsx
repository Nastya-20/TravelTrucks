import React from "react";
import { equipmentIcons } from "../../icon";
import css from "../../components/CamperFeatures/CamperFeatures.module.css"; 


const CamperFeature = ({
  selected,
}) => {
  if (!selected) {
    return <p className={css.CamperInfoError}>No camper details available.</p>;
  }

  console.log("Selected Vehicle Details:", selected);

  // Отримуємо фільтри, що мають значення true
  const features = [
    selected.AC ? "AC" : null,
    selected.TV ? "TV" : null,
    selected.bathroom ? "Bathroom" : null,
    selected.kitchen ? "Kitchen" : null,
    selected.microwave ? "Microwave" : null,
    selected.radio ? "Radio" : null,
    selected.refrigerator ? "Refrigerator" : null,
    selected.water ? "Water" : null,
  ].filter(Boolean); // Фільтруємо null значення
  
  const details = selected.details || {};

  return (
    <div className={css.CamperFeatureDetails}>
      {/* Active Filters Section */}
      <div className={css.activeFilters}>
        <div className={css.activeFilterIcons}>
          {features && features.length > 0 ? (
            features.map((feature, index) => (
              <div key={index} className={css.activeFilterItem}>
                <svg className={css.icon}>
                  <use href={`/icons.svg#${equipmentIcons[feature]}`} />
                </svg>
                <p className={css.CamperFeatureTitle}>{feature}</p>
              </div>
            ))
          ) : (
            <p>No features available</p>
          )}
        </div>
      </div>

      {/* Vehicle Details Section */}
      <section className={css.features}>
        <h2 className={css.CamperFeatureTitle}>Vehicle Details</h2>
        <hr className={css.CamperFeatureDivider} />
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
