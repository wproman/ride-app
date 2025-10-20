// components/RideDetails.tsx
import { useGetRideDetailsQuery } from '@/redux/features/ride/riderApi';
import { useNavigate, useParams } from 'react-router';

const RideDetails = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading, error } = useGetRideDetailsQuery(rideId!);
  
  const ride = response?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ride details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error loading ride details</p>
          <button 
            onClick={() => navigate('/rider/ride-history')}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to History
          </button>
        </div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Ride not found</p>
          <button 
            onClick={() => navigate('/rider/ride-history')}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate('/rider/ride-history')}
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            ← Back to History
          </button>
          <h1 className="text-2xl font-bold">Ride Details</h1>
        </div>

        {/* Ride Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          {/* Status Badge */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold">Ride #{ride._id.slice(-8)}</h2>
              <p className="text-sm text-gray-500">
                {new Date(ride.requestedAt).toLocaleDateString()} at {new Date(ride.requestedAt).toLocaleTimeString()}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              ride.status === 'completed' ? 'bg-green-100 text-green-800' :
              ride.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              ride.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {ride.status}
            </span>
          </div>

          {/* Route Information */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-medium">{ride.pickupLocation.address}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-medium">{ride.destination.address}</p>
              </div>
            </div>
          </div>
  
          {/* Ride Information Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Fare</p>
              <p className="font-semibold text-lg">${ride.fare}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Payment Status</p>
              <p className="font-semibold capitalize">{ride.paymentStatus}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Timeline</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Requested</span>
                <span>{new Date(ride.requestedAt).toLocaleString()}</span>
              </div>
              {ride.acceptedAt && (
                <div className="flex justify-between text-sm">
                  <span>Accepted</span>
                  <span>{new Date(ride.acceptedAt).toLocaleString()}</span>
                </div>
              )}
              {ride.pickedUpAt && (
                <div className="flex justify-between text-sm">
                  <span>Picked Up</span>
                  <span>{new Date(ride.pickedUpAt).toLocaleString()}</span>
                </div>
              )}
              {ride.completedAt && (
                <div className="flex justify-between text-sm">
                  <span>Completed</span>
                  <span>{new Date(ride.completedAt).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            {(ride.status === 'requested' || ride.status === 'accepted' || ride.status === 'in_progress') && (
              <button 
                onClick={() => navigate(`/rider/live-tracking/${ride.rideId}`)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-medium"
              >
                Live Tracking
              </button>
            )}
            <button 
              onClick={() => navigate('/rider/ride-history')}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded font-medium"
            >
              Back to History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;