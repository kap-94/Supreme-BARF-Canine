"use client";

import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { SectionHeader, Typography } from "@/app/_components";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import styles from "./NutritionalData.module.scss";

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

const NutritionalData: React.FC = () => {
  // Estado para detectar si la pantalla es medium o más pequeña
  const [isMediumOrSmaller, setIsMediumOrSmaller] = useState(false);
  const [isSmallOrSmaller, setIsSmallOrSmaller] = useState(false);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      // Ajusta estos valores según tus breakpoints en SCSS
      const mediumBreakpoint = 768; // Ajusta este valor al que uses como $medium
      const smallBreakpoint = 576; // Ajusta este valor al que uses como $small
      setIsMediumOrSmaller(window.innerWidth <= mediumBreakpoint);
      setIsSmallOrSmaller(window.innerWidth <= smallBreakpoint);
    };

    // Verificar tamaño inicial
    checkScreenSize();

    // Agregar event listener para cambios de tamaño
    window.addEventListener("resize", checkScreenSize);

    // Limpiar event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Paleta de colores
  const colors = {
    primary: "#1f3a41",
    accent1: "#2c7d8c",
    accent2: "#5d9ea8",
    accent3: "#4896e8",
    accent4: "#4a78bd",
    background: "#f5f7f9",
  };

  // Datos nutricionales para el gráfico
  const nutritionalData = [
    { name: "Proteínas", value: 40.7, color: colors.primary },
    { name: "Grasas", value: 28.3, color: colors.accent1 },
    { name: "Carbohidratos", value: 22.7, color: colors.accent2 },
    { name: "Fibra", value: 3.2, color: colors.accent3 },
    { name: "Minerales", value: 5.1, color: colors.accent4 },
  ];

  // Datos para el gráfico de barras comparativo
  const comparisonData = [
    { name: "Proteínas", producto: 40.7, estandar: 30.2 },
    { name: "Grasas", producto: 28.3, estandar: 22.5 },
    { name: "Carbohidratos", producto: 22.7, estandar: 35.8 },
    { name: "Fibra", producto: 3.2, estandar: 2.1 },
    { name: "Minerales", producto: 5.1, estandar: 4.3 },
  ];

  // Especificaciones técnicas
  const specifications = [
    { label: "Calorías totales", value: "1705.35", unit: "kcal" },
    { label: "Proteína total", value: "138.59", unit: "g" },
    { label: "Grasas totales", value: "96.43", unit: "g" },
    { label: "Carbohidratos totales", value: "77.48", unit: "g" },
    { label: "Fibra total", value: "10.80", unit: "g" },
    { label: "Omega 6:3", value: "5.43:1", unit: "" },
    { label: "Por porción", value: "1000", unit: "g" },
    { label: "Minerales totales", value: "17.47", unit: "g" },
  ];

  // Etiqueta personalizada para el gráfico (para pantallas grandes)
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
          fontSize: "13px",
          fontWeight: "600",
          textShadow: "0px 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        {`${value}%`}
      </text>
    );
  };

  // Formatter personalizado para la leyenda con porcentajes (para pantallas medium y pequeñas)
  const legendFormatter = (value: string, entry: any) => {
    // Buscar el valor correspondiente
    const dataItem = nutritionalData.find((item) => item.name === value);

    if (isMediumOrSmaller && dataItem) {
      return (
        <span className={cx("nutritional-data__chart-legend-item")}>
          <span className={cx("nutritional-data__chart-legend-name")}>
            {value}
          </span>
          <span className={cx("nutritional-data__chart-legend-percentage")}>
            {dataItem.value}%
          </span>
        </span>
      );
    }

    // En pantallas grandes, solo muestra el nombre
    return (
      <span className={cx("nutritional-data__chart-legend-item")}>{value}</span>
    );
  };

  // Custom tooltip para el gráfico de barras
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={cx("nutritional-data__custom-tooltip")}>
          <p className={cx("nutritional-data__custom-tooltip-label")}>
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p
              key={`tooltip-${index}`}
              className={cx("nutritional-data__custom-tooltip-item")}
              style={{ color: entry.color }}
            >
              <span className={cx("nutritional-data__custom-tooltip-name")}>
                {entry.dataKey === "producto"
                  ? "Nuestro Producto"
                  : "Estándar AAFCO"}
                :
              </span>{" "}
              <span className={cx("nutritional-data__custom-tooltip-value")}>
                {entry.value}%
              </span>
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <section className={cx("nutritional-data")}>
      <div className={cx("nutritional-data__container")}>
        {/* 1. Especificaciones técnicas */}
        <div className={cx("nutritional-data__specs-section")}>
          <div className={cx("nutritional-data__specs-header")}>
            <SectionHeader
              title="Especificaciones Nutricionales"
              // subtitle="Formulación avalada por profesionales en nutrición animal."
              align="left"
              className={cx("nutritional-data__specs-title")}
            />
          </div>
          <div className={cx("nutritional-data__specs-content")}>
            {specifications.map((spec, index) => (
              <div key={index} className={cx("nutritional-data__specs-item")}>
                <div className={cx("nutritional-data__specs-item-header")}>
                  <Typography
                    variant="p2"
                    fontWeight={500}
                    color="primary"
                    className={cx("nutritional-data__specs-item-label")}
                  >
                    {spec.label}
                  </Typography>
                </div>
                <Typography
                  variant="p3"
                  fontWeight={600}
                  className={cx("nutritional-data__specs-item-value")}
                >
                  {spec.value}
                  {spec.unit && (
                    <span className={cx("nutritional-data__specs-item-unit")}>
                      {spec.unit}
                    </span>
                  )}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div className={cx("nutritional-data__divider-row")}>
          <div className={cx("nutritional-data__divider")}></div>
        </div>

        {/* 2. Gráficos nutricionales */}
        <div className={cx("nutritional-data__chart-section")}>
          <div className={cx("nutritional-data__chart-grid")}>
            <div className={cx("nutritional-data__chart-column")}>
              <div className={cx("nutritional-data__chart-column-header")}>
                <Typography
                  variant="h4"
                  className={cx("nutritional-data__chart-title")}
                >
                  Distribución de Macronutrientes
                </Typography>
              </div>
              <div className={cx("nutritional-data__pie-container")}>
                <div className={cx("nutritional-data__aspect-ratio-box")}>
                  <div className={cx("nutritional-data__aspect-ratio-content")}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ right: 15 }}>
                        <Pie
                          data={nutritionalData}
                          cx="45%"
                          cy="50%"
                          innerRadius="30%"
                          outerRadius="60%"
                          paddingAngle={2}
                          dataKey="value"
                          isAnimationActive={false}
                          labelLine={false}
                          label={
                            !isMediumOrSmaller
                              ? renderCustomizedLabel
                              : undefined
                          }
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
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Proporción"]}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "8px 12px",
                            fontSize: "12px",
                          }}
                        />
                        <Legend
                          layout="vertical"
                          align="right"
                          verticalAlign="middle"
                          iconSize={14}
                          className={cx(
                            "nutritional-data__chart-legend",
                            "pie-legend"
                          )}
                          formatter={legendFormatter}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("nutritional-data__chart-column")}>
              <div className={cx("nutritional-data__chart-column-header")}>
                <Typography
                  variant="h4"
                  className={cx("nutritional-data__chart-title")}
                >
                  Comparación con estándar de la industria
                </Typography>
              </div>
              <div className={cx("nutritional-data__bar-container")}>
                <div className={cx("nutritional-data__aspect-ratio-box")}>
                  <div className={cx("nutritional-data__aspect-ratio-content")}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={comparisonData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 10,
                          bottom: isSmallOrSmaller ? 70 : 50,
                        }}
                        className={cx("nutritional-data__bar-chart")}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          angle={isSmallOrSmaller ? -45 : 0}
                          textAnchor={isSmallOrSmaller ? "end" : "middle"}
                          height={isSmallOrSmaller ? 60 : 30}
                          className={cx("nutritional-data__bar-x-axis")}
                        />
                        <YAxis unit="%" />
                        <Tooltip content={<CustomBarTooltip />} />
                        <Legend
                          className={cx("bar-legend")}
                          layout="horizontal"
                          verticalAlign="bottom"
                          iconType="circle"
                        />
                        <Bar
                          name="Nuestro Producto"
                          dataKey="producto"
                          fill={colors.primary}
                          barSize={isSmallOrSmaller ? 15 : 20}
                        />
                        <Bar
                          name="Estándar AAFCO"
                          dataKey="estandar"
                          fill={colors.accent3}
                          barSize={isSmallOrSmaller ? 15 : 20}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionalData;
