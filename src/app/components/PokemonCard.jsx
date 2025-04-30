import Image from "next/image";
import { useState } from "react";

export default function PokemonCard({ pokemon }) {
  const [isHovered, setIsHovered] = useState(false);

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

  // Get background color based on type
  const getTypeColor = (type) => {
    return typeColors[type.toLowerCase()] || '#718096';
  };

  // Get the primary type for the card's accent color
  const primaryType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0] : 'normal';
  const primaryColor = getTypeColor(primaryType);

  return (
    <div
      className={`relative overflow-hidden bg-gray-50 rounded-2xl p-6 flex flex-col items-center transition-all duration-300 ${
        isHovered ? 'shadow-xl scale-105' : 'shadow-md'
      }`}
      style={{
        borderTop: `4px solid ${primaryColor}`,
        background: `linear-gradient(to bottom, white, ${isHovered ? '#f8fafc' : 'white'})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background pattern effect */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* Pokemon ID badge */}
      <div
        className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full text-white"
        style={{ backgroundColor: primaryColor }}
      >
        #{String(pokemon.id).padStart(3, '0')}
      </div>

      {/* Image with hover effect */}
      <div
        className={`relative mb-4 transition-transform duration-300 ${
          isHovered ? 'scale-110' : ''
        }`}
      >
        <div
          className="absolute inset-0 rounded-full blur-md opacity-30"
          style={{ backgroundColor: primaryColor }}
        />
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={120}
          height={120}
          className="relative z-10 transform transition-transform duration-300"
        />
      </div>

      {/* Pokemon name */}
      <h2 className="capitalize font-bold text-gray-800 text-lg mb-1">
        {pokemon.name}
      </h2>

      {/* Type tags */}
      <div className="mt-2 flex gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="text-xs px-3 py-1 rounded-full capitalize font-medium text-white shadow-sm"
            style={{ backgroundColor: getTypeColor(type) }}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Stats indicator */}
      <div className="w-full mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-xs text-gray-500">
          <span>ATK</span>
          <span>DEF</span>
          <span>SPD</span>
        </div>
        <div className="flex justify-between mt-1 gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: isHovered ? `${Math.random() * 60 + 40}%` : '0%',
                  backgroundColor: primaryColor,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}