import { useParams } from "react-router-dom";
import MainLayout from "../layouts/Mainlayout";

const VideoDetail = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Video Player */}
        <div className="flex-1">
          <iframe
            width="100%"
            height="600"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-2xl"
          ></iframe>

          <h1 className="text-2xl font-bold mt-5">
            Playing Video
          </h1>
        </div>

        {/* Related Videos Placeholder */}
        <div className="w-full lg:w-[350px]">
          <h2 className="text-xl font-semibold mb-4">
            Related Videos
          </h2>
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoDetail;