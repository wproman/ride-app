// /* eslint-disable @typescript-eslint/no-explicit-any */
// // Enhanced LiveRideTracking.tsx - Using Real API Data
// import { useCancelRideMutation, useGetMyCurrentRideQuery, useGetRideDetailsQuery } from "@/redux/features/ride/riderApi";
// import { RootState } from "@/redux/store";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router";

// const LiveRideTracking = () => {
//   const { rideId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useSelector((state: RootState) => state.auth);
//   const isDriver = user?.role === 'driver';
  
//   // Add cancel mutation
//   const [cancelRide, { isLoading: isCancelling }] = useCancelRideMutation();

//   // If no rideId in URL, try to get current ride
//   const { data: currentRideResponse } = useGetMyCurrentRideQuery(undefined, {
//     skip: !!rideId // Skip this query if we already have a rideId
//   });

//   // Use the rideId from URL OR from current ride
//   const effectiveRideId = rideId || currentRideResponse?.data?.rideId;

//   const { data: rideData, isLoading } = useGetRideDetailsQuery(effectiveRideId!, {
//     skip: !effectiveRideId // Skip if no rideId available
//   });

//   const ride = rideData?.data;

//   const statusSteps = [
//     { key: "requested", label: "Requested", color: "bg-yellow-500" },
//     { key: "accepted", label: "Accepted", color: "bg-blue-500" },
//     { key: "arriving", label: "Driver Arriving", color: "bg-purple-500" },
//     { key: "picked_up", label: "Picked Up", color: "bg-green-500" },
//     { key: "completed", label: "Completed", color: "bg-gray-500" }
//   ];

//   const handleCancelRide = async () => {

//     if (!ride?._id) return;
         
//     try {
//         await cancelRide({ 
//       rideId: ride._id,
//       reason: undefined // or get from user input
//     }).unwrap();
//       console.log(ride._id)
//       // Show success message
//       alert('Ride cancelled successfully');
      
//       // Redirect to appropriate page
//       navigate(isDriver ? '/driver/driver-dashboard' : '/rider');
      
//     } catch (error: any) {
//       console.error('Failed to cancel ride:', error);
//       alert(error?.data?.message || 'Failed to cancel ride');
//     }
//   };

//   // If no rideId and no current ride, show message
//   if (!effectiveRideId && !isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center p-8">
//           <div className="text-6xl mb-4">🚗</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             {isDriver ? 'No Active Ride' : 'No Active Ride'}
//           </h2>
//           <p className="text-gray-600 mb-6">
//             {isDriver 
//               ? "You don't have any ongoing rides at the moment." 
//               : "You don't have any ongoing rides at the moment."
//             }
//           </p>
//           <button 
//             onClick={() => navigate(isDriver ? '/driver/driver-dashboard' : '/rider')}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading ride details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!ride) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 text-lg">Ride not found</p>
//           <button 
//             onClick={() => navigate(isDriver ? '/driver/driver-dashboard' : '/rider/rider-dashboard')}
//             className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white p-4 shadow-sm border-b">
//         <div className="flex items-center justify-between">
//           <button 
//             onClick={() => navigate(isDriver ? '/driver/driver-dashboard' : '/rider/rider-dashboard')}
//             className="text-gray-600"
//           >
//             ← Back
//           </button>
//           <h1 className="text-xl font-bold text-center">
//             {isDriver ? 'Active Ride - Driver' : 'Ride in Progress'}
//           </h1>
//           <div className="w-6"></div>
//         </div>
//       </div>

//       {/* Status Progress Bar */}
//       <div className="bg-white p-4 mx-4 mt-4 rounded-lg shadow-sm">
//         <div className="flex justify-between mb-2">
//           {statusSteps.map((step) => (
//             <div key={step.key} className="flex flex-col items-center">
//               <div className={`w-3 h-3 rounded-full ${
//                 ride.rideStatus === step.key ? step.color : 'bg-gray-300'
//               } mb-1`}></div>
//               <span className="text-xs text-gray-600">{step.label}</span>
//             </div>
//           ))}
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div className={`bg-green-500 h-2 rounded-full ${
//             ride.rideStatus === 'requested' ? 'w-1/5' :
//             ride.rideStatus === 'accepted' ? 'w-2/5' :
//             ride.rideStatus === 'arriving' ? 'w-3/5' :
//             ride.rideStatus === 'picked_up' ? 'w-4/5' :
//             'w-full'
//           }`}></div>
//         </div>
//       </div>

//       {/* Map Placeholder */}
//       <div className="h-64 bg-gray-200 mx-4 mt-4 rounded-lg flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-4xl mb-2">🗺️</div>
//           <p className="text-gray-500">
//             {isDriver ? 'Live Navigation' : 'Live Map'}
//           </p>
//           <p className="text-sm text-gray-400">
//             {isDriver 
//               ? `Navigate to ${ride.pickupLocation?.address}` 
//               : 'Driver location will appear here'
//             }
//           </p>
//         </div>
//       </div>

//       {/* Person Details Card (Driver sees Rider, Rider sees Driver) */}
//       <div className="bg-white m-4 p-4 rounded-lg shadow-sm">
//         <div className="flex items-center space-x-4 mb-4">
//           <div className={`w-16 h-16 ${
//             isDriver ? 'bg-green-500' : 'bg-blue-500'
//           } rounded-full flex items-center justify-center`}>
//             <span className="text-white font-bold text-xl">
//               {isDriver 
//                 ? (ride.riderId?.name?.charAt(0) || 'R') 
//                 : (ride.driverId?.name?.charAt(0) || 'D')
//               }
//             </span>
//           </div>
//           <div className="flex-1">
//             <h3 className="font-semibold text-lg">
//               {isDriver ? (ride.riderId?.name || 'Rider') : (ride.driverId?.name || 'Driver')}
//             </h3>
//             <p className="text-sm text-gray-500">
//               {isDriver ? 'Rider' : 'Driver'}
//             </p>
//             <div className="flex items-center mt-1">
//               <span className="text-yellow-500 flex items-center">
//                 ⭐ {isDriver ? (ride.riderId?.rating || '4.5') : (ride.driverId?.rating || '4.8')}
//               </span>
//               <span className="mx-2 text-gray-300">•</span>
//               <span className="text-blue-600 font-medium">
//                 {isDriver ? (ride.riderId?.phone || 'Phone not available') : (ride.driverId?.phone || 'Phone not available')}
//               </span>
//             </div>
//             {!isDriver && ride.driverId?.vehicle && (
//               <p className="text-sm text-gray-500 mt-1">
//                 {ride.driverId.vehicle.model} • {ride.driverId.vehicle.plate}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Ride Details */}
//         <div className="border-t pt-4 space-y-3">
//           <div className="flex justify-between">
//             <span className="text-gray-600">From:</span>
//             <span className="font-medium text-right">
//               {ride.pickupLocation?.address || 'Location not specified'}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">To:</span>
//             <span className="font-medium text-right">
//               {ride.destination?.address || 'Location not specified'}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Fare:</span>
//             <span className="font-bold text-green-600">${ride.fare}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Status:</span>
//             <span className={`font-medium ${
//               ride.rideStatus === 'completed' ? 'text-green-600' :
//               ride.rideStatus === 'cancelled' ? 'text-red-600' :
//               'text-blue-600'
//             }`}>
//               {ride.rideStatus}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Current Status */}
//       <div className="bg-blue-50 mx-4 p-4 rounded-lg border border-blue-200">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="font-medium text-blue-800">Current Status</p>
//             <p className="text-blue-600 capitalize">
//               {ride.rideStatus === 'requested' && (isDriver ? 'Ride requested' : 'Looking for drivers...')}
//               {ride.rideStatus === 'accepted' && (isDriver ? 'You accepted this ride' : 'Driver accepted your ride')}
//               {ride.rideStatus === 'arriving' && (isDriver ? 'Heading to pickup' : 'Driver is arriving')}
//               {ride.rideStatus === 'picked_up' && 'Ride in progress'}
//               {ride.rideStatus === 'completed' && 'Ride completed'}
//               {ride.rideStatus === 'cancelled' && 'Ride cancelled'}
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-2xl font-bold text-blue-800">${ride.fare}</p>
//             <p className="text-sm text-blue-600">Payment: {ride.paymentStatus}</p>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons - Different for Driver vs Rider */}
//       <div className="m-4 space-y-3">
//         {/* Common Actions */}
//         <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2">
//           <span>📞</span>
//           <span>Call {isDriver ? 'Rider' : 'Driver'}</span>
//         </button>
        
//         <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2">
//           <span>💬</span>
//           <span>Message {isDriver ? 'Rider' : 'Driver'}</span>
//         </button>

//         {/* Driver Specific Actions */}
//         {isDriver && ride.rideStatus === 'accepted' && (
//           <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-lg font-medium">
//             🚗 Start Navigation to Pickup
//           </button>
//         )}

//         {isDriver && ride.rideStatus === 'arriving' && (
//           <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg font-medium">
//             ✅ I've Arrived at Pickup
//           </button>
//         )}

//         {isDriver && ride.rideStatus === 'picked_up' && (
//           <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-medium">
//             🏁 Complete Trip
//           </button>
//         )}

//         {/* Rider Specific Actions - Fixed Cancel Button */}
//         {!isDriver && ride.rideStatus !== 'completed' && ride.rideStatus !== 'cancelled' && (
//           <button 
//             onClick={handleCancelRide}
//             disabled={isCancelling}
//             className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isCancelling ? (
//               <span className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 Cancelling...
//               </span>
//             ) : (
//               'Cancel Ride'
//             )}
//           </button>
//         )}

//         {/* Payment action for rider */}
//         {!isDriver && ride.rideStatus === 'completed' && ride.paymentStatus === 'pending' && (
//           <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-medium">
//             💳 Pay Now
//           </button>
//         )}
//       </div>

//       {/* Ride Timeline */}
//       <div className="bg-white m-4 p-4 rounded-lg shadow-sm">
//         <h3 className="font-semibold text-lg mb-3">Ride Timeline</h3>
//         <div className="space-y-2">
//           <div className="flex justify-between">
//             <span className="text-gray-600">Requested:</span>
//             <span className="font-medium">{new Date(ride.requestedAt).toLocaleTimeString()}</span>
//           </div>
//           {ride.acceptedAt && (
//             <div className="flex justify-between">
//               <span className="text-gray-600">Accepted:</span>
//               <span className="font-medium">{new Date(ride.acceptedAt).toLocaleTimeString()}</span>
//             </div>
//           )}
//           {ride.pickedUpAt && (
//             <div className="flex justify-between">
//               <span className="text-gray-600">Picked Up:</span>
//               <span className="font-medium">{new Date(ride.pickedUpAt).toLocaleTimeString()}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Safety Notice */}
//       <div className="m-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//         <p className="text-sm text-yellow-800 text-center">
//           🛡️ Stay safe! {isDriver ? 'Verify rider details before pickup.' : 'Verify driver and vehicle details before boarding.'}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LiveRideTracking;

/* eslint-disable @typescript-eslint/no-explicit-any */
// Enhanced LiveRideTracking.tsx - Using Real API Data
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
    <div className="min-h-screen bg-background">
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
    </div>
  );
};

export default LiveRideTracking;