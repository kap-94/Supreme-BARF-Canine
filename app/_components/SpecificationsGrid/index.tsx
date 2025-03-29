import React from "react";
import { Typography } from "@/app/_components";
import classNames from "classnames/bind";
import styles from "./SpecificationsGrid.module.scss";

const cx = classNames.bind(styles);

const SpecificationsGrid = () => {
  const specs = [
    { label: "Calorías totales", value: "1705.35", unit: "kcal" },
    { label: "Proteína total", value: "138.59", unit: "g" },
    { label: "Grasas totales", value: "96.43", unit: "g" },
    { label: "Carbohidratos totales", value: "77.48", unit: "g" },
    { label: "Fibra total", value: "10.80", unit: "g" },
    { label: "Omega 6:3", value: "5.43:1", unit: "" },
    { label: "Por porción", value: "1000", unit: "g" },
    { label: "Minerales totales", value: "17.47", unit: "g" },
  ];

  return (
    <div className={cx("specifications-grid")}>
      <div className={cx("specifications-grid__header")}>
        <Typography variant="p3" className={cx("specifications-grid__title")}>
          Especificaciones Técnicas (por bolsa)
        </Typography>
      </div>

      <div className={cx("specifications-grid__content")}>
        {specs.map((spec, index) => (
          <div key={index} className={cx("specifications-grid__item")}>
            <div className={cx("specifications-grid__item-header")}>
              <Typography
                variant="p3"
                className={cx("specifications-grid__item-label")}
              >
                {spec.label}
              </Typography>
            </div>
            <Typography
              variant="p3"
              fontWeight={600}
              className={cx("specifications-grid__item-value")}
            >
              {spec.value}
              {spec.unit && (
                <span className={cx("specifications-grid__item-unit")}>
                  {spec.unit}
                </span>
              )}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificationsGrid;
