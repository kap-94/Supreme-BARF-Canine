import {
  About,
  Benefits,
  Hero,
  ProductGrid,
  FoodCalculator,
  FrequentAskedQuestions,
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
      </main>
    </div>
  );
}
