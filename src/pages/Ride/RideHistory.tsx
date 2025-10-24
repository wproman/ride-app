// // components/RideHistory.tsx
// import { useGetMyRideHistoryQuery } from '@/redux/features/ride/riderApi';
// import { RootState } from '@/redux/store';
// import { ApiRide } from '@/types/ride';
// import { useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router';

// const RideHistory = () => {
//   const { data: response, isLoading, error } = useGetMyRideHistoryQuery(undefined);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useSelector((state: RootState) => state.auth);
  
//   // Determine if current user is driver or rider based on route or user role
//   const isDriver = user?.role === 'driver' || location.pathname.includes('/driver/');
  
//   // Extract rides from response
//   const rides: ApiRide[] = response?.data || [];

//   const handleRideClick = (rideId: string) => {
//     // Navigate to appropriate ride details page based on role
//     if (isDriver) {
//       navigate(`/driver/ride-details/${rideId}`);
//     } else {
//       navigate(`/rider/ride-details/${rideId}`);
//     }
//   };

//   const handleLiveTrackingClick = (rideId: string, e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent triggering the parent click
//     // Navigate to appropriate live tracking page based on role
//     if (isDriver) {
//       navigate(`/driver/live-ride/${rideId}`);
//     } else {
//       navigate(`/rider/live-tracking/${rideId}`);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading ride history...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 text-lg">Failed to load ride history</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">
//             {isDriver ? 'Driver Ride History' : 'My Ride History'}
//           </h1>
//           <p className="text-gray-600 mt-2">
//             {rides.length} {rides.length === 1 ? 'ride' : 'rides'} completed
//           </p>
//         </div>

//         {rides.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
//             <div className="text-6xl mb-4">🚗</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               No Ride History
//             </h3>
//             <p className="text-gray-600">
//               {isDriver 
//                 ? "Your completed rides will appear here." 
//                 : "Your ride history will appear here."
//               }
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {rides.map((ride) => (
//               <div 
//                 key={ride.rideId} 
//                 className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
//                 onClick={() => handleRideClick(ride.rideId)}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {ride.pickupLocation.address} → {ride.destination.address}
//                     </h3>
//                     <p className="text-sm text-gray-600 mt-1">
//                       {new Date(ride.requestedAt).toLocaleDateString()} • ${ride.fare}
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-end space-y-2">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       ride.status === 'completed' ? 'bg-green-100 text-green-800' :
//                       ride.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                       ride.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
//                       'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {ride.status}
//                     </span>
                    
//                     {/* Show Live Tracking button for active rides */}
//                     {(ride.status === 'requested' || ride.status === 'accepted' || ride.status === 'in_progress') && (
//                       <button 
//                         onClick={(e) => handleLiveTrackingClick(ride.rideId, e)}
//                         className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
//                       >
//                         Live Tracking
//                       </button>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Additional ride information */}
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <p className="text-sm text-gray-500">From</p>
//                     <p className="font-medium">{ride.pickupLocation.address}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">To</p>
//                     <p className="font-medium">{ride.destination.address}</p>
//                   </div>
//                 </div>

//                 {/* Person information */}
//                 <div className="flex items-center justify-between border-t pt-4">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-sm font-bold">
//                         {isDriver 
//                           ? (ride.riderId?.name?.charAt(0) || 'R') 
//                           : (ride.driverId?.name?.charAt(0) || 'D')
//                         }
//                       </span>
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm font-medium text-gray-900">
//                         {isDriver ? ride.riderId?.name : ride.driverId?.name}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {isDriver ? 'Rider' : 'Driver'}
//                       </p>
//                     </div>
//                   </div>

//                   {ride.completedAt && (
//                     <p className="text-sm text-gray-500">
//                       Completed: {new Date(ride.completedAt).toLocaleString()}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RideHistory;

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetMyRideHistoryQuery } from '@/redux/features/ride/riderApi';
import { RootState } from '@/redux/store';
import { ApiRide } from '@/types/ride';
import { Calendar, Car, DollarSign, MapPin, Navigation, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

const RideHistory = () => {
  const { data: response, isLoading, error } = useGetMyRideHistoryQuery(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Determine if current user is driver or rider based on route or user role
  const isDriver = user?.role === 'driver' || location.pathname.includes('/driver/');
  
  // Extract rides from response
  const rides: ApiRide[] = response?.data || [];

  const handleRideClick = (rideId: string) => {
    // Navigate to appropriate ride details page based on role
    if (isDriver) {
      navigate(`/driver/ride-details/${rideId}`);
    } else {
      navigate(`/rider/ride-details/${rideId}`);
    }
  };

  const handleLiveTrackingClick = (rideId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click
    // Navigate to appropriate live tracking page based on role
    if (isDriver) {
      navigate(`/driver/live-ride/${rideId}`);
    } else {
      navigate(`/rider/live-tracking/${rideId}`);
    }
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
              <h3 className="font-semibold text-lg">Failed to load ride history</h3>
              <p className="text-muted-foreground mt-1">Please try again later</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            {isDriver ? 'Driver Ride History' : 'My Ride History'}
          </h1>
          <CardDescription>
            {rides.length} {rides.length === 1 ? 'ride' : 'rides'} completed
          </CardDescription>
        </div>

        {rides.length === 0 ? (
          <Card>
            <CardContent className="text-center p-12 space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Car className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">No Ride History</h3>
                <p className="text-muted-foreground mt-1">
                  {isDriver 
                    ? "Your completed rides will appear here." 
                    : "Your ride history will appear here."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {rides.map((ride) => (
              <Card 
                key={ride.rideId} 
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => handleRideClick(ride.rideId)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-green-600" />
                        {ride.pickupLocation.address} 
                        <span className="mx-2 text-muted-foreground">→</span>
                        <MapPin className="h-4 w-4 mr-2 text-red-600" />
                        {ride.destination.address}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(ride.requestedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3" />
                          <span>${ride.fare}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge 
                        variant={
                          ride.status === 'completed' ? 'default' :
                          ride.status === 'cancelled' ? 'destructive' :
                          ride.status === 'in_progress' ? 'secondary' :
                          'outline'
                        }
                      >
                        {ride.status}
                      </Badge>
                      
                      {/* Show Live Tracking button for active rides */}
                      {(ride.status === 'requested' || ride.status === 'accepted' || ride.status === 'in_progress') && (
                        <Button 
                          onClick={(e) => handleLiveTrackingClick(ride.rideId, e)}
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <Navigation className="h-3 w-3" />
                          <span>Live Tracking</span>
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <Separator className="my-4" />

                  {/* Person information */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {isDriver ? ride.riderId?.name : ride.driverId?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isDriver ? 'Rider' : 'Driver'}
                        </p>
                      </div>
                    </div>

                    {ride.completedAt && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-sm font-medium">
                          {new Date(ride.completedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RideHistory;