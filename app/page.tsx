import {
  About,
  Benefits,
  Hero,
  ProductGrid,
  FoodCalculator,
  FrequentAskedQuestions,
  Contact,
} from "./_modules";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <About />
        <Benefits />
        <ProductGrid />
        <FoodCalculator />
        <FrequentAskedQuestions />
        <Contact />
      </main>
    </div>
  );
}
