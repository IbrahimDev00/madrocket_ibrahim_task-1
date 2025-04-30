import Image from "next/image";

export default function PokemonCard({ pokemon }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col items-center">
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={96}
        height={96}
        className="mb-2"
      />
      <h2 className="capitalize font-bold text-black">{pokemon.name}</h2>
      <p className="text-sm text-black">ID: {pokemon.id}</p>
      <div className="mt-1 flex gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="text-xs px-2 py-1 rounded-full capitalize"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
