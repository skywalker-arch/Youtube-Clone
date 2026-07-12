import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { MdKeyboardVoice } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import useDebounce from "../hooks/UseDebounce";

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
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  const debouncedSearch = useDebounce(searchTerm, 250);

  const navigate = useNavigate();

  useEffect(() => {
    const term = debouncedSearch.trim();

    if (term) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(term.toLowerCase()),
      );

      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setActiveIndex(-1);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setActiveIndex(-1);
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

      setShowSuggestions(false);

      navigate(`/search/${searchTerm}`);
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filteredSuggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && filteredSuggestions[activeIndex]) {
        const choice = filteredSuggestions[activeIndex];
        setSearchTerm(choice);
        setShowSuggestions(false);
        navigate(`/search/${choice}`);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center gap-3">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search"

            aria-autocomplete="list"
            aria-controls="search-suggestions"
            
            aria-expanded={showSuggestions}
            className="w-[500px] bg-[#121212] border border-[#303030]  px-5 py-2 rounded-l-full outline-none"
          />
          {searchTerm && (

            <button
              type="button"

              onClick={() => {
                setSearchTerm("");
                setFilteredSuggestions([]);
                setShowSuggestions(false);
              }}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <AiOutlineClose />
            </button>
          )}
        </div>

        <button className="bg-[#222] px-6 py-2 rounded-r-full border border-[#303030]">
          <FiSearch size={22} />
        </button>
      </form>

      <button
        className="bg-[#222] p-3 rounded-full hover:bg-[#333] transition"
        aria-label="Voice search"
      >
        <MdKeyboardVoice size={22} />
      </button>

      {/* Suggestions */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute top-14 left-0 w-[500px] bg-[#222] rounded-xl overflow-hidden shadow-2xl z-50"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              role="option"
              id={`suggestion-${index}`}
              aria-selected={activeIndex === index}
              onClick={() => {
                navigate(`/search/${suggestion}`);
                setSearchTerm(suggestion);
                setShowSuggestions(false);
              }}
              className={`px-4 py-3 hover:bg-[#333] cursor-pointer transition ${
                activeIndex === index ? "bg-[#333]" : ""
              }`}
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
