import { useGetRideDetailsQuery } from "@/redux/features/rider/riderApi";
import { useParams } from "react-router";

const LiveRideTracking = () => {
  const { rideId } = useParams();
  const { data: rideData, isLoading } = useGetRideDetailsQuery(rideId!);
//   const [currentStatus, setCurrentStatus] = useState("requested");

  const ride = rideData?.data;

  // Mock driver data (replace with actual driver data from API)
  const mockDriver = {
    name: "Abdul Karim",
    rating: 4.8,
    vehicle: {
      model: "Toyota Corolla",
      plate: "DHA-1234",
      color: "White"
    },
    eta: "5 min",
    phone: "+8801XXXXXXXXX"
  };

  const statusSteps = [
    { key: "requested", label: "Requested", color: "bg-yellow-500" },
    { key: "accepted", label: "Accepted", color: "bg-blue-500" },
    { key: "arriving", label: "Driver Arriving", color: "bg-purple-500" },
    { key: "picked_up", label: "Picked Up", color: "bg-green-500" },
    { key: "completed", label: "Completed", color: "bg-gray-500" }
  ];

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
            onClick={() => window.history.back()}
            className="text-gray-600"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-center">Ride in Progress</h1>
          <div className="w-6"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Status Progress Bar */}
      <div className="bg-white p-4 mx-4 mt-4 rounded-lg shadow-sm">
        <div className="flex justify-between mb-2">
          {statusSteps.map((step) => (
            <div key={step.key} className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${step.color} mb-1`}></div>
              <span className="text-xs text-gray-600">{step.label}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full w-1/4"></div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="h-64 bg-gray-200 mx-4 mt-4 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-gray-500">Live Map</p>
          <p className="text-sm text-gray-400">Driver location will appear here</p>
        </div>
      </div>

      {/* Driver Details Card */}
      <div className="bg-white m-4 p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          {/* Driver Avatar */}
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{mockDriver.name}</h3>
            <p className="text-sm text-gray-500">
              {mockDriver.vehicle.model} • {mockDriver.vehicle.plate} • {mockDriver.vehicle.color}
            </p>
            <div className="flex items-center mt-1">
              <span className="text-yellow-500 flex items-center">
                ⭐ {mockDriver.rating}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-green-600 font-medium">{mockDriver.eta} away</span>
            </div>
          </div>
        </div>

        {/* Ride Details */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">From:</span>
            <span className="font-medium text-right">{ride.pickupLocation.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">To:</span>
            <span className="font-medium text-right">{ride.destination.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fare:</span>
            <span className="font-bold text-green-600">৳{ride.fare}</span>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-blue-50 mx-4 p-4 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-blue-800">Current Status</p>
            <p className="text-blue-600">Looking for drivers...</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-800">৳{ride.fare}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="m-4 space-y-3">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2">
          <span>📞</span>
          <span>Call Driver</span>
        </button>
        
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2">
          <span>💬</span>
          <span>Message Driver</span>
        </button>
        
        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-medium">
          Cancel Ride
        </button>
      </div>

      {/* Safety Notice */}
      <div className="m-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800 text-center">
          🛡️ Stay safe! Verify driver and vehicle details before boarding.
        </p>
      </div>
    </div>
  );
};

export default LiveRideTracking;