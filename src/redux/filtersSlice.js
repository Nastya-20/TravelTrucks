import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  location: "",
  equipment: {
    AC: false,
    Automatic: false,
    Kitchen: false,
    TV: false,
    Bathroom: false,
  },
  vehicleType: {
    Van: false,
    FullyIntegrated: false,
    Alcove: false,
  },
  filteredResults: [], // Зберігаємо відфільтровані результати
  loading: false,
  error: null,
};

// Асинхронний запит для отримання фільтрованих результатів
export const fetchFilteredResults = createAsyncThunk(
  "filters/fetchFilteredResults",
  async ({ location, equipment, vehicleType }, { rejectWithValue }) => {
    try {
      const params = {
        location,
         equipment: Object.keys(equipment)
          .filter((key) =>equipment[key])
          .join(","), // Фільтруємо тільки активні критерії
        vehicleType: Object.keys(vehicleType)
          .filter((key) => vehicleType[key])
          .join(","),
      };
      const response = await axios.get("/api/campers", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    toggleEquipment(state, action) {
      const { type } = action.payload;
      state.equipment[type] = !state.equipment[type];
    },
    toggleVehicleType(state, action) {
      const { type } = action.payload;
      state.vehicleType[type] = !state.vehicleType[type];
    },
    resetFilters(state) {
  state.location = "";
  state.equipment = { ...initialState.equipment }; 
  state.vehicleType = { ...initialState.vehicleType };
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredResults.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredResults = action.payload;
      })
      .addCase(fetchFilteredResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLocation, toggleEquipment, toggleVehicleType, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
