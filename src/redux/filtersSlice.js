import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  location: "",
  equipment: {
    AC: false,
    Automatic: false,
    Kitchen: false,
    Petrol: false,
    TV: false,
    Bathroom: false,
    Microwave: false,
    Radio: false,
    Water: false,
    gas: false,
  Refrigerator: false,
  },
  vehicleType: {
    "Van": false,
    "FullyIntegrated": false,
    "Alcove": false,
  },
  filteredResults: [], // Зберігаємо відфільтровані результати
  loading: false,
  error: null,
};

// Асинхронний запит для отримання фільтрованих результатів
export const fetchFilteredResults = createAsyncThunk(
  "filters/fetchFilteredResults",
  async ({ location, equipment, vehicleType }) => {
    const params = {};

     if (location) {
      params.location = location;
    }
    // Формуємо параметр equipment у вигляді рядка
    const activeEquipment = Object.keys(equipment)
      .filter((key) => equipment[key]) // Фільтруємо активні фільтри

    if (activeEquipment.length > 0) {
      params.equipment = activeEquipment.join(','); // Додаємо до параметрів запиту
    }
    const activeVehicleType = Object.keys(vehicleType)
      .filter((key) => vehicleType[key]) // Фільтруємо активні фільтри

    if (activeVehicleType.length > 0) {
      params.equipment = activeVehicleType.join(','); // Додаємо до параметрів запиту
    }

    console.log('Requesting with parameters:', params);

    try {
      const response = await axios.get(
        "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
        {
          params, paramsSerializer: params => {
            return new URLSearchParams(params).toString()
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      return error.response?.data?.message || 'An error occurred';
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
    setFilteredResults(state, action) {
      state.filteredResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredResults.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchFilteredResults.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.filteredResults = action.payload;
      })
      .addCase(fetchFilteredResults.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setLocation, toggleEquipment, toggleVehicleType, resetFilters, setFilteredResults } =
  filtersSlice.actions;

export default filtersSlice.reducer;
