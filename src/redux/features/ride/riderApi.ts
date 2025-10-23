import { baseApi } from "@/redux/baseApi";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  Create Ride Request
    requestRide: builder.mutation({
      query: (rideData) => ({
        url: "/rides/request",
        method: "POST",
        data: rideData,
      }),
      invalidatesTags: ["RIDE"],
    }),

    //  Estimate Fare
    estimateFare: builder.mutation({
      query: ({ pickup, destination }) => ({
        url: "/rides/estimate",
        method: "POST",
        data: { pickup, destination },
      }),
    }),

   // Get Ride Details - FIXED
    getRideDetails: builder.query({
      query: (rideId: string) => ({
        url: `/rides/${rideId}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),
      //  Get My Ride History (for both rider and driver)
    getMyRideHistory: builder.query({
      query: () => ({
        url: "/rides/my-rides/history",
        method: "GET",
      }),
      providesTags: ["RIDE_HISTORY"],
    }),

    // Get My Current Ride (for both rider and driver)
    getMyCurrentRide: builder.query({
      query: () => ({
        url: "/rides/my-rides/current",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

  cancelRide: builder.mutation({
  query: ({ rideId, reason }: { rideId: string; reason?: string }) => ({
    url: `rides/${rideId}/cancel`,
    method: 'PATCH',
    body: { reason }, // Send reason in request body
  }),
  invalidatesTags: ['RIDE', 'ACTIVE-RIDE'],
}),
 // Update Ride Status (ADDED)
    updateRideStatus: builder.mutation({
      query: ({ rideId, status }: { rideId: string; status: string }) => ({
        url: `/rides/${rideId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['RIDE', 'ACTIVE-RIDE'],
    }),
  }),
});

export const { 
  useRequestRideMutation, 
  useEstimateFareMutation, 
  useGetRideDetailsQuery,
  useGetMyRideHistoryQuery,
  useGetMyCurrentRideQuery,
  useCancelRideMutation,
    useUpdateRideStatusMutation
  
} = riderApi;