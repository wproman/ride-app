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
      query: ({ userId, profileData }: { userId: string; profileData: { name?: string; phone?: string } }) => ({
        url: `/user/profile/${userId}`, 
        method: "PATCH",
        data: profileData,
      }),
      invalidatesTags: ["PROFILE"],
    }),
updateEmergencyContacts: builder.mutation({
  query: (contactsData) => ({
    url: '/user/emergency-contacts',
    method: 'PATCH',
    body: contactsData,
  }),
  invalidatesTags: ['PROFILE'],
}),

  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateEmergencyContactsMutation
} = profileApi;