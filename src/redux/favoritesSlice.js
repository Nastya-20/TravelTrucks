import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const loadFavoritesFromLocalStorage = () => {
  try {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
};

const saveFavoritesToLocalStorage = (favorites) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites:", error);
  }
};

const initialState = {
  favorites: loadFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const camper = action.payload; // Отримуємо об'єкт кемпера
      const isFavorite = state.favorites.some((fav) => fav.id === camper.id);

      if (isFavorite) {
        state.favorites = state.favorites.filter((fav) => fav.id !== camper.id);
        toast.info(`${camper.name} removed from favorites`, { autoClose: 2000 });
      } else {
        state.favorites.push(camper);
        toast.success(`${camper.name} added to favorites`, { autoClose: 2000 });
      }

      saveFavoritesToLocalStorage(state.favorites);
    },

    resetFavorites(state) {
      state.favorites = [];
      saveFavoritesToLocalStorage([]);
      toast.warn("Favorites list cleared", { autoClose: 2000 });
    },
  },
});

export const { toggleFavorite, resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

