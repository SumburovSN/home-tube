import { Link } from 'react-router-dom';

function Header() {
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
        />

        <button>
          🔍
        </button>
      </div>

      <div className="header-spacer" />
    </header>
  );
}

export default Header;