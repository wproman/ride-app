// pages/AccountStatus.tsx
import Layout from '@/components/layout/CommonLayout';
import type { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';


const AccountStatus: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>User not found. Please <Link to="/login" className="text-blue-600">login</Link>.</div>
      </div>
    );
  }

  const getStatusInfo = () => {
    switch (user.status) {
      case 'blocked':
        return {
          title: 'Account Blocked',
          icon: '🚫',
          message: 'Your account has been temporarily blocked due to violation of our terms of service.',
          instructions: 'Please contact our support team to resolve this issue. This usually takes 24-48 hours to review.',
          contactMethods: [
            { type: 'email', value: 'support@rideshare.com', label: 'Email Support' },
            { type: 'phone', value: '+1 (555) 123-4567', label: 'Call Support' },
          ]
        };
      case 'suspended':
        return {
          title: 'Account Suspended',
          icon: '⏸️',
          message: 'Your account has been suspended pending investigation.',
          instructions: 'This process usually takes 3-5 business days. Our team will review your account and contact you.',
          contactMethods: [
            { type: 'email', value: 'appeals@rideshare.com', label: 'Appeals Department' },
          ]
        };
      default:
        return {
          title: 'Account Issue',
          icon: '❓',
          message: 'There is an issue with your account status.',
          instructions: 'Please contact support for assistance.',
          contactMethods: [
            { type: 'email', value: 'support@rideshare.com', label: 'Contact Support' },
          ]
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-2xl">
                {statusInfo.icon}
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                {statusInfo.title}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {statusInfo.message}
              </p>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-yellow-400">💡</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    What to do next
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{statusInfo.instructions}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Support</h3>
              <div className="space-y-3">
                {statusInfo.contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.type === 'email' ? `mailto:${method.value}` : `tel:${method.value}`}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {method.label}: {method.value}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => window.history.back()}
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                ← Go Back
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/logout"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountStatus;
