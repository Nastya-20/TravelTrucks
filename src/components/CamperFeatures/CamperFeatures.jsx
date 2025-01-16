import React from "react";
import css from "../../components/CamperFeatures/CamperFeatures.module.css";

const CamperFeature = ({ selected }) => {
  if (!selected) {
    return <p>No camper details available.</p>;
  }

  return (
    <div className={css.detailsAndBooking}>
      {/* Характеристики авто */}
      <section className={css.features}>
        <h2 className={css.featuresTitle}>Vehicle Details</h2>
        <hr className={css.divider} />
        <ul className={css.featuresList}>
          {selected.features.map((feature, index) => (
            <li key={index} className={css.feature}>
              {feature}
            </li>
          ))}
        </ul>
        <table className={css.detailsTable}>
          <tbody>
            <tr>
              <td>Form</td>
              <td>{selected.details.form}</td>
            </tr>
            <tr>
              <td>Length</td>
              <td>{selected.details.length} m</td>
            </tr>
            <tr>
              <td>Width</td>
              <td>{selected.details.width} m</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{selected.details.height} m</td>
            </tr>
            <tr>
              <td>Tank</td>
              <td>{selected.details.tank} l</td>
            </tr>
            <tr>
              <td>Consumption</td>
              <td>{selected.details.consumption} l/100km</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default CamperFeature;
