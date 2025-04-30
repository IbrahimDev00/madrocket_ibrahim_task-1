'use client'
export default function FilterDropdown({ selectedType, setSelectedType, types }) {
    return (
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="p-2 border rounded text-black bg-gray-400"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    );
  }
  