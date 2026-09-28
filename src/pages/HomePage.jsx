import { useState, useEffect, useRef } from 'react';

import { videos } from '../data/videos/index';
import { categories } from '../data/categories';
import {
  getCategoryAndDescendants,
} from '../data/categoryUtils';

import VideoCard from '../components/VideoCard';
import Sidebar from '../components/Sidebar';

const BATCH_SIZE = 30; // Количество видео, подгружаемых за один раз

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Состояние для контроля количества отображаемых карточек
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const loadMoreTriggerRef = useRef(null);

  // 1. Сначала фильтруем весь массив видео по выбранной категории
  const selectedCategoryIds =
    selectedCategory === 'all'
      ? null
      : getCategoryAndDescendants(selectedCategory);

  const filteredVideos =
    selectedCategoryIds === null
      ? videos
      : videos.filter((video) =>
          selectedCategoryIds.includes(video.categoryId)
        );

  // СБРОС СЧЁТЧИКА: При смене категории возвращаем показ к первым 30 элементам
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [selectedCategory]);

  // 2. Нарезаем отфильтрованные видео для текущего экрана (от 0 до visibleCount)
  const videosToRender = filteredVideos.slice(0, visibleCount);

  // 3. Отслеживаем появление триггера внизу страницы для подгрузки следующей пачки
  useEffect(() => {
    const trigger = loadMoreTriggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Если доскроллили до низа И еще есть что подгружать в текущей категории
      if (entry.isIntersecting && visibleCount < filteredVideos.length) {
        setVisibleCount((prevCount) => prevCount + BATCH_SIZE);
      }
    });

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [visibleCount, filteredVideos.length]); // Перезапускаем при изменении лимита или длины списка

  const currentCategory = categories.find(
    (category) => category.id === selectedCategory
  );

  return (
    <>
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="content">
        <h2>
          {currentCategory?.title ?? 'Мультики'}
        </h2>

        {filteredVideos.length === 0 ? (
          <div className="empty-state">
            <div>🎬</div>
            <h3>Пока здесь нет видео</h3>
            <p>Добавь видео в эту категорию, и они появятся здесь.</p>
          </div>
        ) : (
          <>
            {/* Рендерим только порцию videosToRender */}
            <div className="video-grid">
              {videosToRender.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                />
              ))}
            </div>

            {/* 
              Невидимый элемент-триггер. 
              Показывается только если в текущей категории скрыто еще хотя бы одно видео.
            */}
            {visibleCount < filteredVideos.length && (
              <div 
                ref={loadMoreTriggerRef} 
                style={{ height: '40px', margin: '20px 0', background: 'transparent' }} 
              />
            )}
          </>
        )}
      </main>
    </>
  );
}

export default HomePage;


// import { useState } from 'react';

// import { videos } from '../data/videos/index';
// import { categories } from '../data/categories';
// import {
//   getCategoryAndDescendants,
// } from '../data/categoryUtils';

// import VideoCard from '../components/VideoCard';
// import Sidebar from '../components/Sidebar';

// function HomePage() {
//   const [selectedCategory, setSelectedCategory] =
//     useState('all');

//   const selectedCategoryIds =
//     selectedCategory === 'all'
//       ? null
//       : getCategoryAndDescendants(
//           selectedCategory,
//         );

//   const filteredVideos =
//     selectedCategoryIds === null
//       ? videos
//       : videos.filter((video) =>
//           selectedCategoryIds.includes(
//             video.categoryId,
//           ),
//         );

//   const currentCategory =
//     categories.find(
//       (category) =>
//         category.id === selectedCategory,
//     );

//   return (
//     <>
//       <Sidebar
//         selectedCategory={selectedCategory}
//         onCategoryChange={setSelectedCategory}
//       />

//       <main className="content">
//         <h2>
//           {currentCategory?.title ?? 'Мультики'}
//         </h2>

//         {filteredVideos.length === 0 ? (
//           <div className="empty-state">
//             <div>🎬</div>

//             <h3>
//               Пока здесь нет видео
//             </h3>

//             <p>
//               Добавь видео в эту категорию,
//               и они появятся здесь.
//             </p>
//           </div>
//         ) : (
//           <div className="video-grid">
//             {filteredVideos.map((video) => (
//               <VideoCard
//                 key={video.id}
//                 video={video}
//               />
//             ))}
//           </div>
//         )}
//       </main>
//     </>
//   );
// }

// export default HomePage;
