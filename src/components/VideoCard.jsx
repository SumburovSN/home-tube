import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [preview, setPreview] = useState(false);

  const handleMouseEnter = async () => {
    setPreview(true);

    try {
      // Видео уже есть в DOM, поэтому play() сработает без ошибок
      if (videoRef.current) {
        await videoRef.current.play();
      }
    } catch (error) {
      console.error('Не удалось воспроизвести preview:', error);
    }
    // try {
    //   await videoRef.current?.play();
    // } catch (error) {
    //   console.error(
    //     'Не удалось воспроизвести preview:',
    //     error,
    //   );
    // }
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
          {/* Картинка скрывается, когда включен preview */}
          <img
            src={video.thumbnail}
            alt={video.title}
            style={{ display: preview ? 'none' : 'block' }}
          />
          {/* {!preview && (
            <img
              src={video.thumbnail}
              alt={video.title}
            />
          )} */}

        {/* Видео присутствует в DOM всегда, но скрыто, пока preview === false */}
          <video
            ref={videoRef}
            src={video.video}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ display: preview ? 'block' : 'none', width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* {preview && (
            <video
              ref={videoRef}
              src={video.video}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )} */}

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