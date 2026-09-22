import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [preview, setPreview] = useState(false);

  const handleMouseEnter = async () => {
    setPreview(true);

    try {
      await videoRef.current?.play();
    } catch (error) {
      console.error(
        'Не удалось воспроизвести preview:',
        error,
      );
    }
  };

  const handleMouseLeave = () => {
    setPreview(false);

    if (!videoRef.current) {
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <article className="video-card">
      <Link
        to={`/watch/${video.id}`}
        className="video-card-link"
      >
        <div
          className="thumbnail"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!preview && (
            <img
              src={video.thumbnail}
              alt={video.title}
            />
          )}

          {preview && (
            <video
              ref={videoRef}
              src={video.video}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}

          <span className="duration">
            {video.duration}
          </span>
        </div>

        <div className="video-info">
          <div className="video-avatar">
            {video.category[0]}
          </div>

          <div>
            <h2>{video.title}</h2>
            <p>{video.category}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default VideoCard;