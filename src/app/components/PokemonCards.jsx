'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";

export default function PokemonCards() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPokemonDetails = async (url) => {
    const res = await fetch(url);
    return res.json();
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();
        const detailed = await Promise.all(
          data.results.map((poke) => getPokemonDetails(poke.url))
        );
        setPokemonList(detailed);
      } catch (err) {
        setError("Failed to load Pokémon.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredList = pokemonList.filter((pokemon) => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch =
      selectedType === "" || pokemon.types.some((t) => t.type.name === selectedType);
    return nameMatch && typeMatch;
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokédex</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterDropdown
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          types={[...new Set(pokemonList.flatMap((p) => p.types.map((t) => t.type.name)))]}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredList.length === 0 ? (
        <p className="text-center">No Pokémon found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredList.map((pokemon) => (
            <div key={pokemon.id} className="bg-white shadow rounded p-4">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                width={96}
                height={96}
              />

              <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
              <p>ID: {pokemon.id}</p>
              <p>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
