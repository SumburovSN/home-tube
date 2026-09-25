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

// export function createVideoCatalog(
//   ...collections
// ) {
//   const allVideos = collections.flat();

//   return allVideos.map(
//     (video, index) => ({
//       id: index + 1,
//       ...video,
//     }),
//   );
// }

export function getRecommendations(
  video,
  videos,
) {
  // 1. Видео из той же категории
  const recommendations = videos.filter(
    (item) =>
      item.categoryId === video.categoryId &&
      item.id !== video.id,
  );

  // Если уже достаточно рекомендаций
  if (recommendations.length >= 10) {
    return recommendations.slice(0, 10);
  }

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

  // 6. Добавляем максимум 5
  const recommendationAdditional =
    shuffled.slice(0, 5);

  return [
    ...recommendations.slice(0, 10),
    ...recommendationAdditional,
  ];
}