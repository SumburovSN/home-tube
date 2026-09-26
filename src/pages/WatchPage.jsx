import { useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { videos } from '../data/videos/index';
import { getRecommendations } from '../data/videoUtils';

function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const recommendations = getRecommendations(video, videos);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleEnded = () => {
      if (recommendations.length === 0) return;

      // 1. Находим, где текущее видео находится в глобальном упорядоченном массиве videos
      const globalIndex = videos.findIndex((item) => item.id === video.id);

      // 2. Ищем следующее видео. Мы будем идти вперёд по массиву videos, 
      // пока не найдем то видео, которое ОДНОВРЕМЕННО присутствует в блоке похожих (recommendations)
      let nextVideo = null;
      
      // Пробегаем по кругу от текущего индекса вперед
      for (let i = 1; i <= videos.length; i++) {
        const checkIndex = (globalIndex + i) % videos.length;
        const candidate = videos[checkIndex];
        
        // Проверяем, есть ли этот кандидат в текущих рекомендациях
        const isInRecommendations = recommendations.some((rec) => rec.id === candidate.id);
        
        if (isInRecommendations) {
          nextVideo = candidate;
          break; // Нашли ближайшее следующее видео из списка рекомендаций!
        }
      }

      // 3. Если по какой-то причине хитрый поиск не сработал, 
      // как запасной вариант берем просто второе видео из рекомендаций (чтобы не возвращаться на предыдущее)
      if (!nextVideo) {
        nextVideo = recommendations.length > 1 ? recommendations[1] : recommendations[0];
      }

      if (nextVideo) {
        navigate(`/watch/${nextVideo.id}`);
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
        {recommendations.map((item) => (
          <Link key={item.id} to={`/watch/${item.id}`} className="recommendation">
            <div className="recommendation-thumbnail">
              <video src={item.video} muted preload="metadata" />
              <span>{item.duration}</span>
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.category}</p>
            </div>
          </Link>
        ))}
      </aside>
    </main>
  );
}

export default WatchPage;
