import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';  


const initialState = {
  location: '',
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
  filteredResults: [],  // Для збереження результатів після фільтрації
  loading: false,
  error: null,
};

// Асинхронний запит для отримання фільтрованих результатів
export const fetchFilteredResults = createAsyncThunk(
  'filters/fetchFilteredResults',
  async ({ location, equipment, vehicleType }) => {
    try {
      const response = await axios.get('/api/campers', {
        params: {
          location,
          equipment: Object.keys(equipment).filter(key => equipment[key]).join(','),
          vehicleType: Object.keys(vehicleType).filter(key => vehicleType[key]).join(','),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const filtersSlice = createSlice({
  name: 'filters',
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
    setFilters(state, action) {
      const { location, equipment, vehicleType } = action.payload;
      state.location = location;
      state.equipment = equipment;
      state.vehicleType = vehicleType;
    },
    resetFilters(state) {
      state.location = '';
      state.equipment = {
        AC: false,
        Automatic: false,
        Kitchen: false,
        TV: false,
        Bathroom: false,
      };
      state.vehicleType = {
        Van: false,
        FullyIntegrated: false,
        Alcove: false,
      };
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

export const { setLocation, toggleEquipment, toggleVehicleType, setFilters, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;


