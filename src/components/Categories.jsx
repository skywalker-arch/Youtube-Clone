const categories = [
  "All",
  "Music",
  "Gaming",
  "News",
  "Live",
  "Coding",
  "Podcasts",
  "Movies",
  "Sports",
  "AI",
  "React",
  "JavaScript",
];

const Categories = () => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          className="bg-[#272727] hover:bg-white hover:text-black transition px-4 py-2 rounded-lg whitespace-nowrap text-sm"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;