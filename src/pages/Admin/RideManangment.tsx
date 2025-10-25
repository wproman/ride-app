
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  useGetAllRidesQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/admin/rideApi";
import type { ApiRide, RideFilters, RideStatus } from "@/types/ride";
import React, { useState } from 'react';
import { toast } from "sonner";

const RideManagement: React.FC = () => {
  const [filters, setFilters] = useState<RideFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: ridesData, isLoading, refetch } = useGetAllRidesQuery(filters);
  const [updateRideStatus] = useUpdateRideStatusMutation();
  
  console.log("Ride Data Sample:", ridesData?.data?.[0]);
  console.log("Rider Data:", ridesData?.data?.[0]?.riderId);
  console.log("Ride Status:", ridesData?.data?.[0]?.status);

  const rides = ridesData?.data || [];
  const totalRides = ridesData?.total || 0;

  // Filter rides based on search term with proper null checks for API structure
  const filteredRides = rides.filter((ride: ApiRide) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const riderName = ride.riderId?.name?.toLowerCase() || '';
    const riderEmail = ride.riderId?.email?.toLowerCase() || '';
    const riderPhone = ride.riderId?.phone || '';
    const driverName = ride.driverId?.name?.toLowerCase() || '';
    const pickupAddress = ride.pickupLocation?.address?.toLowerCase() || '';
    const destinationAddress = ride.destination?.address?.toLowerCase() || '';

    return (
      riderName.includes(searchLower) ||
      riderEmail.includes(searchLower) ||
      riderPhone.includes(searchTerm) ||
      driverName.includes(searchLower) ||
      pickupAddress.includes(searchLower) ||
      destinationAddress.includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusUpdate = async (rideId: string, newStatus: RideStatus) => {
    try {
      await updateRideStatus({ rideId, status: newStatus }).unwrap();
      toast.success(`Ride status updated to ${newStatus}`);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update ride status");
    }
  };

  const handleFilterChange = (key: keyof RideFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const getStatusVariant = (status: RideStatus | undefined) => {
    const variants = {
      pending: "secondary",
      accepted: "default",
      in_progress: "default",
      completed: "default",
      cancelled: "destructive",
      rejected: "destructive",
    };
    return variants[status as keyof typeof variants] as "default" | "secondary" | "destructive" | "outline" | null | undefined || "outline";
  };

  const getPaymentStatusVariant = (status: string | undefined) => {
    const variants = {
      pending: "secondary",
      paid: "default",
      failed: "destructive",
    };
    return variants[status as keyof typeof variants] as "default" | "secondary" | "destructive" | "outline" | null | undefined || "outline";
  };

  const formatStatus = (status: RideStatus | undefined) => {
    if (!status) return 'UNKNOWN';
    return status.replace(/_/g, ' ').toUpperCase();
  };

  // Safe value getter with fallbacks
  const getSafeValue = (value: any, fallback: string = 'N/A') => {
    if (value === null || value === undefined) return fallback;
    return value;
  };

  const getSafeNumber = (value: any, fallback: number = 0) => {
    if (value === null || value === undefined) return fallback;
    return Number(value);
  };

  if (isLoading) {
    return (
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
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Ride Management</h1>
          <p className="text-sm text-muted-foreground">
            Total Rides: <span className="font-semibold">{totalRides}</span>
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Search and filter rides based on various criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="grid gap-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search rides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={filters.status || "all"}
                onValueChange={(value) => handleFilterChange('status', value === "all" ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date From */}
            <div className="grid gap-2">
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </div>

            {/* Date To */}
            <div className="grid gap-2">
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </div>

            {/* Payment Method */}
            <div className="grid gap-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={filters.paymentMethod || "all"}
                onValueChange={(value) => handleFilterChange('paymentMethod', value === "all" ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="mobile_wallet">Mobile Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Payment Status */}
            <div className="grid gap-2">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select
                value={filters.paymentStatus || "all"}
                onValueChange={(value) => handleFilterChange('paymentStatus', value === "all" ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fare Range */}
            <div className="grid gap-2">
              <Label>Fare Range</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minFare || ''}
                  onChange={(e) => handleFilterChange('minFare', e.target.value ? Number(e.target.value) : undefined)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxFare || ''}
                  onChange={(e) => handleFilterChange('maxFare', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center">
            <Button
              onClick={clearFilters}
              variant="outline"
              size="sm"
            >
              Clear All Filters
            </Button>
            <div className="text-sm text-muted-foreground">
              Showing {filteredRides.length} of {totalRides} rides
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rides Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rides</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ride Details</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Fare & Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRides.map((ride: ApiRide) => (
                <TableRow key={ride._id}>
                  {/* Ride Details */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">From: {getSafeValue(ride.pickupLocation?.address)}</div>
                      <div className="font-medium">To: {getSafeValue(ride.destination?.address)}</div>
                      <div className="text-xs text-muted-foreground">
                        Distance: {getSafeNumber(ride.distance)} km
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Requested: {ride.requestedAt ? new Date(ride.requestedAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </TableCell>

                  {/* Users */}
                  <TableCell>
                    <div className="space-y-2">
                      <div>
                        <div className="font-medium">Rider: {getSafeValue(ride.riderId?.name)}</div>
                        <div className="text-xs text-muted-foreground">{getSafeValue(ride.riderId?.phone)}</div>
                      </div>
                      {ride.driverId ? (
                        <div>
                          <div className="font-medium">Driver: {getSafeValue(ride.driverId?.name)}</div>
                          <div className="text-xs text-muted-foreground">
                            {getSafeValue(ride.driverId?.vehicleInfo?.model)} - {getSafeValue(ride.driverId?.vehicleInfo?.plate)}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground italic">No driver assigned</div>
                      )}
                    </div>
                  </TableCell>

                  {/* Fare & Payment */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-semibold text-lg">${getSafeNumber(ride.fare).toFixed(2)}</div>
                      <div className="text-sm">
                        Method: {getSafeValue(ride.paymentMethod)}
                      </div>
                      <Badge variant={getPaymentStatusVariant(ride.paymentStatus)}>
                        {getSafeValue(ride.paymentStatus).toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge variant={getStatusVariant(ride.status)}>
                      {formatStatus(ride.status)}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex flex-col space-y-2 items-end">
                      <Button
                        onClick={() => handleStatusUpdate(ride._id, 'completed')}
                        disabled={ride.status === 'completed'}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        Mark Complete
                      </Button>
                      <Button
                        onClick={() => handleStatusUpdate(ride._id, 'cancelled')}
                        disabled={ride.status === 'cancelled' || ride.status === 'completed'}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        Cancel Ride
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Empty State */}
          {paginatedRides.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No rides found matching your criteria</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RideManagement;