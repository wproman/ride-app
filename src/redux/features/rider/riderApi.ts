// redux/features/admin/admin.api.ts
import { baseApi } from "@/redux/baseApi";

export const riderApi  = baseApi.injectEndpoints({
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

    // 🟡 Estimate Fare (Optional)
    estimateFare: builder.mutation({
      query: ({ pickup, destination }) => ({
        url: "/rides/estimate",
        method: "POST",
        data: { pickup, destination },
      }),
    }),
    }),
});

export const { useRequestRideMutation, useEstimateFareMutation } = riderApi;