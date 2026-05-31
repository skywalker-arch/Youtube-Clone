import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-[#222]">
      <div className="flex items-center justify-between px-6 py-3">
        <Link
          to="/"
          className="text-2xl font-bold text-red-500"
        >
          YouTube Clone
        </Link>

        <SearchBar />

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full w-10 h-10"
        />
      </div>
    </header>
  );
};

export default Navbar;