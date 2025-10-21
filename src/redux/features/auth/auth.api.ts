/* eslint-disable @typescript-eslint/no-unused-vars */
// redux/features/auth/auth.api.ts
import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      // This will automatically set credentials on successful login
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data) {
            dispatch(setCredentials({ user: data.data.user }));
          }
        } catch (error) {
          // Handle error if needed
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          // Even if API call fails, logout locally
          dispatch(logout());
        }
      },
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        data: userInfo,
      }),
      async onQueryStarted( _arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data) {
            dispatch(setCredentials({ user: data.data.user }));
          }
        } catch (error) {
          // Handle error if needed
        }
      },
    }),
    // userInfo: builder.query({
    //   query: () => ({
    //     url: "/user/me",
    //     method: "GET",
    //   }),
    //   providesTags: ["USER"],
    //   async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       if (data.success && data.data) {
    //         dispatch(setCredentials({ user: data.data }));
    //       }
    //     } catch (error) {
    //       // Handle error if needed
    //     }
    //   },
    // }),
    // Change Password
    changePassword: builder.mutation({
      query: (passwordData: { oldPassword: string; newPassword: string }) => ({
        url: "/auth/reset-password", 
        method: "PATCH",
        data: passwordData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useChangePasswordMutation,
  // useUserInfoQuery,
  useLogoutMutation,

} = authApi;

// Import and export the auth actions
import { logout, setCredentials, setDriverStatus } from "@/redux/features/auth/authSlice";
export { logout, setCredentials, setDriverStatus };

