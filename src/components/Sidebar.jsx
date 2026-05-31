import {
  MdHome,
  MdOutlineSubscriptions,
  MdVideoLibrary,
  MdHistory,
  MdOutlineWatchLater,
  MdThumbUp,
} from "react-icons/md";

const Sidebar = () => {
  const links = [
    { name: "Home", icon: <MdHome /> },
    { name: "Subscriptions", icon: <MdOutlineSubscriptions /> },
    { name: "Library", icon: <MdVideoLibrary /> },
    { name: "History", icon: <MdHistory /> },
    { name: "Watch Later", icon: <MdOutlineWatchLater /> },
    { name: "Liked Videos", icon: <MdThumbUp /> },
  ];

  return (
    <div className="hidden md:flex flex-col w-[240px] h-screen bg-[#0f0f0f] border-r border-[#222] p-3">
      {links.map((link) => (
        <div
          key={link.name}
          className="flex items-center gap-5 px-4 py-3 rounded-xl hover:bg-[#272727] cursor-pointer transition"
        >
          <span className="text-2xl">{link.icon}</span>
          <span>{link.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;