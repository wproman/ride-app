/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/DriverLiveRide.tsx
import { useGetRideDetailsQuery, useUpdateRideStatusMutation } from '@/redux/features/ride/riderApi';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

// Shadcn UI Components
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Flag, MessageCircle, Navigation, Phone } from 'lucide-react';

const DriverLiveRide = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
//   const { user } = useSelector((state: RootState) => state.auth);
  
  const { data: rideData, isLoading, refetch } = useGetRideDetailsQuery(rideId!);
  const [updateRideStatus, { isLoading: isUpdating }] = useUpdateRideStatusMutation();

  const ride = rideData?.data;

  // Status steps for progress tracking
  const statusSteps = [
    { key: 'accepted', label: 'Accepted', progress: 25 },
    { key: 'arriving', label: 'Arriving', progress: 50 },
    { key: 'picked_up', label: 'Picked Up', progress: 75 },
    { key: 'completed', label: 'Completed', progress: 100 }
  ];

  const currentStep = statusSteps.find(step => step.key === ride?.rideStatus) || statusSteps[0];

  const handleStatusUpdate = async (newStatus: string) => {
    if (!rideId) return;

    try {
      await updateRideStatus({ rideId, status: newStatus }).unwrap();
      toast.success(`Status updated to ${newStatus.replace('_', ' ')}`);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update status');
    }
  };

  const handleCallRider = () => {
    if (ride?.riderId?.phone) {
      window.open(`tel:${ride.riderId.phone}`);
    } else {
      toast.error('Rider phone number not available');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader className="text-center">
            <CardTitle>Loading Ride Details</CardTitle>
            <CardDescription>Please wait while we load the ride information</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader className="text-center">
            <CardTitle>Ride Not Found</CardTitle>
            <CardDescription>The ride you're looking for doesn't exist</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/driver/driver-dashboard')} className="w-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Card className="rounded-none rounded-b-lg shadow-sm border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/driver/driver-dashboard')}
              className="flex items-center gap-2"
            >
              ← Back
            </Button>
            <div className="text-center">
              <CardTitle className="text-xl">Active Ride - Driver</CardTitle>
              <CardDescription>Ride in progress</CardDescription>
            </div>
            <div className="w-20"></div> {/* Spacer for balance */}
          </div>
        </CardHeader>
      </Card>

      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {/* Progress Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Ride Progress</CardTitle>
            <Progress value={currentStep.progress} className="h-2" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              {statusSteps.map((step, index) => (
                <div key={step.key} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    ride.rideStatus === step.key 
                      ? 'bg-primary text-primary-foreground' 
                      : index < statusSteps.findIndex(s => s.key === ride.rideStatus)
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index < statusSteps.findIndex(s => s.key === ride.rideStatus) ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span className="text-xs mt-2 text-center">{step.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Live Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Navigation className="h-12 w-12 mx-auto mb-2" />
                <p>Navigation to pickup location</p>
                <p className="text-sm">Navigate to: {ride.pickupLocation?.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rider Details */}
        <Card>
          <CardHeader>
            <CardTitle>Rider Information</CardTitle>
            <CardDescription>Your passenger details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {ride.riderId?.name?.charAt(0) || 'R'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{ride.riderId?.name || 'Rider'}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <Badge variant="secondary">Rider</Badge>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span>{ride.riderId?.rating || '4.5'}</span>
                  </div>
                </div>
                {ride.riderId?.phone && (
                  <p className="text-sm text-muted-foreground mt-1">{ride.riderId.phone}</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Ride Details */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{ride.pickupLocation?.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="font-medium">{ride.destination?.address}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fare</p>
                  <p className="font-bold text-green-600 text-lg">${ride.fare}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
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
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="flex justify-between items-center">
            <div>
              <p className="font-medium text-blue-800">Current Status</p>
              <p className="text-blue-700 capitalize">
                {ride.rideStatus === 'accepted' && 'You accepted this ride'}
                {ride.rideStatus === 'arriving' && 'Heading to pickup location'}
                {ride.rideStatus === 'picked_up' && 'Ride in progress'}
                {ride.rideStatus === 'completed' && 'Ride completed'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-800">${ride.fare}</p>
              <p className="text-sm text-blue-700">Payment: {ride.paymentStatus}</p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Communication Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleCallRider}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Phone className="h-4 w-4" />
              Call Rider
            </Button>
            <Button 
              className="flex items-center gap-2"
              variant="outline"
            >
              <MessageCircle className="h-4 w-4" />
              Message
            </Button>
          </div>

          {/* Status Update Buttons */}
          {ride.rideStatus === 'accepted' && (
            <Button 
              onClick={() => handleStatusUpdate('arriving')}
              disabled={isUpdating}
              className="w-full flex items-center gap-2"
              size="lg"
            >
              <Navigation className="h-5 w-5" />
              {isUpdating ? 'Updating...' : 'Start Navigation to Pickup'}
            </Button>
          )}

          {ride.rideStatus === 'arriving' && (
            <Button 
              onClick={() => handleStatusUpdate('picked_up')}
              disabled={isUpdating}
              className="w-full flex items-center gap-2"
              size="lg"
            >
              <CheckCircle className="h-5 w-5" />
              {isUpdating ? 'Updating...' : 'I\'ve Arrived at Pickup'}
            </Button>
          )}

          {ride.rideStatus === 'picked_up' && (
            <Button 
              onClick={() => handleStatusUpdate('completed')}
              disabled={isUpdating}
              className="w-full flex items-center gap-2"
              size="lg"
              variant="destructive"
            >
              <Flag className="h-5 w-5" />
              {isUpdating ? 'Updating...' : 'Complete Trip'}
            </Button>
          )}
        </div>

        {/* Ride Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Ride Timeline</CardTitle>
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
            {ride.completedAt && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed:</span>
                <span className="font-medium">{new Date(ride.completedAt).toLocaleTimeString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Safety Notice */}
        <Alert variant="default" className="bg-amber-50 border-amber-200">
          <AlertDescription className="text-amber-800 text-center">
            🛡️ Stay safe! Verify rider details before pickup.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default DriverLiveRide;