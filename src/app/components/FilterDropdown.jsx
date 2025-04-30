'use client'
import { useState, useRef, useEffect } from 'react';

export default function FilterDropdown({ selectedType, setSelectedType, types }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    // Default color for "All Types" or unknown types
    "": '#2D3748'
  };

  // Get background color based on selected type
  const getTypeColor = (type) => {
    return typeColors[type.toLowerCase()] || typeColors[""];
  };

  // Handle selecting an option
  const handleSelect = (type) => {
    setSelectedType(type);
    setIsOpen(false);
  };

  return (
    <div className="relative w-48" ref={dropdownRef}>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg overflow-hidden"
        style={{ 
          backgroundColor: selectedType ? getTypeColor(selectedType) : '#2D3748',
          borderLeft: `4px solid ${selectedType ? getTypeColor(selectedType) : '#1A202C'}`
        }}
      >
        <span className="truncate">
          {selectedType ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1) : 'All Types'}
        </span>
        <svg 
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`absolute left-0 z-10 w-full mt-1 origin-top-right bg-black border border-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 overflow-hidden ${
          isOpen ? 'opacity-100 scale-100 max-h-60' : 'opacity-0 scale-95 max-h-0 pointer-events-none'
        }`}
        style={{ backgroundColor: '#18181b' }}
      >
        <div className="py-1 overflow-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <div 
            className="block px-4 py-2 text-sm text-white cursor-pointer hover:bg-gray-700 transition-colors duration-150 flex items-center"
            onClick={() => handleSelect("")}
          >
            <div 
              className="w-3 h-3 mr-2 rounded-full"
              style={{ backgroundColor: '#2D3748' }}
            />
            All Types
          </div>
          {types.map((type) => (
            <div
              key={type}
              className="flex items-center px-4 py-2 text-sm text-white cursor-pointer hover:bg-gray-700 transition-colors duration-150"
              onClick={() => handleSelect(type)}
            >
              <div 
                className="w-3 h-3 mr-2 rounded-full"
                style={{ backgroundColor: getTypeColor(type) }}
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}