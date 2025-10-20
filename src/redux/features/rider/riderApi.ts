import { baseApi } from "@/redux/baseApi";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🟢 Create Ride Request
    requestRide: builder.mutation({
      query: (rideData) => ({
        url: "/rides/request",
        method: "POST",
        data: rideData,
      }),
      invalidatesTags: ["RIDE"],
    }),

    // 🟡 Estimate Fare
    estimateFare: builder.mutation({
      query: ({ pickup, destination }) => ({
        url: "/rides/estimate",
        method: "POST",
        data: { pickup, destination },
      }),
    }),

   // 🟡 Get Ride Details - FIXED
    getRideDetails: builder.query({
      query: (rideId: string) => ({
        url: `/rides/${rideId}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),
  }),
});

export const { 
  useRequestRideMutation, 
  useEstimateFareMutation, 
  useGetRideDetailsQuery 
} = riderApi;