/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/safety/SOSButton.tsx
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useAppSelector } from '@/redux/hooks';
import {
    AlertTriangle,
    MapPin,
    MessageSquare,
    Phone
} from 'lucide-react';
import { useState } from 'react';

import { toast } from "sonner";

interface SOSButtonProps {
  rideId: string;
  isVisible: boolean;
}

const SOSButton: React.FC<SOSButtonProps> = ({ rideId, isVisible }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSharingLocation, setIsSharingLocation] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
   
  if (!isVisible) return null;

  const emergencyContacts = user?.emergencyContacts || [
    { name: 'Police', number: '911', type: 'police' },
    { name: 'Emergency Contact', number: user?.emergencyContact || '+1234567890', type: 'personal' }
  ];

  const handleCallPolice = () => {
    window.open('tel:911', '_self');
    toast.success("Calling Emergency Services");
    toast.info("Connecting to police...");
  };

  const handleNotifyContact = async (contact: any) => {
    try {
      // Get current location
      const position = await getCurrentLocation();
      
      // Send SMS/WhatsApp
      const message = `EMERGENCY: ${user?.name} needs help! Location: https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude} Ride ID: ${rideId}`;
      
      if (contact.type === 'police') {
        window.open(`tel:${contact.number}`, '_self');
      } else {
        window.open(`https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`, '_blank');
      }

    toast.success("Emergency Contact Notified");
    toast.info(`${contact.name} has been alerted with your location`);
    } catch (error) {
    toast.error("Failed to notify contact");
    toast.info(`Please try again or call emergency services directly`);
    }
  };

  const handleShareLiveLocation = async () => {
    setIsSharingLocation(true);
    try {
      const position = await getCurrentLocation();
      
      // Send to all emergency contacts
      const message = `LIVE LOCATION: ${user?.name} is sharing their live location: https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
      
      emergencyContacts.forEach(contact => {
        if (contact.type !== 'police') {
          window.open(`https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`, '_blank');
        }
      });

    toast.success("Location Shared");
    toast.info(`Your live location has been shared with emergency contacts`);



    } catch (error) {
 toast.error("Location sharing failed");
    toast.info(`Unable to share your location. Please try again.`);

    } finally {
      setIsSharingLocation(false);
    }
  };

  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });
  };

  return (
    <>
      {/* Floating SOS Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="h-16 w-16 rounded-full bg-red-600 hover:bg-red-700 shadow-lg animate-pulse"
          size="icon"
        >
          <AlertTriangle className="h-8 w-8" />
        </Button>
      </div>

      {/* Emergency Options Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              Emergency Assistance
            </DialogTitle>
            <DialogDescription>
              Choose an emergency option. Your location will be shared automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Call Police */}
            <Button
              onClick={handleCallPolice}
              className="w-full justify-start gap-3 h-12 bg-red-600 hover:bg-red-700"
            >
              <Phone className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Call Emergency Services</div>
                <div className="text-sm opacity-90">Direct call to 911</div>
              </div>
            </Button>

            {/* Notify Contacts */}
            <div className="space-y-2">
              <div className="text-sm font-medium">Notify Emergency Contacts</div>
              {emergencyContacts.map((contact, index) => (
                <Button
                  key={index}
                  onClick={() => handleNotifyContact(contact)}
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 border-red-200 text-red-700 hover:bg-red-50"
                >
                  <MessageSquare className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Alert {contact.name}</div>
                    <div className="text-sm opacity-90">{contact.number}</div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Share Live Location */}
            <Button
              onClick={handleShareLiveLocation}
              disabled={isSharingLocation}
              variant="outline"
              className="w-full justify-start gap-3 h-12 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <MapPin className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">
                  {isSharingLocation ? 'Sharing Location...' : 'Share Live Location'}
                </div>
                <div className="text-sm opacity-90">Send real-time location to all contacts</div>
              </div>
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center pt-4 border-t">
            Your safety is our priority. In case of emergency, always call 911 first.
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;