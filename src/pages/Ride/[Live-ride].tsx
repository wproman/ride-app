/* eslint-disable @typescript-eslint/no-explicit-any */
import SOSButton from '@/components/safety/SOSButton';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCancelRideMutation, useGetMyCurrentRideQuery, useGetRideDetailsQuery } from "@/redux/features/ride/riderApi";
import { RootState } from "@/redux/store";
import {
  ArrowLeft,
  Car,
  CheckCircle,
  CreditCard,
  Flag,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Shield,
  Star,
  User
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const LiveRideTracking = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const isDriver = user?.role === 'driver';
  
  // Add cancel mutation
  const [cancelRide, { isLoading: isCancelling }] = useCancelRideMutation();

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

  // Determine if SOS button should be visible
  const shouldShowSOS = ride && 
    (ride.rideStatus === 'accepted' || 
     ride.rideStatus === 'arriving' || 
     ride.rideStatus === 'picked_up');

  const statusSteps = [
    { key: "requested", label: "Requested", color: "bg-yellow-500" },
    { key: "accepted", label: "Accepted", color: "bg-blue-500" },
    { key: "arriving", label: "Driver Arriving", color: "bg-purple-500" },
    { key: "picked_up", label: "Picked Up", color: "bg-green-500" },
    { key: "completed", label: "Completed", color: "bg-gray-500" }
  ];

  const handleCancelRide = async () => {
    if (!ride?._id) return;
         
    try {
        await cancelRide({ 
      rideId: ride._id,
      reason: undefined // or get from user input
    }).unwrap();
      console.log(ride._id)
      // Show success message
      alert('Ride cancelled successfully');
      
      // Redirect to appropriate page
      navigate(isDriver ? '/driver/driver-dashboard' : '/rider');
      
    } catch (error: any) {
      console.error('Failed to cancel ride:', error);
      alert(error?.data?.message || 'Failed to cancel ride');
    }
  };

  // If no rideId and no current ride, show message
  if (!effectiveRideId && !isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8 space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Car className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {isDriver ? 'No Active Ride' : 'No Active Ride'}
              </h2>
              <p className="text-muted-foreground">
                {isDriver 
                  ? "You don't have any ongoing rides at the moment." 
                  : "You don't have any ongoing rides at the moment."
                }
              </p>
            </div>
            <Button 
              onClick={() => navigate(isDriver ? '/driver/driver-dashboard' : '/rider')}
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center space-y-4 p-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6 space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <Car className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Ride not found</h3>
              <p className="text-muted-foreground mt-1">The ride you're looking for doesn't exist</p>
            </div>
            <Button 
              onClick={() => navigate(isDriver ? '/driver/driver-dashboard' : '/rider/rider-dashboard')}
              variant="outline"
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <Card className="rounded-none rounded-b-lg shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button 
              onClick={() => navigate(isDriver ? '/driver/driver-dashboard' : '/rider/rider-dashboard')}
              variant="ghost"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold">
              {isDriver ? 'Active Ride - Driver' : 'Ride in Progress'}
            </h1>
            <div className="w-14"></div>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 space-y-4">
        {/* Status Progress Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between mb-3">
              {statusSteps.map((step) => (
                <div key={step.key} className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    ride.rideStatus === step.key ? step.color : 'bg-muted'
                  } mb-1`}></div>
                  <span className="text-xs text-muted-foreground">{step.label}</span>
                </div>
              ))}
            </div>
            <Progress 
              value={
                ride.rideStatus === 'requested' ? 20 :
                ride.rideStatus === 'accepted' ? 40 :
                ride.rideStatus === 'arriving' ? 60 :
                ride.rideStatus === 'picked_up' ? 80 :
                100
              } 
              className="h-2"
            />
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Live Navigation</h3>
            <p className="text-muted-foreground text-sm">
              {isDriver 
                ? `Navigate to ${ride.pickupLocation?.address}` 
                : 'Driver location will appear here'
              }
            </p>
          </CardContent>
        </Card>

        {/* Person Details Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 ${
                isDriver ? 'bg-green-500' : 'bg-blue-500'
              } rounded-full flex items-center justify-center`}>
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {isDriver ? (ride.riderId?.name || 'Rider') : (ride.driverId?.name || 'Driver')}
                </h3>
                <Badge variant="secondary" className="mt-1">
                  {isDriver ? 'Rider' : 'Driver'}
                </Badge>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">
                      {isDriver ? (ride.riderId?.rating || '4.5') : (ride.driverId?.rating || '4.8')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      {isDriver ? (ride.riderId?.phone || 'Phone not available') : (ride.driverId?.phone || 'Phone not available')}
                    </span>
                  </div>
                </div>
                {!isDriver && ride.driverId?.vehicle && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {ride.driverId.vehicle.model} • {ride.driverId.vehicle.plate}
                  </p>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Ride Details */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">From:</span>
                <span className="font-medium text-right">
                  {ride.pickupLocation?.address || 'Location not specified'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">To:</span>
                <span className="font-medium text-right">
                  {ride.destination?.address || 'Location not specified'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fare:</span>
                <span className="font-bold text-green-600">${ride.fare}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge 
                  variant={
                    ride.rideStatus === 'completed' ? 'default' :
                    ride.rideStatus === 'cancelled' ? 'destructive' :
                    'secondary'
                  }
                >
                  {ride.rideStatus}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Alert className="bg-blue-50 border-blue-200">
          <div className="flex justify-between items-center w-full">
            <div>
              <AlertDescription className="font-medium text-blue-800">
                Current Status
              </AlertDescription>
              <p className="text-blue-600 capitalize text-sm">
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
        </Alert>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full" size="lg">
            <Phone className="h-4 w-4 mr-2" />
            Call {isDriver ? 'Rider' : 'Driver'}
          </Button>
          
          <Button className="w-full" size="lg" variant="outline">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message {isDriver ? 'Rider' : 'Driver'}
          </Button>

          {/* Driver Specific Actions */}
          {isDriver && ride.rideStatus === 'accepted' && (
            <Button className="w-full" size="lg" variant="secondary">
              <Navigation className="h-4 w-4 mr-2" />
              Start Navigation to Pickup
            </Button>
          )}

          {isDriver && ride.rideStatus === 'arriving' && (
            <Button className="w-full" size="lg" variant="secondary">
              <CheckCircle className="h-4 w-4 mr-2" />
              I've Arrived at Pickup
            </Button>
          )}

          {isDriver && ride.rideStatus === 'picked_up' && (
            <Button className="w-full" size="lg" variant="destructive">
              <Flag className="h-4 w-4 mr-2" />
              Complete Trip
            </Button>
          )}

          {/* Rider Specific Actions */}
          {!isDriver && ride.rideStatus !== 'completed' && ride.rideStatus !== 'cancelled' && (
            <Button 
              onClick={handleCancelRide}
              disabled={isCancelling}
              className="w-full"
              size="lg"
              variant="destructive"
            >
              {isCancelling ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Cancelling...
                </>
              ) : (
                'Cancel Ride'
              )}
            </Button>
          )}

          {/* Payment action for rider */}
          {!isDriver && ride.rideStatus === 'completed' && ride.paymentStatus === 'pending' && (
            <Button className="w-full" size="lg">
              <CreditCard className="h-4 w-4 mr-2" />
              Pay Now
            </Button>
          )}
        </div>

        {/* Ride Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ride Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Requested:</span>
              <span className="font-medium">{new Date(ride.requestedAt).toLocaleTimeString()}</span>
            </div>
            {ride.acceptedAt && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accepted:</span>
                <span className="font-medium">{new Date(ride.acceptedAt).toLocaleTimeString()}</span>
              </div>
            )}
            {ride.pickedUpAt && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Picked Up:</span>
                <span className="font-medium">{new Date(ride.pickedUpAt).toLocaleTimeString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Safety Notice */}
        <Alert className="bg-yellow-50 border-yellow-200">
          <Shield className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Stay safe! {isDriver ? 'Verify rider details before pickup.' : 'Verify driver and vehicle details before boarding.'}
          </AlertDescription>
        </Alert>
      </div>

      {/* Add SOS Button */}
      <SOSButton 
        rideId={ride?._id || effectiveRideId} 
        isVisible={!!shouldShowSOS} 
      />
    </div>
  );
};

export default LiveRideTracking;