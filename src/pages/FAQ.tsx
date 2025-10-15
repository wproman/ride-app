import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = {
    general: 'General',
    rider: 'For Riders',
    driver: 'For Drivers',
    payment: 'Payment & Pricing',
    safety: 'Safety & Security'
  };

  const faqItems = [
    {
      id: 1,
      category: 'general',
      question: 'What is RideShare?',
      answer: 'RideShare is a comprehensive ride-booking platform that connects riders with drivers for convenient, affordable, and safe transportation. We operate in 50+ cities and are committed to transforming urban mobility.'
    },
    {
      id: 2,
      category: 'general',
      question: 'How do I create an account?',
      answer: 'You can create an account by downloading our mobile app or visiting our website. Click "Sign Up", provide your email address, phone number, and create a password. You\'ll need to verify your email and phone number to complete registration.'
    },
    {
      id: 3,
      category: 'rider',
      question: 'How do I book a ride?',
      answer: 'To book a ride: 1) Open the app and enter your destination, 2) Choose your ride type, 3) Confirm pickup location, 4) Review fare estimate, 5) Tap "Book Ride". You\'ll be matched with a nearby driver instantly.'
    },
    {
      id: 4,
      category: 'rider',
      question: 'Can I schedule rides in advance?',
      answer: 'Yes! You can schedule rides up to 7 days in advance. Go to the booking screen, tap "Schedule", choose your date and time, and confirm. Your ride will be automatically booked at the scheduled time.'
    },
    {
      id: 5,
      category: 'driver',
      question: 'What are the requirements to become a driver?',
      answer: 'To drive with RideShare, you need: 1) Valid driver\'s license, 2) Clean driving record, 3) Vehicle insurance, 4) Vehicle year 2010 or newer, 5) Pass background check, 6) Smartphone with our driver app.'
    },
    {
      id: 6,
      category: 'driver',
      question: 'How do I get paid?',
      answer: 'Drivers earn for each completed ride. Payments are processed weekly via direct deposit or instantly through our instant pay feature. You can track your earnings in real-time through the driver app.'
    },
    {
      id: 7,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards (Visa, MasterCard, American Express), digital wallets (Apple Pay, Google Pay), and in some cities, cash payments. All payments are securely processed through our encrypted system.'
    },
    {
      id: 8,
      category: 'payment',
      question: 'How are fares calculated?',
      answer: 'Fares are based on: base fare + time + distance + demand (surge pricing). You can see a fare estimate before booking. Final fare may vary slightly based on actual route and traffic conditions.'
    },
    {
      id: 9,
      category: 'safety',
      question: 'What safety measures do you have?',
      answer: 'We prioritize safety with: 1) Driver background checks, 2) Real-time ride tracking, 3) Emergency assistance button, 4) Share trip feature, 5) 24/7 support, 6) Driver ratings and reviews.'
    },
    {
      id: 10,
      category: 'safety',
      question: 'What is the SOS feature?',
      answer: 'The SOS button provides immediate assistance during rides. When pressed, it shares your live location with emergency contacts and connects you with emergency services. This feature is available throughout your ride.'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredItems = faqItems.filter(item => 
    item.category === activeCategory && 
    (item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find quick answers to common questions about RideShare. Can't find what you're looking for? 
            <a href="/contact" className="text-blue-600 hover:text-blue-700 ml-1 font-semibold">Contact our support team.</a>
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions or answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
            />
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {Object.entries(categories).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeCategory === key
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full text-left p-6 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        <span className={`transform transition-transform ${
                          openItems.includes(item.id) ? 'rotate-180' : ''
                        }`}>
                          ▼
                        </span>
                      </div>
                      {openItems.includes(item.id) && (
                        <div className="mt-4 text-gray-600 leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <div className="text-4xl mb-4">🤔</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or browse different categories.
                  </p>
                </div>
              )}
            </div>

            {/* Support CTA */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Our support team is available 24/7 to assist you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Support
                </a>
                <a 
                  href="tel:+15551234567" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;