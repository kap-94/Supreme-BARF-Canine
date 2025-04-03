import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Typography } from "@/app/_components";
import classNames from "classnames/bind";
import styles from "./ProductSpecs.module.scss";

const cx = classNames.bind(styles);

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  value: number;
}

const ProductSpecs = () => {
  const colors = {
    primary: "#1f3a41",
    accent1: "#2c7d8c",
    accent2: "#e67e5c",
    accent3: "#4896e8",
    accent4: "#4a78bd",
  };

  const nutritionalData = [
    { name: "Proteínas", value: 40.7, color: colors.primary },
    { name: "Grasas", value: 28.3, color: colors.accent1 },
    { name: "Carbohidratos", value: 22.7, color: colors.accent2 },
    { name: "Fibra", value: 3.2, color: colors.accent3 },
    { name: "Minerales", value: 5.1, color: colors.accent4 },
  ];

  const specs = [
    { label: "Calorías totales", value: "1705.35", unit: "kcal" },
    { label: "Proteína total", value: "138.59", unit: "g" },
    { label: "Grasas totales", value: "96.43", unit: "g" },
    { label: "Carbohidratos totales", value: "77.48", unit: "g" },
    { label: "Fibra total", value: "10.80", unit: "g" },
    { label: "Omega 6:3", value: "5.43", unit: "" },
    { label: "Por porción", value: "1000", unit: "g" },
    { label: "Minerales totales", value: "17.47", unit: "g" },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }: CustomLabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: "12px",
          fontWeight: "600",
          textShadow: "0px 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        {`${value}%`}
      </text>
    );
  };

  return (
    <div className={cx("product-specs__container")}>
      <div className={cx("product-specs__chart-section")}>
        <div className={cx("product-specs__chart-header")}>
          <Typography variant="p3" className={cx("product-specs__chart-title")}>
            Distribución nutricional
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
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={84}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={false}
                labelLine={false}
                label={renderCustomizedLabel}
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
                  fontSize: "16px",
                }}
                iconSize={13}
                formatter={(value) => (
                  <span
                    style={{
                      color: "#383734",
                      marginLeft: "3px",
                      textTransform: "uppercase",
                      fontSize: "10px",
                      fontWeight: 500,
                      marginBlock: "auto",
                    }}
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={cx("product-specs__grid")}>
        {specs.map((spec, index) => (
          <div key={index} className={cx("product-specs__item")}>
            <div className={cx("product-specs__item-header")}>
              <Typography
                variant="p3"
                className={cx("product-specs__item-label")}
              >
                {spec.label}
              </Typography>
            </div>
            <Typography
              variant="p3"
              fontWeight={600}
              className={cx("product-specs__item-value")}
            >
              {spec.value}
              {spec.unit && (
                <span className={cx("product-specs__item-unit")}>
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

export default ProductSpecs;
