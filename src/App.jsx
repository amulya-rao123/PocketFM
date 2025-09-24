import { Routes, Route } from "react-router-dom";
import { FavProvider } from './contexts/FavContext.jsx';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <FavProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/story/:id" element={<ProtectedRoute><StoryPage /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
        <Route path="*" element={<RegisterPage />} />
      </Routes>
    </FavProvider>
  );
}

export default App;
