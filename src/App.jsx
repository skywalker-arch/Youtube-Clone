import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SearchFeed from "./pages/SearchFeed";
import VideoDetail from "./pages/VideoDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:searchTerm" element={<SearchFeed />} />
      <Route path="/video/:id" element={<VideoDetail />} />
    </Routes>
  );
};

export default App;