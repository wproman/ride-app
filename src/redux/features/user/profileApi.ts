// src/redux/features/profile/profileApi.ts
import { baseApi } from "@/redux/baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get User Profile
    getProfile: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["PROFILE"],
    }),

    // Update Profile (name, phone)
    updateProfile: builder.mutation({
      query: (profileData: { name?: string; phone?: string }) => ({
        url: "/user/profile/:id", 
        method: "PATCH",
        data: profileData,
      }),
      invalidatesTags: ["PROFILE"],
    }),

  
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
//   useChangePasswordMutation,
} = profileApi;