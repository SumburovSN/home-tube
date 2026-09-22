import { Link, useParams } from 'react-router-dom';
import { videos } from '../data/videos/index';
import { getRecommendations,} from '../data/videoUtils';


function WatchPage() {
  const { id } = useParams();

  const video = videos.find(
    (item) => item.id === Number(id),
  );

  if (!video) {
    return (
      <main className="content">
        <h1>Видео не найдено</h1>

        <Link to="/">
          ← Вернуться на главную
        </Link>
      </main>
    );
  }

  const recommendations =
  getRecommendations(video, videos);

  return (
    <main className="watch-page">
      <div className="watch-main">
        <div className="player">
          <video
            src={video.video}
            controls
            autoPlay
            playsInline
          />
        </div>

        <h1>{video.title}</h1>

        <p className="watch-category">
          {video.category}
        </p>
      </div>

      <aside className="recommendations">
        <h2>Похожие видео</h2>

        {recommendations.map((item) => (
          <Link
            key={item.id}
            to={`/watch/${item.id}`}
            className="recommendation"
          >
            <div className="recommendation-thumbnail">
              <video
                src={item.video}
                muted
                preload="metadata"
              />

              <span>
                {item.duration}
              </span>
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
