
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetRideDetailsQuery } from '@/redux/features/ride/riderApi';
import { ArrowLeft, Calendar, Clock, DollarSign, MapPin, Navigation } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

const RideDetails = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading, error } = useGetRideDetailsQuery(rideId!);
  
  const ride = response?.data;

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
              <MapPin className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Error loading ride details</h3>
              <p className="text-muted-foreground mt-1">Please try again later</p>
            </div>
            <Button 
              onClick={() => navigate('/rider/ride-history')}
              variant="outline"
            >
              Back to History
            </Button>
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
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Ride not found</h3>
              <p className="text-muted-foreground mt-1">The ride you're looking for doesn't exist</p>
            </div>
            <Button 
              onClick={() => navigate('/rider/ride-history')}
              variant="outline"
            >
              Back to History
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={() => navigate('/rider/ride-history')}
            variant="ghost"
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to History
          </Button>
          <h1 className="text-2xl font-bold">Ride Details</h1>
        </div>

        {/* Ride Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Ride #{ride._id.slice(-8)}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(ride.requestedAt).toLocaleDateString()} at {new Date(ride.requestedAt).toLocaleTimeString()}
                </CardDescription>
              </div>
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
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Route Information */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <MapPin className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{ride.pickupLocation.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                  <MapPin className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="font-medium">{ride.destination.address}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Ride Information Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <p className="text-sm text-muted-foreground">Fare</p>
                </div>
                <p className="font-semibold text-lg">${ride.fare}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                </div>
                <p className="font-semibold capitalize">{ride.paymentStatus}</p>
              </div>
            </div>

            <Separator />

            {/* Timeline */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Requested</span>
                  <span className="text-sm font-medium">{new Date(ride.requestedAt).toLocaleString()}</span>
                </div>
                {ride.acceptedAt && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Accepted</span>
                    <span className="text-sm font-medium">{new Date(ride.acceptedAt).toLocaleString()}</span>
                  </div>
                )}
                {ride.pickedUpAt && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Picked Up</span>
                    <span className="text-sm font-medium">{new Date(ride.pickedUpAt).toLocaleString()}</span>
                  </div>
                )}
                {ride.completedAt && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <span className="text-sm font-medium">{new Date(ride.completedAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              {(ride.status === 'requested' || ride.status === 'accepted' || ride.status === 'in_progress') && (
                <Button 
                  onClick={() => navigate(`/rider/live-tracking/${ride.rideId}`)}
                  className="flex-1"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Live Tracking
                </Button>
              )}
              <Button 
                onClick={() => navigate('/rider/ride-history')}
                variant="outline"
                className="flex-1"
              >
                Back to History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RideDetails;