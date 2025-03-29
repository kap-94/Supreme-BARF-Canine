// app/_lib/productsData.ts
export interface ProductData {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  discountedPrice?: string;
  description: string[];
  benefits: string[];
  images: Array<{
    url: string;
    alt: string;
  }>;
  productHandle: string;
  storeUrl: string;
  isSubscription: boolean;

  // Campos para suscripciones (legacy)
  subscriptionBadge?: string;
  subscriptionDetails?: string;

  // Nuevos campos para paquetes con descuento
  packageDiscount?: string;
  packageDetails?: string;

  metaTitle: string;
  metaDescription: string;
}

// Función que simula obtener la data de productos (por ejemplo, desde una API)
export async function getProductsData(): Promise<ProductData[]> {
  // Simula un retraso como si fuera una petición real
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Precio base con descuento de la bolsa individual
  const baseUnitPrice = 100; // $100.00 MXN

  const productsDatabase: { [key: string]: ProductData } = {
    "formula-de-pollo-perro-adulto": {
      id: "supreme-barf-single",
      title: "Bolsa de alimento",
      subtitle: "1.25kg",
      price: "$110.00 MXN",
      discountedPrice: "$100.00 MXN",
      description: [
        "Supreme BARF Canine destaca por su formulación premium elaborada con ingredientes de calidad de consumo humano, incluyendo huesos carnosos de pollo perfectamente molidos, hígados, molleja y corazón de pollo. Esta exclusiva mezcla se complementa con harina de maíz, zanahoria, manzana y aceite de salmón, garantizando una nutrición completa para tu mascota.",
        "Desarrollado por expertos veterinarios e ingenieros especializados en nutrición canina, este alimento natural proporciona proteínas de alta calidad con todos los aminoácidos esenciales y ácidos grasos Omega-3 y 6. Su fórmula científicamente balanceada fortalece el sistema inmunológico, mejora la salud de la piel y el pelaje, favorece la digestión y contribuye al mantenimiento de articulaciones fuertes, asegurando el bienestar integral de tu perro.",
      ],
      benefits: [
        "Nutrición balanceada y completa",
        "Ingredientes de calidad humana",
        "Sin conservantes artificiales",
        "Mejora la salud digestiva",
        "Pelaje más brillante y saludable",
        "Mayor vitalidad y energía",
      ],
      images: [
        {
          url: "/product.jpeg",
          alt: "Bolsa de alimento Supreme BARF para perros",
        },
        {
          url: "/products.jpeg",
          alt: "Varios paquetes de producto - Supreme BARF",
        },
        {
          url: "/novak-and-food.jpeg",
          alt: "Perro viendo al producto - Supreme BARF",
        },
      ],
      productHandle: "formula-de-pollo-perro-adulto-todas-las-razas",
      storeUrl:
        "https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-todas-las-razas",
      isSubscription: false,
      metaTitle: "Bolsa de Alimento - Supreme BARF",
      metaDescription:
        "Nutrición premium con ingredientes de calidad humana para el bienestar integral de tu mascota.",
    },
    "formula-de-pollo-perro-adulto-paquete-8": {
      id: "supreme-barf-pack-8",
      title: "Paquete de 8 bolsas",
      subtitle: "10kg total",
      price: "$800.00 MXN", // 8 bolsas x $100 cada una
      discountedPrice: "$760.00 MXN", // 5% de descuento sobre $800
      description: [
        "Asegura la alimentación de tu mascota por más tiempo con nuestro paquete de 8 bolsas de Supreme BARF Canine. Disfruta de un 5% de descuento al comprar este paquete, ahorrando en cada bolsa sin comprometer la calidad premium que tu mascota merece.",
        "Cada bolsa contiene nuestra formulación premium elaborada con ingredientes de calidad humana, proporcionando toda la nutrición que tu perro necesita.",
      ],
      benefits: [
        "5% de descuento en el paquete completo",
        "Ahorro de $40 MXN respecto a la compra individual",
        "Mayor duración de alimento para tu mascota",
        "La misma calidad premium en cada bolsa",
        "Evita quedarte sin alimento para tu mascota",
        "Ideal para hogares con uno o dos perros",
      ],
      images: [
        {
          url: "/products.jpeg",
          alt: "Paquete de 8 bolsas de alimento Supreme BARF para perros",
        },
        {
          url: "/product.jpeg",
          alt: "Vista frontal del producto - Supreme BARF",
        },
        {
          url: "/novak-and-food.jpeg",
          alt: "Perro viendo al producto - Supreme BARF",
        },
      ],
      productHandle: "formula-de-pollo-perro-adulto-paquete-8",
      storeUrl:
        "https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-paquete-8",
      isSubscription: false,
      packageDiscount: "5% DESCUENTO",
      packageDetails: "Ahorra $40 MXN con nuestro paquete de 8 bolsas",
      metaTitle: "Paquete 8 Bolsas - Supreme BARF | 5% Descuento",
      metaDescription:
        "Paquete de 8 bolsas de alimento premium para perros con 5% de descuento. Asegura la nutrición de calidad para tu mascota por más tiempo.",
    },
    "formula-de-pollo-perro-adulto-paquete-16": {
      id: "supreme-barf-pack-16",
      title: "Paquete de 16 bolsas",
      subtitle: "20kg total",
      price: "$1,600.00 MXN", // 16 bolsas x $100 cada una
      discountedPrice: "$1,440.00 MXN", // 10% de descuento sobre $1,600
      description: [
        "Nuestro paquete más económico con 16 bolsas de Supreme BARF Canine te ofrece un impresionante 10% de descuento sobre el precio regular. La mejor opción para familias con múltiples mascotas o para quienes prefieren asegurar la alimentación de sus perros por periodos más largos.",
        "Con 20kg de alimento premium. Cada bolsa contiene la misma fórmula excepcional elaborada con ingredientes de calidad humana, garantizando una alimentación consistente y saludable para tu mejor amigo.",
      ],
      benefits: [
        "10% de descuento en el paquete completo",
        "Ahorro significativo de $160 MXN",
        "Mayor economía a largo plazo",
        "Ideal para hogares con múltiples perros",
        "Reducción de frecuencia de compras",
        "La mejor relación calidad-precio disponible",
      ],
      images: [
        {
          url: "/products.jpeg",
          alt: "Paquete familiar de 16 bolsas de alimento Supreme BARF",
        },
        {
          url: "/product.jpeg",
          alt: "Vista frontal del producto - Supreme BARF",
        },
        {
          url: "/novak-and-food.jpeg",
          alt: "Perro viendo al producto - Supreme BARF",
        },
      ],
      productHandle: "formula-de-pollo-perro-adulto-paquete-16",
      storeUrl:
        "https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-paquete-16",
      isSubscription: false,
      packageDiscount: "10% DESCUENTO",
      packageDetails:
        "Máximo ahorro: $160 MXN con nuestro paquete familiar de 16 bolsas",
      metaTitle: "Paquete Familiar 16 Bolsas - Supreme BARF | 10% Descuento",
      metaDescription:
        "Paquete familiar de 16 bolsas de alimento premium para perros con 10% de descuento. La opción más económica para hogares con múltiples mascotas.",
    },
  };

  return Object.values(productsDatabase);
}
