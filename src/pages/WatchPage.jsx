import { useEffect, useRef } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { videos } from '../data/videos/index';
import { getRecommendations } from '../data/videoUtils';
import { getNextVideo } from '../data/videoUtils';
import VideoCard from '../components/VideoCard';

function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Перехватываем переданное состояние
  const videoRef = useRef(null);

  const video = videos.find((item) => item.id === Number(id));

  if (!video) {
    return (
      <main className="content">
        <h1>Видео не найдено</h1>
        <Link to="/"> ← Вернуться на главную </Link>
      </main>
    );
  }
  
  // Список рекомендаций не меняется, пока мы не выходим из WatchPage
  // Если рекомендации переданы в state роутера, берем их. Иначе — вычисляем заново.
  const recommendations = location.state?.recommendations || getRecommendations(video, videos);
  

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleEnded = () => {
      if (recommendations.length === 0) return;

      const nextVideo = getNextVideo(video, recommendations);

      if (nextVideo) {
        navigate(`/watch/${nextVideo.id}`, { state: { recommendations } });
      }
    };

    videoElement.addEventListener('ended', handleEnded);
    return () => videoElement.removeEventListener('ended', handleEnded);
  }, [video, recommendations, navigate]);

  return (
    <main className="watch-page">
      <div className="watch-main">
        <div className="player">
          <video ref={videoRef} src={video.video} controls autoPlay playsInline />
        </div>
        <h1>{video.title}</h1>
        <p className="watch-category">{video.category}</p>
      </div>

      <aside className="recommendations">
        <h2>Похожие видео</h2>
        {recommendations.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
          />
        ))}
      </aside>
    </main>
  );
}

export default WatchPage;
