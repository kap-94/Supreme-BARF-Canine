import React from "react";
import { Typography } from "@/app/_components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import classNames from "classnames/bind";
import styles from "./ProductReviews.module.scss";

import "swiper/css";
import "swiper/css/navigation";

const cx = classNames.bind(styles);

interface ReviewProps {
  author: string;
  date: string;
  rating: number;
  content: string;
  avatarUrl?: string;
}

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  // This would normally come from an API based on productId
  // For this example we'll use static data
  const reviews: ReviewProps[] = [
    {
      author: "Carlos Martínez",
      date: "15 de febrero de 2025",
      rating: 5,
      content:
        "Mi perro adora este alimento. Desde que empezamos a darle Supreme BARF, su pelaje luce más brillante y tiene mucha más energía. Definitivamente se nota la diferencia entre este alimento natural y las croquetas convencionales.",
      avatarUrl: "/carlos-martinez.jpg",
    },
    {
      author: "Ana Rodríguez",
      date: "3 de enero de 2025",
      rating: 4,
      content:
        "Excelente calidad de ingredientes. Mi veterinario notó la mejora en la salud de mi mascota después de solo un mes. Además, la textura es perfecta y a mi perro le encanta el sabor - no deja nada en el plato.",
      avatarUrl: "/ana-rodriguez.jpg",
    },
    {
      author: "Miguel Sánchez",
      date: "28 de diciembre de 2024",
      rating: 5,
      content:
        "Increíble producto. Mi perro es muy exigente con la comida, pero con Supreme BARF come con mucho gusto. He notado menos problemas digestivos y más vitalidad en general. El servicio de entrega también es excelente.",
      avatarUrl: "/miguel-sanchez.jpg",
    },
    // {
    //   author: "Laura Gómez",
    //   date: "10 de diciembre de 2024",
    //   rating: 5,
    //   content:
    //     "Desde que cambié a mi mascota a esta comida, ha mejorado mucho su salud digestiva. Ya no tiene problemas estomacales y se nota más activo. Muy recomendable para perros con sensibilidad alimentaria.",
    //   avatarUrl: "/avatars/avatar4.jpg",
    // },
  ];

  // Swiper configuration
  const swiperConfig = {
    modules: [Navigation],
    slidesPerView: "auto" as const,
    spaceBetween: 24,
    navigation: true,
    breakpoints: {
      // cuando el ancho de la ventana es >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // cuando el ancho de la ventana es >= 768px
      768: {
        slidesPerView: "auto" as const,
        spaceBetween: 24,
      },
    },
  };

  return (
    <section className={cx("product-reviews")}>
      <div className={cx("product-reviews__container")}>
        <div className={cx("product-reviews__header")}>
          <Typography variant="h3" className={cx("product-reviews__title")}>
            Opiniones de Nuestros Clientes
          </Typography>
        </div>

        <div className={cx("product-reviews__slider-container")}>
          <Swiper {...swiperConfig} className={cx("product-reviews__slider")}>
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className={cx("product-reviews__slide")}>
                <div className={cx("product-reviews__review-card")}>
                  <div className={cx("product-reviews__review-header")}>
                    <div className={cx("product-reviews__author-info")}>
                      <div className={cx("product-reviews__avatar")}>
                        {review.avatarUrl ? (
                          <img
                            src={review.avatarUrl}
                            alt={review.author}
                            className={cx("product-reviews__avatar-img")}
                          />
                        ) : (
                          <div
                            className={cx(
                              "product-reviews__avatar-placeholder"
                            )}
                          >
                            {review.author.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <Typography
                          variant="p2"
                          fontWeight={600}
                          className={cx("product-reviews__author-name")}
                        >
                          {review.author}
                        </Typography>
                        <Typography
                          variant="p3"
                          className={cx("product-reviews__date")}
                        >
                          {review.date}
                        </Typography>
                      </div>
                    </div>
                    <div className={cx("product-reviews__rating")}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={cx("product-reviews__star", {
                            "product-reviews__star--filled":
                              star <= review.rating,
                          })}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <Typography
                    variant="p2"
                    className={cx("product-reviews__content")}
                  >
                    {review.content}
                  </Typography>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
