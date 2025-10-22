// Enhanced LiveRideTracking.tsx - Using Real API Data
import { useGetMyCurrentRideQuery, useGetRideDetailsQuery } from "@/redux/features/ride/riderApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const LiveRideTracking = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const isDriver = user?.role === 'driver';
  
  // If no rideId in URL, try to get current ride
  const { data: currentRideResponse } = useGetMyCurrentRideQuery(undefined, {
    skip: !!rideId // Skip this query if we already have a rideId
  });

  // Use the rideId from URL OR from current ride
  const effectiveRideId = rideId || currentRideResponse?.data?.rideId;

  const { data: rideData, isLoading } = useGetRideDetailsQuery(effectiveRideId!, {
    skip: !effectiveRideId // Skip if no rideId available
  });

  const ride = rideData?.data;

  const statusSteps = [
    { key: "requested", label: "Requested", color: "bg-yellow-500" },
    { key: "accepted", label: "Accepted", color: "bg-blue-500" },
    { key: "arriving", label: "Driver Arriving", color: "bg-purple-500" },
    { key: "picked_up", label: "Picked Up", color: "bg-green-500" },
    { key: "completed", label: "Completed", color: "bg-gray-500" }
  ];

  // If no rideId and no current ride, show message
  if (!effectiveRideId && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isDriver ? 'No Active Ride' : 'No Active Ride'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isDriver 
              ? "You don't have any ongoing rides at the moment." 
              : "You don't have any ongoing rides at the moment."
            }
          </p>
          <button 
            onClick={() => navigate(isDriver ? '/driver/driver-dashboard' : '/rider/rider-dashboard')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

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

  if (!ride) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Ride not found</p>
          <button 
            onClick={() => navigate(isDriver ? '/driver/driver-dashboard' : '/rider/rider-dashboard')}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm border-b">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(isDriver ? '/driver/dashboard' : '/rider/dashboard')}
            className="text-gray-600"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-center">
            {isDriver ? 'Active Ride - Driver' : 'Ride in Progress'}
          </h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Status Progress Bar */}
      <div className="bg-white p-4 mx-4 mt-4 rounded-lg shadow-sm">
        <div className="flex justify-between mb-2">
          {statusSteps.map((step) => (
            <div key={step.key} className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                ride.rideStatus === step.key ? step.color : 'bg-gray-300'
              } mb-1`}></div>
              <span className="text-xs text-gray-600">{step.label}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className={`bg-green-500 h-2 rounded-full ${
            ride.rideStatus === 'requested' ? 'w-1/5' :
            ride.rideStatus === 'accepted' ? 'w-2/5' :
            ride.rideStatus === 'arriving' ? 'w-3/5' :
            ride.rideStatus === 'picked_up' ? 'w-4/5' :
            'w-full'
          }`}></div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="h-64 bg-gray-200 mx-4 mt-4 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-gray-500">
            {isDriver ? 'Live Navigation' : 'Live Map'}
          </p>
          <p className="text-sm text-gray-400">
            {isDriver 
              ? `Navigate to ${ride.pickupLocation?.address}` 
              : 'Driver location will appear here'
            }
          </p>
        </div>
      </div>

      {/* Person Details Card (Driver sees Rider, Rider sees Driver) */}
      <div className="bg-white m-4 p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-16 h-16 ${
            isDriver ? 'bg-green-500' : 'bg-blue-500'
          } rounded-full flex items-center justify-center`}>
            <span className="text-white font-bold text-xl">
              {isDriver 
                ? (ride.riderId?.name?.charAt(0) || 'R') 
                : (ride.driverId?.name?.charAt(0) || 'D')
              }
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">
              {isDriver ? (ride.riderId?.name || 'Rider') : (ride.driverId?.name || 'Driver')}
            </h3>
            <p className="text-sm text-gray-500">
              {isDriver ? 'Rider' : 'Driver'}
            </p>
            <div className="flex items-center mt-1">
              <span className="text-yellow-500 flex items-center">
                ⭐ {isDriver ? (ride.riderId?.rating || '4.5') : (ride.driverId?.rating || '4.8')}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-blue-600 font-medium">
                {isDriver ? (ride.riderId?.phone || 'Phone not available') : (ride.driverId?.phone || 'Phone not available')}
              </span>
            </div>
            {!isDriver && ride.driverId?.vehicle && (
              <p className="text-sm text-gray-500 mt-1">
                {ride.driverId.vehicle.model} • {ride.driverId.vehicle.plate}
              </p>
            )}
          </div>
        </div>

        {/* Ride Details */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">From:</span>
            <span className="font-medium text-right">
              {ride.pickupLocation?.address || 'Location not specified'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">To:</span>
            <span className="font-medium text-right">
              {ride.destination?.address || 'Location not specified'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fare:</span>
            <span className="font-bold text-green-600">${ride.fare}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={`font-medium ${
              ride.rideStatus === 'completed' ? 'text-green-600' :
              ride.rideStatus === 'cancelled' ? 'text-red-600' :
              'text-blue-600'
            }`}>
              {ride.rideStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-blue-50 mx-4 p-4 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-blue-800">Current Status</p>
            <p className="text-blue-600 capitalize">
              {ride.rideStatus === 'requested' && (isDriver ? 'Ride requested' : 'Looking for drivers...')}
              {ride.rideStatus === 'accepted' && (isDriver ? 'You accepted this ride' : 'Driver accepted your ride')}
              {ride.rideStatus === 'arriving' && (isDriver ? 'Heading to pickup' : 'Driver is arriving')}
              {ride.rideStatus === 'picked_up' && 'Ride in progress'}
              {ride.rideStatus === 'completed' && 'Ride completed'}
              {ride.rideStatus === 'cancelled' && 'Ride cancelled'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-800">${ride.fare}</p>
            <p className="text-sm text-blue-600">Payment: {ride.paymentStatus}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons - Different for Driver vs Rider */}
      <div className="m-4 space-y-3">
        {/* Common Actions */}
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2">
          <span>📞</span>
          <span>Call {isDriver ? 'Rider' : 'Driver'}</span>
        </button>
        
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2">
          <span>💬</span>
          <span>Message {isDriver ? 'Rider' : 'Driver'}</span>
        </button>

        {/* Driver Specific Actions */}
        {isDriver && ride.rideStatus === 'accepted' && (
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-lg font-medium">
            🚗 Start Navigation to Pickup
          </button>
        )}

        {isDriver && ride.rideStatus === 'arriving' && (
          <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg font-medium">
            ✅ I've Arrived at Pickup
          </button>
        )}

        {isDriver && ride.rideStatus === 'picked_up' && (
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-medium">
            🏁 Complete Trip
          </button>
        )}

        {/* Rider Specific Actions */}
        {!isDriver && ride.rideStatus !== 'completed' && ride.rideStatus !== 'cancelled' && (
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-medium">
            Cancel Ride
          </button>
        )}

        {/* Payment action for rider */}
        {!isDriver && ride.rideStatus === 'completed' && ride.paymentStatus === 'pending' && (
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-medium">
            💳 Pay Now
          </button>
        )}
      </div>

      {/* Ride Timeline */}
      <div className="bg-white m-4 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-3">Ride Timeline</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Requested:</span>
            <span className="font-medium">{new Date(ride.requestedAt).toLocaleTimeString()}</span>
          </div>
          {ride.acceptedAt && (
            <div className="flex justify-between">
              <span className="text-gray-600">Accepted:</span>
              <span className="font-medium">{new Date(ride.acceptedAt).toLocaleTimeString()}</span>
            </div>
          )}
          {ride.pickedUpAt && (
            <div className="flex justify-between">
              <span className="text-gray-600">Picked Up:</span>
              <span className="font-medium">{new Date(ride.pickedUpAt).toLocaleTimeString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="m-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800 text-center">
          🛡️ Stay safe! {isDriver ? 'Verify rider details before pickup.' : 'Verify driver and vehicle details before boarding.'}
        </p>
      </div>
    </div>
  );
};

export default LiveRideTracking;