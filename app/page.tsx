import { About, Benefits, Hero, ProductGrid, FoodCalculator } from "./_modules";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <About />
        <Benefits />
        <ProductGrid />
        <FoodCalculator />
      </main>
    </div>
  );
}
