import { categories } from './categories';


export function createVideoCatalog(
  ...collections
) {
  const allVideos = collections.flat().map(
    (video, index) => ({
      id: index + 1,
      ...video,
    }),
  );;

  return allVideos.sort(() => Math.random() - 0.5)
}

export function getRecommendations(
  video,
  videos,
) {
  // 1. Видео из той же категории
  const recommendations = videos.filter(
    (item) =>
      item.categoryId === video.categoryId // само видео должно быть тоже в списке, и это облегчает логику getNextVideo()
  );

  recommendations.sort(
    (item, item_next) =>
      item.id - item_next.id
    );

  // 2. Находим текущую категорию
  const currentCategory = categories.find(
    (category) =>
      category.id === video.categoryId,
  );

  if (!currentCategory?.parentId) {
    return recommendations;
  }

  // 3. Находим соседние категории
  const siblingCategoryIds = categories
    .filter(
      (category) =>
        category.parentId ===
          currentCategory.parentId &&
        category.id !== currentCategory.id,
    )
    .map((category) => category.id);

  // 4. Видео из соседних категорий
  const additionalCandidates = videos.filter(
    (item) =>
      siblingCategoryIds.includes(
        item.categoryId,
      ) &&
      item.id !== video.id,
  );

  // 5. Перемешиваем случайным образом
  const shuffled = [
    ...additionalCandidates,
  ].sort(() => Math.random() - 0.5);

  // 6. Добавляем максимум 10
  const recommendationAdditional =
    shuffled.slice(0, 10);

  return [
    ...recommendations,
    ...recommendationAdditional,
  ];
}

export function getNextVideo(
  video,
  recommendations,
) {  

  const currentIndex = recommendations.findIndex((item) => item.id === video.id);
  const nextVideoId = (currentIndex + 1) % recommendations.length;
  const nextVideo = recommendations.at(nextVideoId);

  return nextVideo;
}

export function filterVideos(title, videos,) {
  // Если массив пустой или не передан, сразу возвращаем пустой массив
  if (!videos) return []; 
  
  // Приводим поисковый запрос к нижнему регистру один раз
  const searchTitle = (title || '').toLowerCase(); 

  return videos.filter((item) => 
    item?.title?.toLowerCase().includes(searchTitle)
  );
}
