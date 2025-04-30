'use client'

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          id="search"
          placeholder=" "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full px-4 py-3 text-base text-white bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer transition-all duration-200"
        />
        <label
          htmlFor="search"
          className="absolute text-gray-400 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-[#1a202c] px-2 peer-placeholder-shown:px-4 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 peer-focus:text-blue-500"
        >
          Search Pokémon
        </label>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>
  );
}