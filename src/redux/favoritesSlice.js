import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

const initialState = {
  items: loadFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const camper = action.payload;
      const isAlreadyFavorite = state.items.some((item) => item.id === camper.id);
      if (!isAlreadyFavorite) {
        state.items.push(camper);
        localStorage.setItem("favorites", JSON.stringify(state.items)); // Save to localStorage
      }
    },
    removeFavorite: (state, action) => {
      const camperId = action.payload;
      state.items = state.items.filter((item) => item.id !== camperId);
      localStorage.setItem("favorites", JSON.stringify(state.items)); // Save to localStorage
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem("favorites"); // Remove from localStorage
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
