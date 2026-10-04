import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom'; // <--- Импортируем хук для URL

import { videos } from '../data/videos/index';
import { categories } from '../data/categories';
import {getCategoryAndDescendants} from '../data/categoryUtils';
import {filterVideos} from '../data/videoUtils';

import VideoCard from '../components/VideoCard';
import Sidebar from '../components/Sidebar';

const BATCH_SIZE = 30; // Количество видео, подгружаемых за один раз

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');  
  // Состояние для контроля количества отображаемых карточек
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const loadMoreTriggerRef = useRef(null);

  // Получаем параметр search из URL (например: ?search=синий+трактор)
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // 1. Сначала фильтруем весь массив видео по выбранной категории
  const selectedCategoryIds =
    selectedCategory === 'all'
      ? null
      : getCategoryAndDescendants(selectedCategory);

  const categoryFilteredVideos =
    selectedCategoryIds === null
      ? videos
      : videos.filter((video) =>
          selectedCategoryIds.includes(video.categoryId)
        );
  
  // 2. СВЕРХУ накладываем вашу функцию фильтрации по названию видео
  const filteredVideos = filterVideos(searchQuery, categoryFilteredVideos);

  // СБРОС СЧЁТЧИКА: При смене категории возвращаем показ к первым 30 элементам
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [selectedCategory]);

  // 3. Нарезаем отфильтрованные видео для текущего экрана (от 0 до visibleCount)
  const videosToRender = filteredVideos.slice(0, visibleCount);

  // 4. Отслеживаем появление триггера внизу страницы для подгрузки следующей пачки
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
          {searchQuery ? `Результаты поиска: "${searchQuery}"` : (currentCategory?.title ?? 'Мультики')}
        </h2>
        {/* <h2>
          {currentCategory?.title ?? 'Мультики'}
        </h2> */}

        {filteredVideos.length === 0 ? (
          <div className="empty-state">
            <div>🎬</div>
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить поисковый запрос или выбрать другую категорию.</p>
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
