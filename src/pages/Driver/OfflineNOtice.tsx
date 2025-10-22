// components/driver/OfflineNotice.tsx
import React from 'react';

interface OfflineNoticeProps {
  onGoOnline: () => void;
  isLoading: boolean;
}

const OfflineNotice: React.FC<OfflineNoticeProps> = ({ onGoOnline, isLoading }) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-yellow-400 text-xl">💡</span>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-yellow-800">
            You're Currently Offline
          </h3>
          <div className="mt-2 text-yellow-700">
            <p className="mb-3">
              You won't receive any ride requests while offline. Go online to start earning!
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm mb-4">
              <li>No incoming ride requests will be shown</li>
              <li>Ride acceptance features are disabled</li>
              <li>You can still view your earnings and ride history</li>
            </ul>
          </div>
          <button
            onClick={onGoOnline}
            disabled={isLoading}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Going Online...' : 'Go Online to Receive Rides'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineNotice;