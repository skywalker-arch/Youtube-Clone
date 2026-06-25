import { Link } from "react-router-dom";
import { useState } from "react";

const VideoCard = ({ video }) => {
  if (!video?.snippet) return null;

  const [imgLoaded, setImgLoaded] = useState(false);
  const thumb = video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url || "";

  return (
    <Link
      to={`/video/${video.id.videoId}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-2xl"
      aria-label={`${video.snippet.title} by ${video.snippet.channelTitle}`}
    >
      <div className="cursor-pointer">
        <div className="w-full h-48 sm:h-40 md:h-48 overflow-hidden rounded-2xl bg-[#1e1e1e]">
          {!imgLoaded && (
            <div className="w-full h-full animate-pulse bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a]" aria-hidden="true" />
          )}

          <img
            src={thumb}
            alt={video.snippet.title || "Video thumbnail"}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition duration-300 ${imgLoaded ? 'group-hover:scale-[1.03]' : 'hidden'}`}
          />
        </div>

        <div className="mt-3">
          <h2 className="font-semibold text-sm line-clamp-2" title={video.snippet.title}>
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