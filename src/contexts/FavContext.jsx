import React, { createContext, useState, useEffect } from 'react';

const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = story => {
    setFavorites(prev => prev.some(s => s.id === story.id) ? prev : [...prev, story]);
  };

  const removeFavorite = id => {
    setFavorites(prev => prev.filter(s => s.id !== id));
  };

  return (
    <FavContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavContext.Provider>
  );
};

export default FavContext;
