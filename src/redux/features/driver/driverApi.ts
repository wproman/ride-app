// src/redux/features/driver/driverApi.ts
import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

// Add this if you create the status endpoint
    getDriverStatus: builder.query({
      query: () => ({
        url: "/driver/status",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

    // Update Driver Availability (Online/Offline)
    updateAvailability: builder.mutation({
      query: (onlineStatus: boolean) => ({
        url: "/driver/availability",
        method: "PATCH",
        data: { onlineStatus }, // This should match your Postman format
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // Get current driver status (optional - if you want to fetch initial status)
    getDriverProfile: builder.query({
      query: () => ({
        url: "/driver/profile", // You might need to create this endpoint
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),
     // Get Earnings History
    getEarningsHistory: builder.query({
      query: () => ({
        url: "/driver/earnings",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

   
  }),
});

export const { 
  useUpdateAvailabilityMutation,
  useGetDriverProfileQuery,
  useGetDriverStatusQuery,
  useGetEarningsHistoryQuery
} = driverApi;