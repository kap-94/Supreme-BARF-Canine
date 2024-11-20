import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Typography } from "@/app/_components";
import classNames from "classnames/bind";
import styles from "./ProductSpecs.module.scss";

const cx = classNames.bind(styles);

const ProductSpecs = () => {
  const colors = {
    primary: "#1f3a41", // Base - Azul marino profundo
    accent1: "#2c7d8c", // Azul petróleo medio
    accent2: "#e67e5c", // Terracota medio
    accent3: "#4896e8", // Azul cielo profundo
    accent4: "#4a78bd", // Azul acero brillante
  };

  const nutritionalData = [
    { name: "Proteínas", value: 40.7, color: colors.primary },
    { name: "Grasas", value: 28.3, color: colors.accent1 },
    { name: "Carbohidratos", value: 22.7, color: colors.accent2 },
    { name: "Fibra", value: 3.2, color: colors.accent3 },
    { name: "Minerales", value: 5.1, color: colors.accent4 },
  ];
  const specs = [
    { label: "Calorías totales", value: "1705.35 kcal" },
    { label: "Proteína total", value: "138.59 g" },
    { label: "Grasas totales", value: "96.43 g" },
    { label: "Carbohidratos totales", value: "77.48 g" },
    { label: "Fibra total", value: "10.80 g" },
    { label: "Omega 6:3", value: "5.43:1" },
    { label: "Por porción", value: "1000 g" },
    { label: "Minerales totales", value: "17.47 g" },
  ];

  return (
    <div className={cx("product-specs__container")}>
      <div className={cx("product-specs__chart-section")}>
        <div className={cx("product-specs__chart-header")}>
          <Typography variant="h5" className={cx("product-specs__chart-title")}>
            Distribución Nutricional
          </Typography>
          <Typography
            variant="p3"
            fontWeight={500}
            className={cx("product-specs__chart-subtitle")}
          >
            Porcentaje de nutrientes por porción
          </Typography>
        </div>
        <div className={cx("product-specs__chart-container")}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={nutritionalData}
                cx="50%" // Cambiado de 50% a 35%
                cy="50%"
                innerRadius={42}
                outerRadius={84}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={false}
                style={{ outline: "none" }}
              >
                {nutritionalData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{ outline: "none" }}
                  />
                ))}
              </Pie>
              <Legend
                layout="vertical"
                align="left"
                verticalAlign="middle"
                wrapperStyle={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#000000",
                }}
                iconSize={16}
                // Añadir estos estilos específicos
                formatter={(value, entry, index) => (
                  <span
                    style={{
                      color: "#000000",
                      marginLeft: "2px",
                    }}
                  >
                    {value}: {nutritionalData[index].value}%
                  </span>
                )}
                onClick={() => {}}
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={cx("product-specs__grid")}>
        {specs.map((spec, index) => (
          <div key={index} className={cx("product-specs__item")}>
            <Typography
              variant="p2"
              className={cx("product-specs__item-label")}
            >
              {spec.label}
            </Typography>
            <Typography
              variant="p2"
              className={cx("product-specs__item-value")}
            >
              {spec.value}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecs;
