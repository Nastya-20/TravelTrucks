import { configureStore } from "@reduxjs/toolkit";
import vehiclesReducer from "./vehiclesSlice"; 
import filtersReducer from "./filtersSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer, 
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});


