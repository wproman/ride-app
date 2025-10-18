// redux/features/admin/admin.api.ts
import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🟢 Get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "/user/all-user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // 🚫 Block user
    blockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/user/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    // ✅ Unblock user
    unblockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/user/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    // 🟢 Approve driver - FIXED ENDPOINT
    approveDriver: builder.mutation({
      query: ({ driverId, approvalStatus }: { driverId: string; approvalStatus: string }) => ({
        url: `/driver/approved/${driverId}`, // Driver ID in URL params
        method: "PATCH",
        data: { approvalStatus }, // Status in request body
      }),
      invalidatesTags: ["USER"],
    }),

  }),
});

export const {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useApproveDriverMutation,
} = adminApi;