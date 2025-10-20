/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useApproveDriverMutation,
  useBlockUserMutation,
  useGetAllUsersQuery,
  useUnblockUserMutation
} from "@/redux/features/admin/adminApi";
import { useState } from "react";
import { toast } from "react-hot-toast";

const AdminUserManagement = () => {
    const [approvingDriverId, setApprovingDriverId] = useState<string | null>(null);
  const { data: users, isLoading, refetch } = useGetAllUsersQuery({});
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [approveDriver, { isLoading: isApproving }] = useApproveDriverMutation();

  const handleBlock = async (id: string) => {
    try {
      await blockUser(id).unwrap();
      toast.success("User blocked successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to block user");
    }
  };

  const handleUnblock = async (id: string) => {
    try {
      await unblockUser(id).unwrap();
      toast.success("User unblocked successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to unblock user");
    }
  };
 const handleApproveDriver = async (id: string, status: string) => {
    setApprovingDriverId(id);
    
    try {
      await approveDriver({ 
        driverId: id, 
        approvalStatus: status 
      }).unwrap();
      
      toast.success(`Driver ${status} successfully!`);
      refetch();
      
    } catch (error: any) {
      console.error("❌ Failed to update approval:", error);
      toast.error(error?.data?.message || "Approval failed. Please try again.");
    } finally {
      setApprovingDriverId(null);
    }
  };


  if (isLoading) return (
    <div className="p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role & Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.data?.map((user: any) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.phone || 'No phone'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-2">
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'driver' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.isVerified ? "Verified" : "Unverified"}
                      </span>
                     {user.role === "driver" && (
  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
    user.driver?.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' :
    user.driver?.approvalStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
    user.driver?.approvalStatus === 'rejected' ? 'bg-red-100 text-red-800' :
    'bg-gray-100 text-gray-800'
  }`}>
    {user.driver?.approvalStatus || 'Pending'}
  </span>
)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex flex-col space-y-2">
                    {/* Driver Approval Actions */}

                    {user.role === "driver" && (
  <div className="flex space-x-2">
    {user.driver?.approvalStatus !== 'approved' && (
      <button
        onClick={() => handleApproveDriver(user._id, "approved")}
        disabled={isApproving && approvingDriverId === user._id}
        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {(isApproving && approvingDriverId === user.driver?._id) ? "Approving..." : "Approve"}
      </button>
    )}
    {user.driver?.approvalStatus !== 'rejected' && user.driver?.approvalStatus !== 'approved' && (
      <button
        onClick={() => handleApproveDriver(user.driver?._id, "rejected")}
        disabled={isApproving && approvingDriverId === user.driver?._id}
        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
      >
        Reject
      </button>
    )}
    {user.driver?.approvalStatus === 'approved' && (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">
        Approved
      </span>
    )}
    {user.driver?.approvalStatus === 'rejected' && (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded">
        Rejected
      </span>
    )}
  </div>
)}
                   

                    {/* Block/Unblock Actions */}
                    <div className="flex space-x-2">
                      {!user.isBlocked ? (
                        <button
                          onClick={() => handleBlock(user._id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Block User
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnblock(user._id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          Unblock User
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {(!users?.data || users.data.length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;