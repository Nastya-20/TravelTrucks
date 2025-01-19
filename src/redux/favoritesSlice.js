import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const initialState = {
  favorites: loadFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const camperId = action.payload;
      if (!state.favorites.includes(camperId)) {
        state.favorites.push(camperId);
        saveFavoritesToLocalStorage(state.favorites);
      }
    },
    removeFavorite(state, action) {
      const camperId = action.payload;
      state.favorites = state.favorites.filter((id) => id !== camperId);
      saveFavoritesToLocalStorage(state.favorites);
    },
    resetFavorites(state) {
      state.favorites = [];
      saveFavoritesToLocalStorage(state.favorites);
    },
  },
});

export const { addFavorite, removeFavorite, resetFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
