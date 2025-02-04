import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import AnimeDetailPage from "./pages/AnimeDetailPage";
import WatchlistPage from "./pages/WatchlistPage";
// src/App.jsx

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/genre/:name" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="anime/:id" element={<AnimeDetailPage />} />
          <Route path="watchlist" element={<WatchlistPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App
