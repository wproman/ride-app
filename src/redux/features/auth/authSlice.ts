// store/slices/authSlice.ts
import { AuthState, DriverStatus, User } from '@/types/auth.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';



const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setDriverStatus: (state, action: PayloadAction<DriverStatus>) => {
      if (state.user && state.user.role === 'driver') {
        state.user.driverStatus = action.payload;
      }
    },
  },
});

export const { setCredentials, logout, updateUser, setDriverStatus } = authSlice.actions;
export default authSlice.reducer;