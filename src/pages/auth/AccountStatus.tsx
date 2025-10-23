/* eslint-disable @typescript-eslint/no-explicit-any */
// // pages/AccountStatus.tsx
// import Layout from '@/components/layout/CommonLayout';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import type { RootState } from '@/redux/store';
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router';

// const AccountStatus: React.FC = () => {
//   const { user } = useSelector((state: RootState) => state.auth);
// console.log(user)
//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Card className="w-[400px]">
//           <CardHeader>
//             <CardTitle>User Not Found</CardTitle>
//             <CardDescription>Please log in to access this page</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button asChild className="w-full">
//               <Link to="/login">Login</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const getStatusInfo = () => {
   
//     switch (user.status) {
//       case 'blocked':
//         return {
//           title: 'Account Blocked',
//           icon: '🚫',
//           message: 'Your account has been temporarily blocked due to violation of our terms of service.',
//           instructions: 'Please contact our support team to resolve this issue. This usually takes 24-48 hours to review.',
//           contactMethods: [
//             { type: 'email', value: 'support@rideshare.com', label: 'Email Support' },
//             { type: 'phone', value: '+1 (555) 123-4567', label: 'Call Support' },
//           ],
//           variant: 'destructive' as const
//         };
//       case 'suspended':
//         return {
//           title: 'Account Suspended',
//           icon: '⏸️',
//           message: 'Your account has been suspended pending investigation.',
//           instructions: 'This process usually takes 3-5 business days. Our team will review your account and contact you.',
//           contactMethods: [
//             { type: 'email', value: 'appeals@rideshare.com', label: 'Appeals Department' },
//           ],
//           variant: 'warning' as const
//         };
//       default:
//         return {
//           title: 'Account Issue',
//           icon: '❓',
//           message: 'There is an issue with your account status.',
//           instructions: 'Please contact support for assistance.',
//           contactMethods: [
//             { type: 'email', value: 'support@rideshare.com', label: 'Contact Support' },
//           ],
//           variant: 'default' as const
//         };
//     }
//   };

//   const statusInfo = getStatusInfo();

//   return (
//     <Layout>
//       <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <Card>
//             <CardHeader className="text-center space-y-6">
//               <div className="flex justify-center">
//                 <Avatar className="h-16 w-16 bg-muted">
//                   <AvatarFallback className="text-2xl">
//                     {statusInfo.icon}
//                   </AvatarFallback>
//                 </Avatar>
//               </div>
//               <div className="space-y-2">
//                 <CardTitle className="text-2xl">{statusInfo.title}</CardTitle>
//                 <CardDescription className="text-base">
//                   {statusInfo.message}
//                 </CardDescription>
//                 <Badge variant= "destructive" className="mt-2">
//                   {user.status?.toUpperCase()}
//                 </Badge>
//               </div>
//             </CardHeader>

//             <CardContent className="space-y-6">
//               <Alert className="bg-yellow-50 border-yellow-200">
//                 <span className="text-yellow-600">💡</span>
//                 <AlertTitle className="text-yellow-800">What to do next</AlertTitle>
//                 <AlertDescription className="text-yellow-700">
//                   {statusInfo.instructions}
//                 </AlertDescription>
//               </Alert>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium text-foreground">Contact Support</h3>
//                 <div className="space-y-3">
//                   {statusInfo.contactMethods.map((method, index) => (
//                     <Button
//                       key={index}
//                       variant="outline"
//                       className="w-full justify-start h-auto py-3 px-4"
//                       asChild
//                     >
//                       <a
//                         href={method.type === 'email' ? `mailto:${method.value}` : `tel:${method.value}`}
//                         className="no-underline"
//                       >
//                         <div className="flex flex-col items-start">
//                           <span className="font-medium text-foreground">{method.label}</span>
//                           <span className="text-sm text-muted-foreground">{method.value}</span>
//                         </div>
//                       </a>
//                     </Button>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex flex-col space-y-4 pt-4">
//                 <Button
//                   variant="ghost"
//                   onClick={() => window.history.back()}
//                   className="w-full"
//                 >
//                   ← Go Back
//                 </Button>
                
//                 <Button variant="link" asChild className="w-full">
//                   <Link to="/logout" className="text-muted-foreground hover:text-foreground">
//                     Sign out
//                   </Link>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AccountStatus;


// pages/AccountStatus.tsx
import Layout from '@/components/layout/CommonLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const AccountStatus: React.FC = () => {
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const [blockedUser, setBlockedUser] = useState<any>(null);

  useEffect(() => {
    // Check localStorage for blocked user data if Redux user is null
    if (!authUser) {
      const storedBlockedUser = localStorage.getItem('blockedUser');
      if (storedBlockedUser) {
        try {
          const userData = JSON.parse(storedBlockedUser);
          setBlockedUser(userData);
        } catch (error) {
          console.error('Error parsing blocked user data:', error);
          localStorage.removeItem('blockedUser');
        }
      }
    }
  }, [authUser]);

  // Use authUser first, fallback to blockedUser from localStorage
  const user = authUser || blockedUser;

  console.log('User data:', user); // Debug log

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>User Not Found</CardTitle>
            <CardDescription>Please log in to access this page</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusInfo = () => {
    // Use status from user, default to 'blocked' for temporary users
    const status = user.status || (user.isTemporary ? 'blocked' : 'active');
    
    switch (status) {
      case 'blocked':
        return {
          title: 'Account Blocked',
          icon: '🚫',
          message: 'Your account has been temporarily blocked due to violation of our terms of service.',
          instructions: 'Please contact our support team to resolve this issue. This usually takes 24-48 hours to review.',
          contactMethods: [
            { type: 'email', value: 'support@rideshare.com', label: 'Email Support' },
            { type: 'phone', value: '+1 (555) 123-4567', label: 'Call Support' },
          ],
          variant: 'destructive' as const
        };
      case 'suspended':
        return {
          title: 'Account Suspended',
          icon: '⏸️',
          message: 'Your account has been suspended pending investigation.',
          instructions: 'This process usually takes 3-5 business days. Our team will review your account and contact you.',
          contactMethods: [
            { type: 'email', value: 'appeals@rideshare.com', label: 'Appeals Department' },
          ],
          variant: 'warning' as const
        };
      default:
        return {
          title: 'Account Issue',
          icon: '❓',
          message: 'There is an issue with your account status.',
          instructions: 'Please contact support for assistance.',
          contactMethods: [
            { type: 'email', value: 'support@rideshare.com', label: 'Contact Support' },
          ],
          variant: 'default' as const
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Layout>
      <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Card>
            <CardHeader className="text-center space-y-6">
              <div className="flex justify-center">
                <Avatar className="h-16 w-16 bg-muted">
                  <AvatarFallback className="text-2xl">
                    {statusInfo.icon}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl">{statusInfo.title}</CardTitle>
                <CardDescription className="text-base">
                  {statusInfo.message}
                </CardDescription>
                <Badge variant="destructive" className="mt-2">
                  {user.status?.toUpperCase() || 'BLOCKED'}
                </Badge>
                {user.isTemporary && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Using temporary user data
                  </p>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Alert className="bg-yellow-50 border-yellow-200">
                <span className="text-yellow-600">💡</span>
                <AlertTitle className="text-yellow-800">What to do next</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  {statusInfo.instructions}
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Contact Support</h3>
                <div className="space-y-3">
                  {statusInfo.contactMethods.map((method, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto py-3 px-4"
                      asChild
                    >
                      <a
                        href={method.type === 'email' ? `mailto:${method.value}` : `tel:${method.value}`}
                        className="no-underline"
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-foreground">{method.label}</span>
                          <span className="text-sm text-muted-foreground">{method.value}</span>
                        </div>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-4 pt-4">
                <Button
                  variant="ghost"
                  onClick={() => window.history.back()}
                  className="w-full"
                >
                  ← Go Back
                </Button>
                
                <Button variant="link" asChild className="w-full">
                  <Link 
                    to="/logout" 
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      // Clean up localStorage on logout
                      localStorage.removeItem('blockedUser');
                    }}
                  >
                    Sign out
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AccountStatus;