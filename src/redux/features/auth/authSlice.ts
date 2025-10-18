// import { RootState } from "@/redux/store";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// export interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   role: "rider" | "driver" | "admin";
//   status: "active" | "blocked" | "suspended" | "offline";
//   token?: string;
// }

// interface AuthState {
//   user: IUser | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: true, // helps when checking persisted login
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<IUser>) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       state.isLoading = false;
//     },
//     clearUser: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.isLoading = false;
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload;
//     },
//   },
// });

// export const { setUser, clearUser, setLoading } = authSlice.actions;

// // ✅ Selectors
// export const selectCurrentUser = (state: RootState) => state.auth.user;
// export const selectIsAuthenticated = (state: RootState) =>
//   state.auth.isAuthenticated;
// export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

// export default authSlice.reducer;
