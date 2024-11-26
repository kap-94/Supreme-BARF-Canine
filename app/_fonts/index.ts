// styles/fonts.ts
import { Raleway, Poppins } from "next/font/google";

// Definir las fuentes usando next/font/google
export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});
