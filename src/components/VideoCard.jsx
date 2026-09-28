import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryIcon } from '../data/categoryUtils';

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null); // Реф для отслеживания видимости самой карточки
  const [preview, setPreview] = useState(false);
  const [isInView, setIsInView] = useState(false); // Флаг: видна ли карточка на экране

  // Эффект ленивой загрузки (Lazy Loading)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); // Карточка близко к экрану -> разрешаем рендер <video>
          observer.disconnect(); // Нам достаточно одного срабатывания, отключаем слежку
        }
      },
      {
        rootMargin: '300px', // Начнет загружать видео-файл заранее, за 300px до появления карточки в зоне видимости
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = async () => {
    setPreview(true);

    try {
      // Защита: видео запустится только если оно уже успело отрендериться в DOM благодаря isInView
      if (videoRef.current) {
        await videoRef.current.play();
      }
    } catch (error) {
      console.error('Не удалось воспроизвести preview:', error);
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
    // Привязываем cardRef к корневому тегу карточки
    <article ref={cardRef} className="video-card">
      <Link to={`/watch/${video.id}`} className="video-card-link">
        <div
          className="thumbnail"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Картинка показывается ВСЕГДА, пока не включен preview */}
          <img
            src={video.thumbnail}
            alt={video.title}
            style={{ display: preview ? 'none' : 'block' }}
          />

          {/* 
            Идеальный гибрид: Тег <video> создается в DOM ТОЛЬКО если карточка 
            в зоне видимости (isInView === true) 
          */}
          {isInView && (
            <video
              ref={videoRef}
              src={video.video} // Здесь будет путь к вашему нарезанному 15-сек файлу
              muted
              loop
              playsInline
              preload="metadata"
              style={{ display: preview ? 'block' : 'none', width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          
          <span className="duration">
            {video.duration}
          </span>
        </div>

        <div className="video-info">
          <div className="video-avatar">
            {getCategoryIcon(video.categoryId)}
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


// import { useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getCategoryIcon } from '../data/categoryUtils';

// function VideoCard({ video }) {
//   const videoRef = useRef(null);
//   const [preview, setPreview] = useState(false);

//   const handleMouseEnter = async () => {
//     setPreview(true);

//     try {
//       // Видео уже есть в DOM, поэтому play() сработает без ошибок
//       if (videoRef.current) {
//         await videoRef.current.play();
//       }
//     } catch (error) {
//       console.error('Не удалось воспроизвести preview:', error);
//     }    
//   };

//   const handleMouseLeave = () => {
//     setPreview(false);

//     if (!videoRef.current) {
//       return;
//     }

//     videoRef.current.pause();
//     videoRef.current.currentTime = 0;
//   };

//   return (
//     <article className="video-card">
//       <Link
//         to={`/watch/${video.id}`}
//         className="video-card-link"
//       >
//         <div
//           className="thumbnail"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           {/* Картинка скрывается, когда включен preview */}
//           <img
//             src={video.thumbnail}
//             alt={video.title}
//             style={{ display: preview ? 'none' : 'block' }}
//           />

//         {/* Видео присутствует в DOM всегда, но скрыто, пока preview === false */}
//           <video
//             ref={videoRef}
//             src={`${video.video}#t=0,5`} // Начнет с 0 и остановится на 15 секунде
//             // src={video.video}
//             muted
//             loop
//             playsInline
//             preload="metadata"
//             style={{ display: preview ? 'block' : 'none', width: '100%', height: '100%', objectFit: 'cover' }}
//           />
//           <span className="duration">
//             {video.duration}
//           </span>
//         </div>

//         <div className="video-info">
//           <div className="video-avatar">
//             {getCategoryIcon(video.categoryId)}
//           </div>

//           <div>
//             <h2>{video.title}</h2>
//             <p>{video.category}</p>
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// }

// export default VideoCard;