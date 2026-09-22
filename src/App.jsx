import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Header />

        <div className="layout">

          <Routes>

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/watch/:id"
              element={<WatchPage />}
            />

          </Routes>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;