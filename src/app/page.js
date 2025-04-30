'use client';

import PokemonCards from "@/app/components/PokemonCards";
//import gradient from "../../public/image_bg.jpg"

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('../../public/image_bg.jpg')] bg-no-repeat">
      <PokemonCards />
    </main>
  );
}
