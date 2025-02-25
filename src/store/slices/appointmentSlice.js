import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { appointmentAPI } from '../../services/api';

const initialState = {
  appointments: [],
  selectedSlot: null,
  loading: false,
  error: null
};

// Async thunks
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch appointments');
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.create(appointmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create appointment');
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedSlot } = appointmentSlice.actions;

export default appointmentSlice.reducer;