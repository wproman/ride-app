/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEstimateFareMutation, useRequestRideMutation } from "@/redux/features/rider/riderApi";
import { useState } from "react";
import { toast } from "react-hot-toast";

const RideRequestForm = () => {
  const [requestRide, { isLoading: isRequesting }] = useRequestRideMutation();
  const [estimateFare, { isLoading: isEstimating }] = useEstimateFareMutation();
  
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleEstimateFare = async () => {
    if (!pickup || !destination) {
      toast.error("Please enter pickup and destination");
      return;
    }

    try {
      const estimateData = {
        pickup: { address: pickup },
        destination: { address: destination }
      };
      
      const result = await estimateFare(estimateData).unwrap();
      
      if (result.success) {
        setFare(result.data.fare);
        setDistance(result.data.distance);
        setDuration(result.data.duration);
        setBreakdown(result.data.breakdown);
        toast.success(`Estimated Fare: ৳${result.data.fare}`);
      }
      
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to estimate fare");
    }
  };

  const handleRequestRide = async () => {
    if (!pickup || !destination || !fare) {
      toast.error("Please fill all fields and estimate fare first");
      return;
    }

    const rideData = {
      pickupLocation: { address: pickup },
      destination: { address: destination },
      fare,
      distance,
      duration,
      paymentMethod,
    };

    try {
      const result = await requestRide(rideData).unwrap();
      
      if (result.success) {
        toast.success("Ride requested successfully!");
        // Reset form
        setPickup("");
        setDestination("");
        setFare(null);
        setDistance(null);
        setDuration(null);
        setBreakdown(null);
        setPaymentMethod("cash");
      }
      
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to request ride");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 space-y-4 mt-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        🚖 Request a Ride
      </h2>

      {/* Pickup Location */}
      <div>
        <label className="block font-medium text-gray-700">Pickup Location *</label>
        <input
          type="text"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder="Enter pickup address"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
      </div>

      {/* Destination */}
      <div>
        <label className="block font-medium text-gray-700">Destination *</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination address"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
      </div>

      {/* Estimate Fare Button */}
      <button
        onClick={handleEstimateFare}
        disabled={!pickup || !destination || isEstimating}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 rounded-lg transition-colors font-medium"
      >
        {isEstimating ? "Estimating Fare..." : "Estimate Fare"}
      </button>

      {/* Show Estimated Fare & Details */}
      {fare !== null && (
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <span className="text-sm font-medium text-gray-700">Distance:</span>
              <p className="text-sm font-semibold text-blue-600">{distance} km</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Duration:</span>
              <p className="text-sm font-semibold text-blue-600">{duration} min</p>
            </div>
          </div>
          <div className="border-t pt-2">
            <span className="text-lg font-bold text-green-600">৳{fare}</span>
          </div>
          {breakdown && (
            <div className="mt-2 text-xs text-gray-500 text-left">
              <p>Base fare: ৳{breakdown.baseFare}</p>
              <p>Distance: ৳{breakdown.distance} km × ৳{breakdown.perKmRate}</p>
              <p>Time: ৳{breakdown.duration} min × ৳{breakdown.perMinRate}</p>
            </div>
          )}
        </div>
      )}

      {/* Payment Method */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="bkash">bKash</option>
          <option value="mobile_wallet">Mobile Wallet</option>
        </select>
      </div>

      {/* Request Ride Button */}
      <button
        onClick={handleRequestRide}
        disabled={!pickup || !destination || !fare || isRequesting}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-lg transition-colors font-medium text-lg"
      >
        {isRequesting ? "Requesting Ride..." : `Request Ride - ৳${fare}`}
      </button>

      {/* Info message */}
      {!fare && (
        <div className="text-xs text-gray-500 text-center">
          * Please estimate fare before requesting a ride
        </div>
      )}
    </div>
  );
};

export default RideRequestForm;