'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "./Searchbar";
import FilterDropdown from "./FilterDropdown";
import PokemonCard from "./PokemonCard"; 

export default function PokemonCards() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);

  // Type colors mapping for Pokémon types
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dark: '#705848',
    dragon: '#7038F8',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  const getPokemonDetails = async (url) => {
    const res = await fetch(url);
    return res.json();
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();
        const detailed = await Promise.all(
          data.results.map((poke) => getPokemonDetails(poke.url))
        );
        
        // Process the data into a cleaner format for our components
        const processedData = detailed.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other["official-artwork"].front_default || 
                 `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
          types: pokemon.types.map(t => t.type.name),
          stats: {
            hp: pokemon.stats.find(stat => stat.stat.name === "hp")?.base_stat || 50,
            attack: pokemon.stats.find(stat => stat.stat.name === "attack")?.base_stat || 50,
            defense: pokemon.stats.find(stat => stat.stat.name === "defense")?.base_stat || 50,
            speed: pokemon.stats.find(stat => stat.stat.name === "speed")?.base_stat || 50,
          }
        }));
        
        setPokemonList(processedData);
      } catch (err) {
        console.error(err);
        setError("Failed to load Pokémon.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    // Animation trigger for filtering
    if (pokemonList.length > 0) {
      setIsFiltering(true);
      const timer = setTimeout(() => setIsFiltering(false), 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, selectedType]);

  const filteredList = pokemonList.filter((pokemon) => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = selectedType === "" || pokemon.types.includes(selectedType);
    return nameMatch && typeMatch;
  });

  // Get primary type for header styling
  const getPrimaryType = () => {
    if (selectedType) return selectedType;
    return "normal";
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8" 
         style={{
           background: `linear-gradient(to bottom, #1a202c, #2d3748)`,
         }}>
      <div className="max-w-7xl mx-auto">
        {/* Header with dynamic styling based on selected type */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
            Pokédex
            <span className="ml-2 inline-block animate-pulse">
              <Image 
                src="/pokeball.png" 
                alt="Pokeball" 
                width={40} 
                height={40} 
                className="inline"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.target.style.display = 'none';
                }}
              />
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore the world of Pokémon with our interactive Pokédex
          </p>
        </div>

        {/* Search and filter controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterDropdown
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            types={[...new Set(pokemonList.flatMap((p) => p.types))].sort()}
          />
        </div>

        {/* Results summary */}
        <div className="mb-6 text-center">
          <p className="text-gray-300">
            {loading ? 'Searching the Pokémon world...' : 
             `Found ${filteredList.length} Pokémon`}
            {selectedType && ` of ${selectedType} type`}
          </p>
        </div>

        {/* Pokemon grid with loading and error states */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-12 bg-white bg-opacity-5 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-200">No Pokémon found</h3>
            <p className="mt-1 text-gray-400">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredList.map((pokemon) => (
              <div key={pokemon.id} 
                className={`transition-all duration-500 ${isFiltering ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                style={{ transitionDelay: `${Math.random() * 300}ms` }}
              >
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-16 text-center text-gray-400 text-sm">
          <p>Data provided by <a href="https://pokeapi.co/" className="text-blue-400 hover:underline">PokéAPI</a></p>
        </div>
      </div>
    </div>
  );
}