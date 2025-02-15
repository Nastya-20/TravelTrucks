import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCampersApi, fetchCamperById, fetchReviewsByCamperId } from "../utils/api";

// Асинхронний thunk для отримання кемперів
export const fetchCampers = createAsyncThunk(
  "vehicles/fetchCampers",
  async (filters) => {
    const data = await fetchCampersApi(filters); // Викликає API функцію
    console.log(filters);
    console.log("Camper details:", data);
    return data?.items || [];  
  }
);

// Асинхронний thunk для отримання деталей кемпера
export const fetchCamperDetails = createAsyncThunk(
  "vehicles/fetchById",
  async (id) => {
    const data = await fetchCamperById(id); 
    console.log("Camper details:", data);
    return data;
  }
);

export const fetchReviews = createAsyncThunk(
  "vehicles/fetchReviews",
  async (id, thunkAPI) => {
    try {
      const data = await fetchReviewsByCamperId(id);
      return data; // Повертаємо відгуки
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
      return thunkAPI.rejectWithValue(error.message); // Повертаємо помилку
    }
  }
);


const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: {
    items: [],
    selected: null,
    camperDetails: null,
    camperDetailsStatus: "idle",
    reviews: "idle",
    loadMoreStatus: "idle",
    error: null,
    favorites: [],
  },
  reducers: {
    setSelectedCamper: (state, action) => {
      state.selected = action.payload.camper; // Присвоєння кемпера
      state.reviews = action.payload.reviews; // Присвоєння відгуків
    },
    resetVehicles: (state) => {
      state.items = [];
      state.selected = null;
    },
   toggleFavorite(state, action) {
      const id = action.payload;
      const isFavorite = state.selected.includes(id);
      if (isFavorite) {
        state.selected = state.selected.filter((vehicleId) => vehicleId !== id);
      } else {
        state.selected.push(id);
      }
    },
    clearVehicles(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Отримання всіх кемперів
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Отримання деталей кемпера
      .addCase(fetchCamperDetails.pending, (state) => {
        state.camperDetailsStatus = "loading";
      })
      .addCase(fetchCamperDetails.fulfilled, (state, action) => {
        state.camperDetailsStatus = "succeeded";
        state.selected = action.payload;
      })
      .addCase(fetchCamperDetails.rejected, (state, action) => {
        state.camperDetailsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.reviews = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = "succeeded";
        if (state.selected) {
          state.selected.reviews = action.payload;
          console.log("Saved reviews in state:", action.payload);
        } // Додаємо відгуки до обраного кемпера
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.reviews = "failed";
        state.error = action.error.message;
      });
     },
});

export const { resetVehicles, toggleFavorite, setSelectedCamper, clearVehicles } =
  vehiclesSlice.actions;
export default vehiclesSlice.reducer;

