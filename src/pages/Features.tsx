import React from 'react';

const Features: React.FC = () => {
  const riderFeatures = [
    {
      icon: '🚗',
      title: 'Instant Booking',
      description: 'Book a ride in seconds with real-time driver matching'
    },
    {
      icon: '📍',
      title: 'Live Tracking',
      description: 'Track your driver in real-time with accurate ETAs'
    },
    {
      icon: '💳',
      title: 'Multiple Payments',
      description: 'Pay with credit card, mobile wallet, or cash'
    },
    {
      icon: '⭐',
      title: 'Ratings & Reviews',
      description: 'Rate your experience and help maintain quality'
    }
  ];

  const driverFeatures = [
    {
      icon: '💰',
      title: 'Flexible Earnings',
      description: 'Drive when you want and earn competitive rates'
    },
    {
      icon: '🛡️',
      title: 'Driver Protection',
      description: '24/7 support and insurance coverage'
    },
    {
      icon: '📱',
      title: 'Smart App',
      description: 'Optimized routes and intelligent ride matching'
    },
    {
      icon: '🏆',
      title: 'Rewards Program',
      description: 'Earn bonuses and incentives for great service'
    }
  ];

  const adminFeatures = [
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights into platform performance'
    },
    {
      icon: '👥',
      title: 'User Management',
      description: 'Manage riders, drivers, and their accounts efficiently'
    },
    {
      icon: '🚨',
      title: 'Safety Monitoring',
      description: 'Real-time monitoring and emergency response systems'
    },
    {
      icon: '💼',
      title: 'Business Tools',
      description: 'Advanced tools for fleet management and operations'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Designed for riders, drivers, and administrators. Experience the complete ride-sharing ecosystem.
          </p>
        </div>

        {/* Rider Features */}
        <section id="rider" className="mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-12">
              <div className="text-4xl mb-4">👤</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Riders</h2>
              <p className="text-gray-600 text-lg">
                Enjoy a seamless ride-booking experience with features designed for your convenience and safety.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {riderFeatures.map((feature, index) => (
                <div key={index} className="bg-blue-50 rounded-xl p-6 text-center hover:bg-blue-100 transition-colors">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Riding
              </button>
            </div>
          </div>
        </section>

        {/* Driver Features */}
        <section id="driver" className="mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-12">
              <div className="text-4xl mb-4">🚙</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Drivers</h2>
              <p className="text-gray-600 text-lg">
                Maximize your earnings with flexible schedules and powerful driver tools.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {driverFeatures.map((feature, index) => (
                <div key={index} className="bg-green-50 rounded-xl p-6 text-center hover:bg-green-100 transition-colors">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Become a Driver
              </button>
            </div>
          </div>
        </section>

        {/* Admin Features */}
        <section id="admin" className="mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-12">
              <div className="text-4xl mb-4">⚙️</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Administrators</h2>
              <p className="text-gray-600 text-lg">
                Comprehensive tools to manage and grow your ride-sharing platform efficiently.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {adminFeatures.map((feature, index) => (
                <div key={index} className="bg-purple-50 rounded-xl p-6 text-center hover:bg-purple-100 transition-colors">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6">Feature</th>
                  <th className="text-center py-4 px-6">Rider</th>
                  <th className="text-center py-4 px-6">Driver</th>
                  <th className="text-center py-4 px-6">Admin</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-semibold">Real-time Tracking</td>
                  <td className="text-center py-4 px-6">✅</td>
                  <td className="text-center py-4 px-6">✅</td>
                  <td className="text-center py-4 px-6">✅</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-semibold">Payment Processing</td>
                  <td className="text-center py-4 px-6">✅</td>
                  <td className="text-center py-4 px-6">✅</td>
                  <td className="text-center py-4 px-6">✅</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-semibold">User Management</td>
                  <td className="text-center py-4 px-6">❌</td>
                  <td className="text-center py-4 px-6">❌</td>
                  <td className="text-center py-4 px-6">✅</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-semibold">Analytics Dashboard</td>
                  <td className="text-center py-4 px-6">❌</td>
                  <td className="text-center py-4 px-6">✅</td>
                  <td className="text-center py-4 px-6">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Features;