// components/dashboard/AnalyticsDashboard.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Car,
  DollarSign,
  Download,
  MapPin,
  MoreHorizontal,
  TrendingUp,
  Users
} from 'lucide-react';

const Analytics = () => {
  // Mock data - replace with actual API data
  const analyticsData = {
    overview: {
      totalRides: 12540,
      totalRevenue: 125800,
      activeDrivers: 342,
      activeRiders: 2850,
      rideGrowth: 12.5,
      revenueGrowth: 8.3,
      driverGrowth: 5.2
    },
    dailyStats: [
      { day: 'Mon', rides: 245, revenue: 2450 },
      { day: 'Tue', rides: 312, revenue: 3120 },
      { day: 'Wed', rides: 289, revenue: 2890 },
      { day: 'Thu', rides: 356, revenue: 3560 },
      { day: 'Fri', rides: 421, revenue: 4210 },
      { day: 'Sat', rides: 387, revenue: 3870 },
      { day: 'Sun', rides: 298, revenue: 2980 }
    ],
    topDrivers: [
      { name: 'John Smith', rides: 156, rating: 4.9, earnings: 4250 },
      { name: 'Sarah Johnson', rides: 142, rating: 4.8, earnings: 3980 },
      { name: 'Mike Chen', rides: 138, rating: 4.9, earnings: 3850 },
      { name: 'Emily Davis', rides: 127, rating: 4.7, earnings: 3550 }
    ],
    rideTypes: [
      { type: 'Standard', percentage: 65, count: 8151 },
      { type: 'Premium', percentage: 25, count: 3135 },
      { type: 'Group', percentage: 8, count: 1003 },
      { type: 'Business', percentage: 2, count: 251 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your ride-sharing platform performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Last 7 days
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalRides.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{analyticsData.overview.rideGrowth}% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.overview.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{analyticsData.overview.revenueGrowth}% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.activeDrivers}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{analyticsData.overview.driverGrowth}% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Riders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.activeRiders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Registered users this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ride Volume Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Ride Volume & Revenue</CardTitle>
                <CardDescription>
                  Daily ride requests and revenue for the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end justify-between gap-2">
                  {analyticsData.dailyStats.map((day) => (
                    <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                      <div className="text-xs text-muted-foreground">{day.day}</div>
                      <div className="flex flex-col items-center gap-1 w-full">
                        <div 
                          className="w-full bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600"
                          style={{ height: `${(day.rides / 500) * 100}%` }}
                        />
                        <div 
                          className="w-full bg-green-500 rounded-t-sm transition-all hover:bg-green-600"
                          style={{ height: `${(day.revenue / 5000) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-center">
                        <div className="font-medium">{day.rides}</div>
                        <div className="text-muted-foreground">${day.revenue}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-xs text-muted-foreground">Rides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-xs text-muted-foreground">Revenue ($)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ride Types Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Ride Types</CardTitle>
                <CardDescription>
                  Distribution of different ride types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.rideTypes.map((type) => (
                    <div key={type.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{type.type}</span>
                        <span className="font-medium">{type.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${type.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {type.count.toLocaleString()} rides
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Drivers</CardTitle>
              <CardDescription>
                Drivers with the highest number of completed rides and ratings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topDrivers.map((driver) => (
                  <div key={driver.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{driver.name}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <StarRating rating={driver.rating} />
                          <span>{driver.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-medium">{driver.rides} rides</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${driver.earnings}</div>
                        <div className="text-sm text-muted-foreground">Earnings</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>
                  Revenue distribution by ride type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'Standard Rides', amount: 78500, percentage: 62 },
                    { type: 'Premium Rides', amount: 35200, percentage: 28 },
                    { type: 'Group Rides', amount: 8500, percentage: 7 },
                    { type: 'Business Rides', amount: 3600, percentage: 3 }
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: 
                              item.type === 'Standard Rides' ? '#3b82f6' :
                              item.type === 'Premium Rides' ? '#10b981' :
                              item.type === 'Group Rides' ? '#f59e0b' : '#8b5cf6'
                          }}
                        />
                        <span className="text-sm">{item.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${item.amount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>
                  Monthly revenue comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: 'Jan', revenue: 98500, growth: 5.2 },
                    { month: 'Feb', revenue: 102300, growth: 8.7 },
                    { month: 'Mar', revenue: 112500, growth: 12.1 },
                    { month: 'Apr', revenue: 125800, growth: 8.3 }
                  ].map((item) => (
                    <div key={item.month} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="font-medium">{item.month}</div>
                      <div className="text-right">
                        <div className="font-medium">${item.revenue.toLocaleString()}</div>
                        <div className={`text-xs ${item.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.growth > 0 ? '+' : ''}{item.growth}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>
                Ride requests and driver activity by location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { area: 'Downtown', rides: 4250, drivers: 45, growth: 15.2 },
                  { area: 'North District', rides: 3120, drivers: 32, growth: 8.7 },
                  { area: 'South Quarter', rides: 2980, drivers: 28, growth: 12.4 },
                  { area: 'East Side', rides: 2650, drivers: 25, growth: 6.3 },
                  { area: 'West End', rides: 2340, drivers: 22, growth: 9.1 },
                  { area: 'Central Plaza', rides: 4120, drivers: 38, growth: 11.8 }
                ].map((location) => (
                  <Card key={location.area} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div className="font-medium">{location.area}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Rides</span>
                        <span className="font-medium">{location.rides.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Active Drivers</span>
                        <span className="font-medium">{location.drivers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Growth</span>
                        <span className="text-green-600 font-medium">+{location.growth}%</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-3 w-3 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default Analytics;