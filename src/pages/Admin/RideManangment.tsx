/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/admin/RideManagement.tsx
import {
  useGetAllRidesQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/admin/rideApi";
import type { ApiRide, RideFilters, RideStatus } from "@/types/ride";
import React, { useState } from 'react';
import { toast } from "react-hot-toast";



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

  const getStatusBadgeColor = (status: RideStatus | undefined) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      rejected: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusBadgeColor = (status: string | undefined) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Ride Management</h1>
        <div className="text-sm text-gray-500">
          Total Rides: <span className="font-semibold">{totalRides}</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search rides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={filters.dateTo || ''}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              value={filters.paymentMethod || ''}
              onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Methods</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="mobile_wallet">Mobile Wallet</option>
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Status
            </label>
            <select
              value={filters.paymentStatus || ''}
              onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Fare Range */}
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Fare
              </label>
              <input
                type="number"
                placeholder="Min"
                value={filters.minFare || ''}
                onChange={(e) => handleFilterChange('minFare', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Fare
              </label>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxFare || ''}
                onChange={(e) => handleFilterChange('maxFare', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear All Filters
          </button>
          <div className="text-sm text-gray-500">
            Showing {filteredRides.length} of {totalRides} rides
          </div>
        </div>
      </div>

      {/* Rides Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ride Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fare & Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedRides.map((ride: ApiRide) => (
                <tr key={ride._id} className="hover:bg-gray-50">
                  {/* Ride Details */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="font-medium">From:</span> {getSafeValue(ride.pickupLocation?.address)}
                      </div>
                      <div>
                        <span className="font-medium">To:</span> {getSafeValue(ride.destination?.address)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Distance: {getSafeNumber(ride.distance)} km
                      </div>
                      <div className="text-xs text-gray-500">
                        Requested: {ride.requestedAt ? new Date(ride.requestedAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </td>

                  {/* Users */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm space-y-2">
                      <div>
                        <span className="font-medium">Rider:</span> {getSafeValue(ride.riderId?.name)}
                      </div>
                      <div className="text-xs text-gray-500">{getSafeValue(ride.riderId?.phone)}</div>
                      {ride.driverId ? (
                        <>
                          <div>
                            <span className="font-medium">Driver:</span> {getSafeValue(ride.driverId?.name)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getSafeValue(ride.driverId?.vehicleInfo?.model)} - {getSafeValue(ride.driverId?.vehicleInfo?.plate)}
                          </div>
                        </>
                      ) : (
                        <div className="text-xs text-gray-500 italic">No driver assigned</div>
                      )}
                    </div>
                  </td>

                  {/* Fare & Payment */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm space-y-1">
                      <div className="font-semibold text-lg">${getSafeNumber(ride.fare).toFixed(2)}</div>
                      <div className="text-xs">
                        <span className="font-medium">Method:</span> {getSafeValue(ride.paymentMethod)}
                      </div>
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusBadgeColor(ride.paymentStatus)}`}>
                          {getSafeValue(ride.paymentStatus).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(ride.status)}`}>
                      {formatStatus(ride.status)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleStatusUpdate(ride._id, 'completed')}
                        disabled={ride.status === 'completed'}
                        className="text-green-600 hover:text-green-900 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                      >
                        Mark Complete
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(ride._id, 'cancelled')}
                        disabled={ride.status === 'cancelled' || ride.status === 'completed'}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                      >
                        Cancel Ride
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 text-left">
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {paginatedRides.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No rides found matching your criteria</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideManagement;