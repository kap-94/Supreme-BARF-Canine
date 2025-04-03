"use client";

import React from "react";
import classNames from "classnames/bind";
import { SectionHeader, Typography } from "@/app/_components";
import Image from "next/image";
import styles from "./VeterinaryValidation.module.scss";

const cx = classNames.bind(styles);

interface VetEndorsementProps {
  id: number;
  name: string;
  credential: string;
  organization: string;
  quote: string;
  photoUrl: string;
}

const VeterinaryValidation: React.FC = () => {
  // Validaciones de veterinarios profesionales
  const vetEndorsements: VetEndorsementProps[] = [
    {
      id: 1,
      name: "Dra. Ana Martínez",
      credential: "DMV, PhD en Nutrición Animal",
      organization: "Universidad Veterinaria Nacional",
      quote:
        "La composición nutricional de esta fórmula cumple con todos los estándares científicos para un desarrollo óptimo canino y está respaldada por estudios avanzados en bienestar animal.",
      photoUrl: "/images/vet-1.jpg",
    },
    {
      id: 2,
      name: "Dr. Carlos Rodríguez",
      credential: "DMV, Especialista en Medicina Preventiva",
      organization: "Instituto Veterinario Internacional",
      quote:
        "Los valores nutricionales de este alimento han sido rigurosamente validados para maximizar la salud y longevidad de las mascotas, especialmente en términos de su balance proteico y perfil de ácidos grasos.",
      photoUrl: "/images/vet-2.jpg",
    },
    {
      id: 3,
      name: "Dra. Laura Gómez",
      credential: "DMV, MSc en Nutrición Clínica",
      organization: "Asociación de Nutrición Veterinaria",
      quote:
        "La formulación presenta un excelente equilibrio de macronutrientes y micronutrientes esenciales que promueven un sistema inmunológico fuerte y una digestión óptima en caninos de todas las edades.",
      photoUrl: "/images/vet-3.jpg",
    },
  ];

  return (
    <section className={cx("veterinary-validation")}>
      <div className={cx("veterinary-validation__container")}>
        <div className={cx("veterinary-validation__header-wrapper")}>
          <SectionHeader
            title="Respaldado por expertos veterinarios"
            // subtitle="Formulación avalada por profesionales en nutrición animal."
            align="left"
            className={cx("veterinary-validation__header")}
          />
        </div>

        {/* Validación de veterinarios profesionales */}
        <div className={cx("veterinary-validation__validation")}>
          <div className={cx("veterinary-validation__validation-grid")}>
            {vetEndorsements.map((vet) => (
              <div
                key={vet.id}
                className={cx("veterinary-validation__validation-item")}
              >
                <div
                  className={cx("veterinary-validation__validation-content")}
                >
                  <div
                    className={cx("veterinary-validation__validation-quote")}
                  >
                    <Typography
                      variant="p2"
                      fontWeight={400}
                      className={cx("veterinary-validation__validation-text")}
                    >
                      "{vet.quote}"
                    </Typography>
                  </div>
                  <div
                    className={cx("veterinary-validation__validation-expert")}
                  >
                    <div
                      className={cx(
                        "veterinary-validation__validation-photo-container"
                      )}
                    >
                      <div
                        className={cx(
                          "veterinary-validation__validation-photo-placeholder"
                        )}
                      >
                        {/* Imagen de perfil o placeholder */}
                        {vet.photoUrl ? (
                          <Image
                            src={vet.photoUrl}
                            alt={vet.name}
                            fill
                            sizes="100px"
                            className={cx(
                              "veterinary-validation__validation-photo"
                            )}
                          />
                        ) : (
                          <span>{vet.name.charAt(0)}</span>
                        )}
                      </div>
                    </div>
                    <div
                      className={cx("veterinary-validation__validation-info")}
                    >
                      <Typography
                        variant="p2"
                        fontWeight={600}
                        className={cx("veterinary-validation__validation-name")}
                      >
                        {vet.name}
                      </Typography>
                      <Typography
                        variant="p3"
                        className={cx(
                          "veterinary-validation__validation-credential"
                        )}
                      >
                        {vet.credential}
                      </Typography>
                      <Typography
                        variant="p3"
                        className={cx(
                          "veterinary-validation__validation-organization"
                        )}
                      >
                        {vet.organization}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VeterinaryValidation;
