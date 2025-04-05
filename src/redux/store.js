import { configureStore } from "@reduxjs/toolkit";
import vehiclesReducer from "./vehiclesSlice"; 
import filtersReducer from "./filtersSlice";
import favoritesReducer from "./favoritesSlice";


const preloadedState = {
  favorites: {
    favorites: (() => {
      const storedFavorites = localStorage.getItem("favorites");
      return storedFavorites && storedFavorites !== "undefined"
        ? JSON.parse(storedFavorites)
        : [];
    })(),
  },
};


export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer, 
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
});


