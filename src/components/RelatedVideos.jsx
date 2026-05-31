import VideoCard from "./VideoCard";

const RelatedVideos = ({ videos = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </div>
  );
};

export default RelatedVideos;