import { configureStore } from "@reduxjs/toolkit";
import vehiclesReducer from "./vehiclesSlice"; 
import filtersReducer from "./filtersSlice";
import favoritesReducer from "./favoritesSlice";


const preloadedState = {
  favorites: { favorites: JSON.parse(localStorage.getItem("favorites")) || [] },
};

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer, 
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
});


