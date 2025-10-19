/* eslint-disable @typescript-eslint/no-explicit-any */
// redux/features/admin/ride.api.ts
import { baseApi } from "@/redux/baseApi";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all rides with filtering
    getAllRides: builder.query({
      query: (filters?: any) => ({
        url: "/rides/all-rides",
        method: "GET",
        params: filters,
      }),
      providesTags: ["RIDE"],
    }),

    // Get ride by ID
    getRideById: builder.query({
      query: (rideId: string) => ({
        url: `/ride/${rideId}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    // Update ride status
    updateRideStatus: builder.mutation({
      query: ({ rideId, status }: { rideId: string; status: string }) => ({
        url: `/ride/${rideId}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["RIDE"],
    }),

    // Get ride statistics
    getRideStats: builder.query({
      query: (filters?: any) => ({
        url: "/ride/stats",
        method: "GET",
        params: filters,
      }),
    }),
  }),
});

export const {
  useGetAllRidesQuery,
  useGetRideByIdQuery,
  useUpdateRideStatusMutation,
  useGetRideStatsQuery,
} = rideApi;