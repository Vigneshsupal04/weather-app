import { useState } from "react";

function SearchBox({ onSearch, onLocationClick }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white/90 outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Search
      </button>

      <button
        type="button"
        onClick={onLocationClick}
        className="rounded-xl bg-gray-800 px-5 py-3 font-semibold text-white hover:bg-gray-900"
      >
        Use Location
      </button>
    </form>
  );
}

export default SearchBox;
