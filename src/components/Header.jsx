import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Перенаправляем на главную страницу и добавляем query-параметр ?search=...
    // trim() уберет случайные пробелы по краям
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/'); // Если инпут пустой — просто сбрасываем поиск
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <span className="logo-icon">▶</span>
        <span>HomeTube</span>
      </Link>

      <div className="search">
        <input
          type="text"
          placeholder="Найти мультик или фильм..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSearch}>
          🔍
        </button>
      </div>

      <div className="header-spacer" />
    </header>
  );
}

export default Header;


// import { Link } from 'react-router-dom';

// function Header() {
//   return (
//     <header className="header">
//       <Link to="/" className="logo">
//         <span className="logo-icon">▶</span>
//         <span>HomeTube</span>
//       </Link>

//       <div className="search">
//         <input
//           type="text"
//           placeholder="Найти мультик или фильм..."
//         />

//         <button>
//           🔍
//         </button>
//       </div>

//       <div className="header-spacer" />
//     </header>
//   );
// }

// export default Header;