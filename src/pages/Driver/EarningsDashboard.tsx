// /* eslint-disable @typescript-eslint/no-explicit-any */
// // src/components/driver/EarningsDashboard.tsx
// import { useGetEarningsHistoryQuery } from '@/redux/features/driver/driverApi';
// import { useState } from 'react';

// // Mock data structure - replace with your actual API response structure
// interface EarningsData {
//   daily: number;
//   weekly: number;
//   monthly: number;
//   total: number;
//   transactions?: Array<{
//     id: string;
//     date: string;
//     amount: number;
//     rideId: string;
//     status: string;
//   }>;
// }

// const EarningsDashboard = () => {
//   const { data: earningsResponse, isLoading, error } = useGetEarningsHistoryQuery(undefined);
//   const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

//   // Use actual data from API or fallback to mock data for development
//   const earningsData: EarningsData = earningsResponse?.data || {
//     daily: 0,
//     weekly: 0,
//     monthly: 0,
//     total: 0,
//     transactions: []
//   };

//   // Mock chart data - replace with actual data from your API
//   const chartData = {
//     daily: [45, 78, 120, 95, 150, 180, 210],
//     weekly: [850, 920, 780, 1100, 950, 1200, 1350],
//     monthly: [3200, 2800, 3500, 4200, 3800, 4500, 5000]
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading earnings data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 text-lg">Failed to load earnings data</p>
//           <p className="text-gray-600 mt-2">Please try again later</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
        
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Earnings Dashboard</h1>
//           <p className="text-gray-600 mt-2">Track your earnings and performance</p>
//         </div>

//         {/* Earnings Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {/* Daily Earnings */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Today's Earnings</p>
//                 <p className="text-2xl font-bold text-green-600 mt-1">
//                   ${earningsData.daily?.toFixed(2) || '0.00'}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                 <span className="text-2xl">💰</span>
//               </div>
//             </div>
//             <p className="text-xs text-gray-500 mt-2">Updated just now</p>
//           </div>

//           {/* Weekly Earnings */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">This Week</p>
//                 <p className="text-2xl font-bold text-blue-600 mt-1">
//                   ${earningsData.weekly?.toFixed(2) || '0.00'}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                 <span className="text-2xl">📅</span>
//               </div>
//             </div>
//             <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
//           </div>

//           {/* Monthly Earnings */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">This Month</p>
//                 <p className="text-2xl font-bold text-purple-600 mt-1">
//                   ${earningsData.monthly?.toFixed(2) || '0.00'}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                 <span className="text-2xl">📊</span>
//               </div>
//             </div>
//             <p className="text-xs text-gray-500 mt-2">Current month</p>
//           </div>

//           {/* Total Earnings */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Earnings</p>
//                 <p className="text-2xl font-bold text-orange-600 mt-1">
//                   ${earningsData.total?.toFixed(2) || '0.00'}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                 <span className="text-2xl">🏆</span>
//               </div>
//             </div>
//             <p className="text-xs text-gray-500 mt-2">All time</p>
//           </div>
//         </div>

//         {/* Chart Section */}
//         <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold text-gray-800">Earnings Overview</h2>
//             <div className="flex space-x-2">
//               {['daily', 'weekly', 'monthly'].map((range) => (
//                 <button
//                   key={range}
//                   onClick={() => setTimeRange(range as any)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     timeRange === range
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   {range.charAt(0).toUpperCase() + range.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Simple Bar Chart (CSS-based) */}
//           <div className="h-64 flex items-end justify-between space-x-2 pt-8">
//             {chartData[timeRange].map((amount, index) => (
//               <div key={index} className="flex flex-col items-center flex-1">
//                 <div
//                   className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg transition-all hover:from-blue-500 hover:to-blue-700"
//                   style={{ height: `${(amount / Math.max(...chartData[timeRange])) * 80}%` }}
//                 ></div>
//                 <div className="text-xs text-gray-500 mt-2">
//                   {timeRange === 'daily' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] :
//                    timeRange === 'weekly' ? `Week ${index + 1}` :
//                    `Month ${index + 1}`}
//                 </div>
//                 <div className="text-xs font-medium text-gray-700 mt-1">
//                   ${amount}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Transactions */}
//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Transactions</h2>
          
//           {earningsData.transactions && earningsData.transactions.length > 0 ? (
//             <div className="space-y-4">
//               {earningsData.transactions.map((transaction) => (
//                 <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                       <span className="text-green-600">💰</span>
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800">Ride #{transaction.rideId.slice(-8)}</p>
//                       <p className="text-sm text-gray-500">
//                         {new Date(transaction.date).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-bold text-green-600">+${transaction.amount.toFixed(2)}</p>
//                     <p className={`text-xs capitalize ${
//                       transaction.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
//                     }`}>
//                       {transaction.status}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <div className="text-6xl mb-4">💸</div>
//               <p className="text-gray-500 text-lg">No transactions yet</p>
//               <p className="text-gray-400 mt-2">Your earnings will appear here after completed rides</p>
//             </div>
//           )}
//         </div>

//         {/* Stats Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//           <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
//             <div className="text-3xl mb-2">🚗</div>
//             <p className="text-2xl font-bold text-gray-800">0</p>
//             <p className="text-gray-600">Total Rides</p>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
//             <div className="text-3xl mb-2">⭐</div>
//             <p className="text-2xl font-bold text-gray-800">4.8</p>
//             <p className="text-gray-600">Average Rating</p>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
//             <div className="text-3xl mb-2">⏱️</div>
//             <p className="text-2xl font-bold text-gray-800">0h</p>
//             <p className="text-gray-600">Online Hours</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EarningsDashboard;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetEarningsHistoryQuery } from '@/redux/features/driver/driverApi';
import { Award, Calendar, Car, Clock, DollarSign, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';

// Mock data structure - replace with your actual API response structure
interface EarningsData {
  daily: number;
  weekly: number;
  monthly: number;
  total: number;
  transactions?: Array<{
    id: string;
    date: string;
    amount: number;
    rideId: string;
    status: string;
  }>;
}

const EarningsDashboard = () => {
  const { data: earningsResponse, isLoading, error } = useGetEarningsHistoryQuery(undefined);
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Use actual data from API or fallback to mock data for development
  const earningsData: EarningsData = earningsResponse?.data || {
    daily: 0,
    weekly: 0,
    monthly: 0,
    total: 0,
    transactions: []
  };

  // Mock chart data - replace with actual data from your API
  const chartData = {
    daily: [45, 78, 120, 95, 150, 180, 210],
    weekly: [850, 920, 780, 1100, 950, 1200, 1350],
    monthly: [3200, 2800, 3500, 4200, 3800, 4500, 5000]
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
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
              <DollarSign className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Failed to load earnings data</h3>
              <p className="text-muted-foreground mt-1">Please try again later</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Earnings Dashboard</h1>
          <p className="text-muted-foreground">Track your earnings and performance</p>
        </div>

        {/* Earnings Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Daily Earnings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Today's Earnings</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${earningsData.daily?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-xs text-muted-foreground">Updated just now</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Earnings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${earningsData.weekly?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-xs text-muted-foreground">Last 7 days</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Earnings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ${earningsData.monthly?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-xs text-muted-foreground">Current month</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Earnings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ${earningsData.total?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-xs text-muted-foreground">All time</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Earnings Overview</CardTitle>
              <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {/* Simple Bar Chart (CSS-based) */}
            <div className="h-64 flex items-end justify-between space-x-2 pt-8">
              {chartData[timeRange].map((amount, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-primary/80 rounded-t-lg transition-all hover:from-primary/90 hover:to-primary/70 cursor-pointer"
                    style={{ height: `${(amount / Math.max(...chartData[timeRange])) * 80}%` }}
                  ></div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {timeRange === 'daily' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] :
                     timeRange === 'weekly' ? `Week ${index + 1}` :
                     `Month ${index + 1}`}
                  </div>
                  <div className="text-xs font-medium mt-1">
                    ${amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {earningsData.transactions && earningsData.transactions.length > 0 ? (
              <div className="space-y-4">
                {earningsData.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Ride #{transaction.rideId.slice(-8)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+${transaction.amount.toFixed(2)}</p>
                      <Badge 
                        variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium text-muted-foreground">No transactions yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your earnings will appear here after completed rides
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-muted-foreground">Total Rides</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold">0h</p>
              <p className="text-muted-foreground">Online Hours</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EarningsDashboard;