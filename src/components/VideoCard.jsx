import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  if (!video?.snippet) return null;

  return (
    <Link to={`/video/${video.id.videoId}`}>
      <div className="group cursor-pointer">
        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
          className="w-full rounded-2xl object-cover transition duration-300 group-hover:scale-[1.03]"
        />

        <div className="mt-3">
          <h2 className="font-semibold text-sm line-clamp-2">
            {video.snippet.title}
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            {video.snippet.channelTitle}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;