/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/driver/DriverDashboard.tsx
import {
    useGetDriverStatusQuery,
    useUpdateAvailabilityMutation
} from '@/redux/features/driver/driverApi';
import OfflineNotice from './OfflineNOtice';

const DriverDashboard = () => {
  const [updateAvailability, { isLoading: isUpdating }] = useUpdateAvailabilityMutation();
  const { 
    data: statusResponse, 
    isLoading: isLoadingStatus, 
    error: statusError,
    refetch 
  } = useGetDriverStatusQuery(undefined);

  const handleToggleAvailability = async (newStatus: boolean) => {
    try {
      await updateAvailability(newStatus).unwrap();
      // The invalidatesTags will automatically refetch the status
    } catch (error: any) {
      console.error('Failed to update availability:', error);
      if (error?.data?.message) {
        alert(`Error: ${error.data.message}`);
      } else {
        alert('Failed to update availability. Please try again.');
      }
    }
  };

  if (isLoadingStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading driver status...</p>
        </div>
      </div>
    );
  }

  if (statusError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Failed to load driver status</p>
          <button 
            onClick={() => refetch()}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const isOnline = statusResponse?.data?.onlineStatus || false;
  const approvalStatus = statusResponse?.data?.approvalStatus;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Approval Status Banner */}
        {approvalStatus !== 'approved' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <span className="text-yellow-400 text-xl mr-3">⚠️</span>
              <div>
                <h3 className="font-medium text-yellow-800">
                  Account {approvalStatus === 'pending' ? 'Pending Approval' : 'Suspended'}
                </h3>
                <p className="text-yellow-700 text-sm mt-1">
                  {approvalStatus === 'pending' 
                    ? 'Your driver account is pending approval. You cannot go online until approved.'
                    : 'Your driver account has been suspended. Please contact support.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Online/Offline Toggle Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Driver Availability</h2>
              <p className="text-gray-600 mt-1">
                {isOnline 
                  ? "✅ You're online and receiving ride requests" 
                  : "❌ You're offline and won't receive ride requests"
                }
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>Status: <strong className={isOnline ? 'text-green-600' : 'text-red-600'}>
                  {isOnline ? 'Online' : 'Offline'}
                </strong></span>
                <span>Approval: <strong className={
                  approvalStatus === 'approved' ? 'text-green-600' : 
                  approvalStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                }>
                  {approvalStatus}
                </strong></span>
              </div>
            </div>
            
            {/* Toggle Switch - Only enabled if approved */}
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <button
                onClick={() => handleToggleAvailability(!isOnline)}
                disabled={isUpdating || approvalStatus !== 'approved'}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${isOnline ? 'bg-green-500' : 'bg-gray-300'}
                  ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
                  ${approvalStatus !== 'approved' ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                title={approvalStatus !== 'approved' ? 'Account not approved' : ''}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${isOnline ? 'translate-x-6' : 'translate-x-1'}
                    ${isUpdating ? 'animate-pulse' : ''}
                  `}
                />
              </button>
            </div>
          </div>

          {/* Stats when online */}
          {isOnline && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Current Session</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">0</p>
                  <p className="text-sm text-green-800">Active Rides</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">0</p>
                  <p className="text-sm text-green-800">Today's Earnings</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">4.8</p>
                  <p className="text-sm text-green-800">Your Rating</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Show Offline Notice when offline AND approved */}
        {!isOnline && approvalStatus === 'approved' && (
          <OfflineNotice 
            onGoOnline={() => handleToggleAvailability(true)}
            isLoading={isUpdating}
          />
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleToggleAvailability(!isOnline)}
              disabled={isUpdating || approvalStatus !== 'approved'}
              className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                isOnline 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
            >
              <span className="mr-2">{isOnline ? '🔴' : '🟢'}</span>
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
            
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center transition-colors">
              <span className="mr-2">💰</span>
              View Earnings
            </button>
            
            <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium flex items-center transition-colors">
              <span className="mr-2">📊</span>
              Ride History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;