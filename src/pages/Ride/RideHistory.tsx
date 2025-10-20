// components/RideHistory.tsx
import { useGetMyRideHistoryQuery } from '@/redux/features/ride/riderApi';
import { ApiRide } from '@/types/ride';
import { useNavigate } from 'react-router';

const RideHistory = () => {
  const { data: response, isLoading, error } = useGetMyRideHistoryQuery(undefined);
  const navigate = useNavigate();
  
  // Extract rides from response
  const rides: ApiRide[] = response?.data || [];

  const handleRideClick = (rideId: string) => {
    // Navigate to ride details page
    navigate(`/rider/ride-details/${rideId}`);
  };

  const handleLiveTrackingClick = (rideId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click
    navigate(`/rider/live-tracking/${rideId}`);
  };

  if (isLoading) return <div className="text-center">Loading ride history...</div>;
  if (error) return <div className="text-center text-red-500">Error loading ride history</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Ride History</h2>
      
      {rides?.length === 0 ? (
        <div className="text-center text-gray-500">No rides found</div>
      ) : (
        <div className="space-y-4">
          {rides?.map((ride) => (
            <div 
              key={ride.rideId} 
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
              onClick={() => handleRideClick(ride.rideId)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {ride.pickupLocation.address} → {ride.destination.address}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Fare: ${ride.fare} • Status: {ride.status}
                  </p>
                  <p className="text-xs text-gray-500">
                    Requested: {new Date(ride.requestedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    ride.status === 'completed' ? 'bg-green-100 text-green-800' :
                    ride.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ride.status}
                  </span>
                  
                  {/* Show Live Tracking button for active rides */}
                  {(ride.status === 'requested' || ride.status === 'accepted' || ride.status === 'in_progress') && (
                    <button 
                      onClick={(e) => handleLiveTrackingClick(ride.rideId, e)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-medium"
                    >
                      Live Track
                    </button>
                  )}
                </div>
              </div>
              
              {ride.completedAt && (
                <p className="text-xs text-gray-500 mt-2">
                  Completed: {new Date(ride.completedAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideHistory;