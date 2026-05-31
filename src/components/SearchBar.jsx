import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { MdKeyboardVoice } from "react-icons/md";

const suggestions = [
  "React tutorial",
  "JavaScript",
  "Node.js",
  "Frontend development",
  "Backend roadmap",
  "Movies",
  "Music mix",
  "Football highlights",
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || [],
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      const updatedSearches = [
        searchTerm,
        ...recentSearches.filter((item) => item !== searchTerm),
      ].slice(0, 5);

      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      setRecentSearches(updatedSearches);

      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <div className="relative flex items-center gap-3">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[500px] bg-[#121212] border border-[#303030] px-5 py-2 rounded-l-full outline-none"
        />

        <button className="bg-[#222] px-6 py-2 rounded-r-full border border-[#303030]">
          <FiSearch size={22} />
        </button>
      </form>

      <button className="bg-[#222] p-3 rounded-full hover:bg-[#333] transition">
        <MdKeyboardVoice size={22} />
      </button>

      {/* Suggestions */}
      {filteredSuggestions.length > 0 && (
        <div className="absolute top-14 left-0 w-[500px] bg-[#222] rounded-xl overflow-hidden shadow-2xl z-50">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/search/${suggestion}`);
                setSearchTerm(suggestion);
                setFilteredSuggestions([]);
              }}
              className="px-4 py-3 hover:bg-[#333] cursor-pointer transition"
            >
              {suggestion}
              
            </div>
          ))}
        </div>
      )}
      {recentSearches.length > 0 && (
        <div className="absolute top-[320px] left-0 w-[500px] bg-[#222] rounded-xl overflow-hidden mt-2">
          <p className="px-4 py-2 text-gray-400 text-sm">Recent Searches</p>

          {recentSearches.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/search/${item}`)}
              className="px-4 py-3 hover:bg-[#333] cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
