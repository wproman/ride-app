


/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useEstimateFareMutation, useRequestRideMutation } from "@/redux/features/ride/riderApi";
import { Car, Clock, DollarSign, MapPin, Navigation } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from 'react-router';
import { toast } from "sonner";

const RideRequestForm = () => {
  const navigate = useNavigate();
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
      console.log(result.data)

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
        navigate(`/rider/live-ride/${result.data._id}`);
      }
      
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to request ride");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="text-center pb-4 space-y-2">
          <CardTitle className="flex items-center justify-center space-x-2 text-xl">
            <Car className="h-6 w-6 text-primary" />
            <span>Request a Ride</span>
          </CardTitle>
          <CardDescription>
            Enter your pickup and destination to get started
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Location Inputs */}
          <div className="space-y-3">
            {/* Pickup Location */}
            <div className="space-y-2">
              <Label htmlFor="pickup" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span>Pickup Location *</span>
              </Label>
              <Input
                id="pickup"
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup address"
                required
              />
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-600" />
                <span>Destination *</span>
              </Label>
              <Input
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination address"
                required
              />
            </div>
          </div>

          {/* Estimate Fare Button */}
          <Button
            onClick={handleEstimateFare}
            disabled={!pickup || !destination || isEstimating}
            className="w-full"
          >
            {isEstimating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Estimating Fare...
              </>
            ) : (
              <>
                <DollarSign className="h-4 w-4 mr-2" />
                Estimate Fare
              </>
            )}
          </Button>

          {/* Show Estimated Fare & Details */}
          {fare !== null && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Navigation className="h-3 w-3 text-blue-600" />
                      <span className="text-sm font-medium">Distance</span>
                    </div>
                    <Badge variant="secondary" className="text-blue-600">
                      {distance} km
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Clock className="h-3 w-3 text-blue-600" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <Badge variant="secondary" className="text-blue-600">
                      {duration} min
                    </Badge>
                  </div>
                </div>
                
                <Separator className="my-3" />
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Fare</p>
                  <p className="text-2xl font-bold text-green-600">৳{fare}</p>
                </div>

                {breakdown && (
                  <div className="mt-3 p-2 bg-white rounded border text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base fare:</span>
                      <span className="font-medium">৳{breakdown.baseFare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-medium">৳{breakdown.perKmRate}/km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">৳{breakdown.perMinRate}/min</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="bkash">bKash</SelectItem>
                <SelectItem value="mobile_wallet">Mobile Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Request Ride Button */}
          <Button
            onClick={handleRequestRide}
            disabled={!pickup || !destination || !fare || isRequesting}
            className="w-full"
          >
            {isRequesting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Requesting Ride...
              </>
            ) : (
              <>
                <Car className="h-4 w-4 mr-2" />
                Request Ride - ৳{fare}
              </>
            )}
          </Button>

          {/* Info message */}
          {!fare && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                * Please estimate fare before requesting a ride
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RideRequestForm;