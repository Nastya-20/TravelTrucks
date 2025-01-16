import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCampers as fetchCampersApi, fetchReviewsByCamperId } from "../utils/api";

// Асинхронний thunk для отримання кемперів
export const fetchCampers = createAsyncThunk(
  "vehicles/fetchCampers",
  async (filters) => {
    const data = await fetchCampersApi(filters); // Викликає API функцію
    return data?.items || [];  
  }
);

// Асинхронний thunk для отримання деталей кемпера
export const fetchCamperDetails = createAsyncThunk(
  "vehicles/fetchById",
  async (id) => {
    const data = await fetchCampersApi({ id });  
    return data;
  }
);

// Асинхронний thunk для завантаження більше кемперів
export const loadMoreVehicles = createAsyncThunk(
  'vehicles/loadMoreVehicles',
  async (filters, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetchCampersApi(filters);  
      return response.items;  
    } catch (error) {
      return rejectWithValue(error?.message || "Unknown error occurred");  
    }
  }
);

export const fetchReviews = createAsyncThunk(
  "vehicles/fetchReviews",
  async (id) => {
    const data = await fetchReviewsByCamperId(id);
    return data; // Повертаємо отримані відгуки
  }
);


const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: {
    items: [],
    selected: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetVehicles: (state) => {
      state.items = [];
    },
    toggleFavorite(state, action) {
      const id = action.payload;
      const vehicle = state.items.find((v) => v.id === id);  
      if (vehicle) {
  vehicle.favorite = vehicle.favorite !== undefined ? !vehicle.favorite : true;
}
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
        state.status = "loading";
      })
      .addCase(fetchCamperDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload;
      })
      .addCase(fetchCamperDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    .addCase(fetchReviews.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchReviews.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (state.selected) {
  state.selected.reviews = action.payload;} // Додаємо відгуки до обраного кемпера
    })
    .addCase(fetchReviews.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetVehicles, toggleFavorite } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;

