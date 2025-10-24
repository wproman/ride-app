// /* eslint-disable @typescript-eslint/no-explicit-any */
// // src/components/driver/IncomingRides.tsx
// import {
//   useAcceptRideMutation,
//   useGetIncomingRidesQuery,
//   useRejectRideMutation
// } from '@/redux/features/driver/driverApi';
// import { useEffect, useMemo, useState } from 'react';
// import { useNavigate } from 'react-router';

// interface RideRequest {
//   _id: string;
//   riderId: {
//     _id: string;
//     name: string;
//     phone: string;
//     rating?: number;
//   };
//   pickupLocation: {
//     address: string;
//     coordinates?: [number, number];
//   };
//   destination: {
//     address: string;
//     coordinates?: [number, number];
//   };
//   fare: number;
//   distance: number;
//   requestedAt: string;
//   estimatedDuration?: number;
// }

// const IncomingRides = () => {
//   const navigate = useNavigate();
//   const { data: ridesResponse, isLoading, error, refetch } = useGetIncomingRidesQuery(undefined);
//   const [acceptRide, { isLoading: isAccepting }] = useAcceptRideMutation();
//   const [rejectRide, { isLoading: isRejecting }] = useRejectRideMutation();
  
//   const [selectedRide, setSelectedRide] = useState<string | null>(null);
//   const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: number }>({});
//   const [removedRides, setRemovedRides] = useState<Set<string>>(new Set()); // Track removed rides

//   // Filter out removed rides
//   const incomingRides: RideRequest[] = useMemo(() => 
//     ridesResponse?.data?.filter((ride: RideRequest) => !removedRides.has(ride._id)) || [], 
//     [ridesResponse?.data, removedRides]
//   );

//   // Auto-refresh every 10 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       refetch();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [refetch]);

//   // Countdown timer for each ride request
//   useEffect(() => {
//     const timers: NodeJS.Timeout[] = [];

//     incomingRides.forEach((ride) => {
//       const timer = setInterval(() => {
//         const requestedTime = new Date(ride.requestedAt).getTime();
//         const currentTime = new Date().getTime();
//         const elapsed = currentTime - requestedTime;
//         const remaining = Math.max(0, 30000 - elapsed); // 30 seconds to accept

//         setTimeRemaining(prev => ({
//           ...prev,
//           [ride._id]: remaining
//         }));

//         if (remaining === 0) {
//           clearInterval(timer);
//         }
//       }, 1000);

//       timers.push(timer);
//     });

//     return () => timers.forEach(timer => clearInterval(timer));
//   }, [incomingRides]);

//  const handleAcceptRide = async (rideId: string) => {
//   try {
//     setSelectedRide(rideId);
//     // Immediately remove from UI to prevent double acceptance
//     setRemovedRides(prev => new Set(prev).add(rideId));
    
//     await acceptRide(rideId).unwrap(); // ✅ Make sure this matches your API definition
    
//     // Redirect to live ride tracking
//     navigate(`/driver/live-ride/${rideId}`);
    
//   } catch (error: any) {
//     console.error('Failed to accept ride:', error);
//     // Add back to UI if there was an error
//     setRemovedRides(prev => {
//       const newSet = new Set(prev);
//       newSet.delete(rideId);
//       return newSet;
//     });
//     alert(error?.data?.message || 'Failed to accept ride');
//   } finally {
//     setSelectedRide(null);
//   }
// };

// const handleRejectRide = async (rideId: string) => {
//   try {
//     setSelectedRide(rideId);
    
//     // Optional: Ask for rejection reason
//     const reason = window.prompt('Reason for rejection (optional):') || undefined;
    
//     // Immediately remove from UI
//     setRemovedRides(prev => new Set(prev).add(rideId));
    
//     await rejectRide({ rideId, reason }).unwrap(); // ✅ Pass object with rideId and reason
//     console.log('✅ Ride rejected successfully');
    
//   } catch (error: any) {
//     console.error('Failed to reject ride:', error);
//     // Add back to UI if there was an error
//     setRemovedRides(prev => {
//       const newSet = new Set(prev);
//       newSet.delete(rideId);
//       return newSet;
//     });
//     alert(error?.data?.message || 'Failed to reject ride');
//   } finally {
//     setSelectedRide(null);
//   }
// };

//   const formatTime = (ms: number) => {
//     const seconds = Math.floor(ms / 1000);
//     return `${seconds}s`;
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading incoming rides...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 text-lg">Failed to load ride requests</p>
//           <button 
//             onClick={() => refetch()}
//             className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
        
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Incoming Ride Requests</h1>
//           <p className="text-gray-600 mt-2">
//             {incomingRides.length > 0 
//               ? `${incomingRides.length} pending request${incomingRides.length > 1 ? 's' : ''}`
//               : 'No incoming ride requests'
//             }
//           </p>
//         </div>

//         {/* Ride Requests List */}
//         <div className="space-y-4">
//           {incomingRides.map((ride:RideRequest) => {
//             const remainingTime = timeRemaining[ride._id] || 30000;
//             const progress = (remainingTime / 30000) * 100;
//             const isExpiring = remainingTime < 10000;

//             return (
//               <div key={ride._id} className="bg-white rounded-lg shadow-sm border p-6">
//                 {/* Ride Header with Timer */}
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       Ride Request
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       From {ride.riderId.name} • {new Date(ride.requestedAt).toLocaleTimeString()}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <div className={`text-sm font-medium ${
//                       isExpiring ? 'text-red-600' : 'text-orange-600'
//                     }`}>
//                       {formatTime(remainingTime)}
//                     </div>
//                     <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
//                       <div 
//                         className={`h-full rounded-full transition-all ${
//                           isExpiring ? 'bg-red-500' : 'bg-orange-500'
//                         }`}
//                         style={{ width: `${progress}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Route Information */}
//                 <div className="space-y-3 mb-4">
//                   <div className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-500">Pickup</p>
//                       <p className="font-medium">{ride.pickupLocation.address}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-500">Destination</p>
//                       <p className="font-medium">{ride.destination.address}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Ride Details */}
//                 <div className="grid grid-cols-3 gap-4 mb-4 text-center">
//                   <div className="bg-gray-50 p-3 rounded">
//                     <p className="text-sm text-gray-500">Fare</p>
//                     <p className="font-bold text-green-600">${ride.fare}</p>
//                   </div>
//                   <div className="bg-gray-50 p-3 rounded">
//                     <p className="text-sm text-gray-500">Distance</p>
//                     <p className="font-bold text-blue-600">{ride.distance} km</p>
//                   </div>
//                   <div className="bg-gray-50 p-3 rounded">
//                     <p className="text-sm text-gray-500">Rider Rating</p>
//                     <p className="font-bold text-yellow-600">
//                       {ride.riderId.rating || '4.5'} ⭐
//                     </p>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => handleAcceptRide(ride._id)}
//                     disabled={isAccepting && selectedRide === ride._id || remainingTime === 0}
//                     className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     {isAccepting && selectedRide === ride._id ? (
//                       <span className="flex items-center justify-center">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Accepting...
//                       </span>
//                     ) : (
//                       'Accept Ride'
//                     )}
//                   </button>
                  
//                   <button
//                     onClick={() => handleRejectRide(ride._id)}
//                     disabled={isRejecting && selectedRide === ride._id || remainingTime === 0}
//                     className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     {isRejecting && selectedRide === ride._id ? (
//                       <span className="flex items-center justify-center">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Rejecting...
//                       </span>
//                     ) : (
//                       'Reject'
//                     )}
//                   </button>
//                 </div>

//                 {remainingTime === 0 && (
//                   <p className="text-red-500 text-sm text-center mt-3">
//                     This request has expired
//                   </p>
//                 )}
//               </div>
//             );
//           })}

//           {incomingRides.length === 0 && (
//             <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
//               <div className="text-6xl mb-4">🚗</div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 No Ride Requests
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 When riders request rides nearby, they'll appear here.
//               </p>
//               <p className="text-sm text-gray-500">
//                 Make sure you're online to receive ride requests.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Auto-refresh indicator */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-500">
//             Auto-refreshing every 10 seconds
//           </p>
//           <button 
//             onClick={() => refetch()}
//             className="text-blue-500 hover:text-blue-600 text-sm mt-1"
//           >
//             Refresh Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IncomingRides;


/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useAcceptRideMutation,
  useGetIncomingRidesQuery,
  useRejectRideMutation
} from '@/redux/features/driver/driverApi';
import {
  Car,
  CheckCircle,
  Clock,
  MapPin,
  Navigation,
  Phone,
  RefreshCw,
  Star,
  User,
  XCircle
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

interface RideRequest {
  _id: string;
  riderId: {
    _id: string;
    name: string;
    phone: string;
    rating?: number;
  };
  pickupLocation: {
    address: string;
    coordinates?: [number, number];
  };
  destination: {
    address: string;
    coordinates?: [number, number];
  };
  fare: number;
  distance: number;
  requestedAt: string;
  estimatedDuration?: number;
}

const IncomingRides = () => {
  const navigate = useNavigate();
  const { data: ridesResponse, isLoading, error, refetch } = useGetIncomingRidesQuery(undefined);
  const [acceptRide, { isLoading: isAccepting }] = useAcceptRideMutation();
  const [rejectRide, { isLoading: isRejecting }] = useRejectRideMutation();
  
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: number }>({});
  const [removedRides, setRemovedRides] = useState<Set<string>>(new Set());

  // Filter out removed rides
  const incomingRides: RideRequest[] = useMemo(() => 
    ridesResponse?.data?.filter((ride: RideRequest) => !removedRides.has(ride._id)) || [], 
    [ridesResponse?.data, removedRides]
  );

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetch]);

  // Countdown timer for each ride request
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    incomingRides.forEach((ride) => {
      const timer = setInterval(() => {
        const requestedTime = new Date(ride.requestedAt).getTime();
        const currentTime = new Date().getTime();
        const elapsed = currentTime - requestedTime;
        const remaining = Math.max(0, 30000 - elapsed); // 30 seconds to accept

        setTimeRemaining(prev => ({
          ...prev,
          [ride._id]: remaining
        }));

        if (remaining === 0) {
          clearInterval(timer);
        }
      }, 1000);

      timers.push(timer);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, [incomingRides]);

  const handleAcceptRide = async (rideId: string) => {
    try {
      setSelectedRide(rideId);
      setRemovedRides(prev => new Set(prev).add(rideId));
      
      await acceptRide(rideId).unwrap();
      navigate(`/driver/live-ride/${rideId}`);
      
    } catch (error: any) {
      console.error('Failed to accept ride:', error);
      setRemovedRides(prev => {
        const newSet = new Set(prev);
        newSet.delete(rideId);
        return newSet;
      });
      alert(error?.data?.message || 'Failed to accept ride');
    } finally {
      setSelectedRide(null);
    }
  };

  const handleRejectRide = async (rideId: string) => {
    try {
      setSelectedRide(rideId);
      const reason = window.prompt('Reason for rejection (optional):') || undefined;
      setRemovedRides(prev => new Set(prev).add(rideId));
      
      await rejectRide({ rideId, reason }).unwrap();
      console.log('✅ Ride rejected successfully');
      
    } catch (error: any) {
      console.error('Failed to reject ride:', error);
      setRemovedRides(prev => {
        const newSet = new Set(prev);
        newSet.delete(rideId);
        return newSet;
      });
      alert(error?.data?.message || 'Failed to reject ride');
    } finally {
      setSelectedRide(null);
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6 space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <Car className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Failed to load ride requests</h3>
              <p className="text-muted-foreground mt-1">Please try again</p>
            </div>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Incoming Ride Requests</h1>
          </div>
          <CardDescription>
            {incomingRides.length > 0 
              ? `${incomingRides.length} pending request${incomingRides.length > 1 ? 's' : ''}`
              : 'No incoming ride requests'
            }
          </CardDescription>
        </div>

        {/* Ride Requests List */}
        <div className="space-y-4">
          {incomingRides.map((ride: RideRequest) => {
            const remainingTime = timeRemaining[ride._id] || 30000;
            const progress = (remainingTime / 30000) * 100;
            const isExpiring = remainingTime < 10000;

            return (
              <Card key={ride._id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">Ride Request</CardTitle>
                      <CardDescription>
                        From {ride.riderId.name} • {new Date(ride.requestedAt).toLocaleTimeString()}
                      </CardDescription>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge 
                        variant={isExpiring ? "destructive" : "secondary"}
                        className="text-sm"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(remainingTime)}
                      </Badge>
                      <Progress 
                        value={progress} 
                        className={`w-20 h-2 ${isExpiring ? 'bg-destructive/20' : ''}`}
                      />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Route Information */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Navigation className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Pickup</p>
                        <p className="font-medium">{ride.pickupLocation.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                        <MapPin className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Destination</p>
                        <p className="font-medium">{ride.destination.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Ride Details */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted p-3 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Fare</p>
                      <p className="font-bold text-green-600 text-lg">${ride.fare}</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="font-bold text-blue-600 text-lg">{ride.distance} km</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Rider Rating</p>
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <p className="font-bold text-lg">{ride.riderId.rating || '4.5'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Rider Info */}
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">{ride.riderId.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{ride.riderId.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleAcceptRide(ride._id)}
                      disabled={isAccepting && selectedRide === ride._id || remainingTime === 0}
                      className="flex-1"
                      size="lg"
                    >
                      {isAccepting && selectedRide === ride._id ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Accepting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept Ride
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={() => handleRejectRide(ride._id)}
                      disabled={isRejecting && selectedRide === ride._id || remainingTime === 0}
                      variant="destructive"
                      className="flex-1"
                      size="lg"
                    >
                      {isRejecting && selectedRide === ride._id ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Rejecting...
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </>
                      )}
                    </Button>
                  </div>

                  {remainingTime === 0 && (
                    <Alert variant="destructive">
                      <AlertDescription>
                        This request has expired
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {incomingRides.length === 0 && (
            <Card>
              <CardContent className="text-center p-12 space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Car className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">No Ride Requests</h3>
                  <p className="text-muted-foreground mt-1">
                    When riders request rides nearby, they'll appear here.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Make sure you're online to receive ride requests.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Auto-refresh indicator */}
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4" />
              <span>Auto-refreshing every 10 seconds</span>
            </div>
            <Button 
              onClick={() => refetch()}
              variant="ghost"
              size="sm"
              className="mt-2"
            >
              Refresh Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IncomingRides;