import { categories } from './categories';

/**
 * Возвращает ID выбранной категории
 * и всех её дочерних категорий.
 *
 * Например:
 *
 * pushkin
 * → ['pushkin']
 *
 * cartoon-fairy-tales
 * → ['cartoon-fairy-tales', 'pushkin', 'chukovsky']
 *
 * cartoons
 * → все категории внутри Мультики
 */
export function getCategoryAndDescendants(
  categoryId,
) {
  const result = [categoryId];

  const children = categories.filter(
    (category) =>
      category.parentId === categoryId,
  );

  for (const child of children) {
    result.push(
      ...getCategoryAndDescendants(child.id),
    );
  }

  return result;
}
