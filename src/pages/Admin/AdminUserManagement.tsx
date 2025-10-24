/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useApproveDriverMutation,
  useBlockUserMutation,
  useGetAllUsersQuery,
  useUnblockUserMutation
} from "@/redux/features/admin/adminApi";
import { useState } from "react";
import { toast } from "sonner";

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
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Management</CardTitle>
          <CardDescription>
            Manage user accounts, permissions, and driver approvals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Info</TableHead>
                <TableHead>Role & Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.data?.map((user: any) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.phone || 'No phone'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={
                          user.role === 'admin' ? 'default' :
                          user.role === 'driver' ? 'secondary' : 'outline'
                        }>
                          {user.role}
                        </Badge>
                        <Badge variant={user.isBlocked ? "destructive" : "default"}>
                          {user.isBlocked ? "Blocked" : "Active"}
                        </Badge>
                        <Badge variant={user.isVerified ? "default" : "secondary"}>
                          {user.isVerified ? "Verified" : "Unverified"}
                        </Badge>
                        {user.role === "driver" && (
                          <Badge variant={
                            user.driver?.approvalStatus === 'approved' ? 'default' :
                            user.driver?.approvalStatus === 'pending' ? 'secondary' :
                            user.driver?.approvalStatus === 'rejected' ? 'destructive' : 'outline'
                          }>
                            {user.driver?.approvalStatus || 'Pending'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col space-y-2 items-end">
                      {/* Driver Approval Actions */}
                      {user.role === "driver" && (
                        <div className="flex space-x-2">
                          {user.driver?.approvalStatus !== 'approved' && (
                            <Button
                              onClick={() => handleApproveDriver(user._id, "approved")}
                              disabled={isApproving && approvingDriverId === user._id}
                              size="sm"
                              variant="default"
                            >
                              {(isApproving && approvingDriverId === user.driver?._id) ? "Approving..." : "Approve"}
                            </Button>
                          )}
                          {user.driver?.approvalStatus !== 'rejected' && user.driver?.approvalStatus !== 'approved' && (
                            <Button
                              onClick={() => handleApproveDriver(user.driver?._id, "rejected")}
                              disabled={isApproving && approvingDriverId === user.driver?._id}
                              size="sm"
                              variant="destructive"
                            >
                              Reject
                            </Button>
                          )}
                          {user.driver?.approvalStatus === 'approved' && (
                            <Badge variant="default" className="px-3 py-1">
                              Approved
                            </Badge>
                          )}
                          {user.driver?.approvalStatus === 'rejected' && (
                            <Badge variant="destructive" className="px-3 py-1">
                              Rejected
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Block/Unblock Actions */}
                      <div className="flex space-x-2">
                        {!user.isBlocked ? (
                          <Button
                            onClick={() => handleBlock(user._id)}
                            size="sm"
                            variant="destructive"
                          >
                            Block User
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleUnblock(user._id)}
                            size="sm"
                            variant="secondary"
                          >
                            Unblock User
                          </Button>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {(!users?.data || users.data.length === 0) && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserManagement;