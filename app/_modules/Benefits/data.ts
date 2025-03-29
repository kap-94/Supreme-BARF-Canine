import { Apple, Leaf, Shield, Droplets, Flame, Sparkles } from "lucide-react";
import { BenefitProps, MediaItemProps } from "./types";

export const BENEFITS_DATA: BenefitProps[] = [
  {
    id: 1,
    title: "Salud integral garantizada",
    description:
      "Potencia el metabolismo, fortalece el sistema inmunológico y promueve un pelaje brillante y saludable gracias a su formulación natural de nutrientes esenciales.",
    icon: Shield,
  },
  {
    id: 2,
    title: "Proceso de cocción seguro",
    description:
      "Nuestro método especializado maximiza la absorción de nutrientes y elimina patógenos, garantizando un alimento seguro y de fácil digestión para tu mascota.",
    icon: Flame,
  },
  {
    id: 3,
    title: "Hidratación óptima",
    description:
      "Su contenido de humedad natural ayuda a prevenir problemas renales y mantiene una hidratación adecuada, fundamental para el bienestar general de tu mascota.",
    icon: Droplets,
  },
  {
    id: 4,
    title: "Nutrición avalada por expertos",
    description:
      "Fórmula desarrollada por veterinarios e ingenieros especializados, que proporciona una nutrición completa y balanceada para garantizar la salud óptima de tu mascota.",
    icon: Apple,
  },
  {
    id: 5,
    title: "Ingredientes 100% naturales",
    description:
      "Elaborado con ingredientes frescos de la más alta calidad, enriquecido con aceite de salmón salvaje para aportar ácidos grasos omega-3 esenciales para tu mascota.",
    icon: Leaf,
  },
  {
    id: 6,
    title: "Digestión optimizada",
    description:
      "La combinación precisa de ingredientes facilita una mejor absorción de nutrientes, resultando en menor cantidad de heces y mejor aprovechamiento del alimento.",
    icon: Sparkles,
  },
];

export const MEDIA_ITEMS: MediaItemProps[] = [
  {
    alt: "Perro comiendo",
    src: "/dog-eating.jpg",
  },
  {
    alt: "Perro feliz",
    src: "/dog-smiling.jpg",
  },
];
