import { useEffect, useState } from "react";

import MainLayout from "../layouts/Mainlayout"
import Videos from "../components/Videos";
import Loader from "../components/Loader";
import Categories from "../components/Categories";

import { fetchFromAPI } from "../utils/fetchData";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAPI("search?part=snippet&q=trending")
      .then((data) => {
        setVideos(data.items);
        setLoading(false);
      });
  }, []);

  return (
  <MainLayout>
    <Categories />

    {loading ? (
      <Loader />
    ) : (
      <Videos videos={videos} />
    )}
  </MainLayout>
);
};

export default Home;