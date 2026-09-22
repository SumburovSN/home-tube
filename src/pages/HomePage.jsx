import { useState } from 'react';

import { videos } from '../data/videos/index';
import { categories } from '../data/categories';
import {
  getCategoryAndDescendants,
} from '../data/categoryUtils';

import VideoCard from '../components/VideoCard';
import Sidebar from '../components/Sidebar';

function HomePage() {
  const [selectedCategory, setSelectedCategory] =
    useState('all');

  const selectedCategoryIds =
    selectedCategory === 'all'
      ? null
      : getCategoryAndDescendants(
          selectedCategory,
        );

  const filteredVideos =
    selectedCategoryIds === null
      ? videos
      : videos.filter((video) =>
          selectedCategoryIds.includes(
            video.categoryId,
          ),
        );

  const currentCategory =
    categories.find(
      (category) =>
        category.id === selectedCategory,
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

            <h3>
              Пока здесь нет видео
            </h3>

            <p>
              Добавь видео в эту категорию,
              и они появятся здесь.
            </p>
          </div>
        ) : (
          <div className="video-grid">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default HomePage;
