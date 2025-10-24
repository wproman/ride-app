// // components/driver/OfflineNotice.tsx
// import React from 'react';

// interface OfflineNoticeProps {
//   onGoOnline: () => void;
//   isLoading: boolean;
// }

// const OfflineNotice: React.FC<OfflineNoticeProps> = ({ onGoOnline, isLoading }) => {
//   return (
//     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
//       <div className="flex items-start">
//         <div className="flex-shrink-0">
//           <span className="text-yellow-400 text-xl">💡</span>
//         </div>
//         <div className="ml-4">
//           <h3 className="text-lg font-medium text-yellow-800">
//             You're Currently Offline
//           </h3>
//           <div className="mt-2 text-yellow-700">
//             <p className="mb-3">
//               You won't receive any ride requests while offline. Go online to start earning!
//             </p>
//             <ul className="list-disc list-inside space-y-1 text-sm mb-4">
//               <li>No incoming ride requests will be shown</li>
//               <li>Ride acceptance features are disabled</li>
//               <li>You can still view your earnings and ride history</li>
//             </ul>
//           </div>
//           <button
//             onClick={onGoOnline}
//             disabled={isLoading}
//             className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             {isLoading ? 'Going Online...' : 'Go Online to Receive Rides'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfflineNotice;

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

import { Car, Clock, DollarSign, Lightbulb, Wifi, WifiOff } from 'lucide-react';

interface OfflineNoticeProps {
  onGoOnline: () => void;
  isLoading: boolean;
}

const OfflineNotice: React.FC<OfflineNoticeProps> = ({ onGoOnline, isLoading }) => {
  return (
    <Card className="bg-yellow-50 border-yellow-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 flex items-center">
                <WifiOff className="h-5 w-5 mr-2" />
                You're Currently Offline
              </h3>
              <p className="text-yellow-700 mt-1">
                You won't receive any ride requests while offline. Go online to start earning!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center space-x-2 text-yellow-700">
                <Car className="h-4 w-4" />
                <span>No incoming ride requests</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-700">
                <WifiOff className="h-4 w-4" />
                <span>Ride acceptance disabled</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-700">
                <DollarSign className="h-4 w-4" />
                <span>View earnings & history only</span>
              </div>
            </div>

            <Button
              onClick={onGoOnline}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Going Online...
                </>
              ) : (
                <>
                  <Wifi className="h-4 w-4 mr-2" />
                  Go Online to Receive Rides
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfflineNotice;