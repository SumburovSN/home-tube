import { useState } from 'react';
import { categories } from '../data/categories';

function Sidebar({
  selectedCategory,
  onCategoryChange,
}) {
  const [expandedCategories, setExpandedCategories] =
    useState(new Set());

  const getChildren = (parentId) => {
    return categories.filter(
      (category) =>
        category.parentId === parentId,
    );
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories((current) => {
      const next = new Set(current);

      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }

      return next;
    });
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category.id);

    const children = getChildren(category.id);

    if (children.length > 0) {
      toggleCategory(category.id);
    }
  };

  const renderCategory = (category, level = 0) => {
    const children = getChildren(category.id);
    const hasChildren = children.length > 0;
    const isExpanded =
      expandedCategories.has(category.id);

    return (
      <div key={category.id}>
        <button
          className={`menu-item ${
            selectedCategory === category.id
              ? 'active'
              : ''
          } level-${level}`}
          onClick={() =>
            handleCategoryClick(category)
          }
        >
          <span className="menu-icon">
            {category.icon}
          </span>

          <span className="menu-label">
            {category.title}
          </span>

          {hasChildren && (
            <span className="menu-arrow">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
        </button>

        {hasChildren && isExpanded && (
          <div className="submenu">
            {children.map((child) =>
              renderCategory(
                child,
                level + 1,
              ),
            )}
          </div>
        )}
      </div>
    );
  };

  const mainCategory = categories.find(
    (category) => category.id === 'all',
  );

  const topLevelCategories = categories.filter(
    (category) =>
      category.parentId === null &&
      category.id !== 'all',
  );

  const cartoons = topLevelCategories.filter(
    (category) => category.type === 'cartoon',
  );

  const movies = topLevelCategories.filter(
    (category) => category.type === 'movie',
  );

  const music = topLevelCategories.filter(
    (category) => category.type === 'music',
  );

  return (
    <aside className="sidebar">
      <nav>
        {mainCategory &&
          renderCategory(mainCategory)}

        {cartoons.length > 0 && (
          <>
            <div className="menu-title">
              МУЛЬТИКИ
            </div>

            {cartoons.map((category) =>
              renderCategory(category),
            )}
          </>
        )}

        {movies.length > 0 && (
          <>
            <div className="menu-title">
              КИНО
            </div>

            {movies.map((category) =>
              renderCategory(category),
            )}
          </>
        )}

        {music.length > 0 && (
          <>
            <div className="menu-title">
              МУЗЫКА
            </div>

            {music.map((category) =>
              renderCategory(category),
            )}
          </>
        )}

        <div className="menu-title">
          МОЁ
        </div>

        <button className="menu-item">
          <span className="menu-icon">
            ❤️
          </span>

          <span className="menu-label">
            Избранное
          </span>
        </button>

        <button className="menu-item">
          <span className="menu-icon">
            🕘
          </span>

          <span className="menu-label">
            История
          </span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
