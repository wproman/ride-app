// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
// import { useChangePasswordMutation } from '@/redux/features/auth/auth.api';
// import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/features/user/profileApi';
// import { RootState } from '@/redux/store';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Check, Edit2, Loader2, X } from 'lucide-react';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import * as z from 'zod';

// // Profile form validation schema
// const profileFormSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   phone: z.string().optional(),
// });

// type ProfileFormValues = z.infer<typeof profileFormSchema>;

// // Password form validation schema
// const passwordFormSchema = z.object({
//   oldPassword: z.string().min(1, 'Current password is required'),
//   newPassword: z.string().min(6, 'Password must be at least 6 characters'),
//   confirmPassword: z.string().min(1, 'Please confirm your password'),
// }).refine((data) => data.newPassword === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// type PasswordFormValues = z.infer<typeof passwordFormSchema>;

// const ProfileManagement = () => {
//   const { user: authUser } = useSelector((state: RootState) => state.auth);
//   const { data: response, isLoading } = useGetProfileQuery(undefined);
//   const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  
//   const profileUser = response?.data;
//   const [editMode, setEditMode] = useState(false);

//   // Profile form
//   const profileForm = useForm<ProfileFormValues>({
//     resolver: zodResolver(profileFormSchema),
//     defaultValues: {
//       name: profileUser?.name || '',
//       phone: profileUser?.phone || '',
//     },
//   });

//   // Update form when user data loads
//   React.useEffect(() => {
//     if (profileUser) {
//       profileForm.reset({
//         name: profileUser.name || '',
//         phone: profileUser.phone || '',
//       });
//     }
//   }, [profileUser, profileForm]);

//   const onProfileSubmit = async (data: ProfileFormValues) => {
//     try {
//       await updateProfile({
//         userId: authUser?.id || profileUser?._id,
//         profileData: data
//       }).unwrap();
//       setEditMode(false);
//     } catch (error: any) {
//       console.error('Failed to update profile:', error);
//     }
//   };

//   const onProfileCancel = () => {
//     setEditMode(false);
//     profileForm.reset({
//       name: profileUser?.name || '',
//       phone: profileUser?.phone || '',
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
//           <p className="text-muted-foreground">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-2xl mx-auto space-y-6">
//         {/* Profile Card */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
//             <div>
//               <CardTitle className="text-2xl">Profile Management</CardTitle>
//               <CardDescription>
//                 Manage your account settings and personal information
//               </CardDescription>
//             </div>
//             {!editMode && (
//               <Button 
//                 onClick={() => setEditMode(true)}
//                 variant="outline"
//                 size="sm"
//                 className="gap-2"
//               >
//                 <Edit2 className="h-4 w-4" />
//                 Edit Profile
//               </Button>
//             )}
//           </CardHeader>
//           <CardContent>
//             {editMode ? (
//               <Form {...profileForm}>
//                 <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
//                   <FormField
//                     control={profileForm.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Full Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter your full name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={profileForm.control}
//                     name="phone"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Phone Number</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter your phone number" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormItem>
//                     <FormLabel>Email Address</FormLabel>
//                     <FormControl>
//                       <Input 
//                         value={profileUser?.email || ''} 
//                         disabled 
//                         className="bg-muted"
//                       />
//                     </FormControl>
//                     <FormDescription>
//                       Email address cannot be changed
//                     </FormDescription>
//                   </FormItem>

//                   <div className="flex gap-3 pt-4">
//                     <Button 
//                       type="submit" 
//                       disabled={isUpdating}
//                       className="gap-2"
//                     >
//                       {isUpdating ? (
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                       ) : (
//                         <Check className="h-4 w-4" />
//                       )}
//                       Save Changes
//                     </Button>
//                     <Button 
//                       type="button" 
//                       variant="outline" 
//                       onClick={onProfileCancel}
//                       className="gap-2"
//                     >
//                       <X className="h-4 w-4" />
//                       Cancel
//                     </Button>
//                   </div>
//                 </form>
//               </Form>
//             ) : (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-muted-foreground">
//                       Full Name
//                     </label>
//                     <p className="text-lg font-medium">{profileUser?.name}</p>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-muted-foreground">
//                       Email Address
//                     </label>
//                     <p className="text-lg font-medium">{profileUser?.email}</p>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-muted-foreground">
//                       Phone Number
//                     </label>
//                     <p className="text-lg font-medium">
//                       {profileUser?.phone || 'Not provided'}
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-muted-foreground">
//                       Role
//                     </label>
//                     <Badge variant="secondary" className="capitalize">
//                       {profileUser?.role}
//                     </Badge>
//                   </div>
//                 </div>

//                 <Separator />

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-muted-foreground">
//                     Account Status
//                   </label>
//                   <div className="flex gap-2">
//                     <Badge variant={profileUser?.isActive ? "default" : "secondary"}>
//                       {profileUser?.isActive ? 'Active' : 'Inactive'}
//                     </Badge>
//                     <Badge variant={profileUser?.isVerified ? "default" : "outline"}>
//                       {profileUser?.isVerified ? 'Verified' : 'Not Verified'}
//                     </Badge>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Change Password Card */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Change Password</CardTitle>
//             <CardDescription>
//               Update your password to keep your account secure
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChangePasswordForm />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// // Change Password Component with shadcn/ui
// const ChangePasswordForm = () => {
//   const [changePassword, { isLoading, isSuccess }] = useChangePasswordMutation();
  
//   const form = useForm<PasswordFormValues>({
//     resolver: zodResolver(passwordFormSchema),
//     defaultValues: {
//       oldPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     },
//   });

//   const onSubmit = async (data: PasswordFormValues) => {
//     try {
//       await changePassword({
//         oldPassword: data.oldPassword,
//         newPassword: data.newPassword,
//       }).unwrap();
      
//       form.reset();
//     } catch (error: any) {
//       console.error('Password change failed:', error);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="oldPassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Current Password</FormLabel>
//               <FormControl>
//                 <Input 
//                   type="password" 
//                   placeholder="Enter your current password" 
//                   {...field} 
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="newPassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>New Password</FormLabel>
//               <FormControl>
//                 <Input 
//                   type="password" 
//                   placeholder="Enter new password (min 6 characters)" 
//                   {...field} 
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="confirmPassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Confirm New Password</FormLabel>
//               <FormControl>
//                 <Input 
//                   type="password" 
//                   placeholder="Confirm your new password" 
//                   {...field} 
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="flex gap-3 items-center">
//           <Button 
//             type="submit" 
//             disabled={isLoading}
//             className="gap-2"
//           >
//             {isLoading ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : null}
//             {isLoading ? 'Changing Password...' : 'Change Password'}
//           </Button>

//           {isSuccess && (
//             <Badge variant="default" className="gap-1">
//               <Check className="h-3 w-3" />
//               Password changed successfully
//             </Badge>
//           )}
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default ProfileManagement;


/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useChangePasswordMutation } from '@/redux/features/auth/auth.api';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/features/user/profileApi';
import { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Edit2, Key, Loader2, Mail, Phone, Shield, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as z from 'zod';

// Profile form validation schema
const profileFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Password form validation schema
const passwordFormSchema = z.object({
  oldPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const ProfileManagement = () => {
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { data: response, isLoading } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  
  const profileUser = response?.data;
  const [editMode, setEditMode] = useState(false);

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profileUser?.name || '',
      phone: profileUser?.phone || '',
    },
  });

  // Update form when user data loads
  React.useEffect(() => {
    if (profileUser) {
      profileForm.reset({
        name: profileUser.name || '',
        phone: profileUser.phone || '',
      });
    }
  }, [profileUser, profileForm]);

  const onProfileSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile({
        userId: authUser?.id || profileUser?._id,
        profileData: data
      }).unwrap();
      setEditMode(false);
    } catch (error: any) {
      console.error('Failed to update profile:', error);
    }
  };

  const onProfileCancel = () => {
    setEditMode(false);
    profileForm.reset({
      name: profileUser?.name || '',
      phone: profileUser?.phone || '',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center space-y-4 p-6">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="h-6 w-6" />
                Profile Management
              </CardTitle>
              <CardDescription>
                Manage your account settings and personal information
              </CardDescription>
            </div>
            {!editMode && (
              <Button 
                onClick={() => setEditMode(true)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {editMode ? (
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input 
                        value={profileUser?.email || ''} 
                        disabled 
                        className="bg-muted"
                      />
                    </FormControl>
                    <FormDescription>
                      Email address cannot be changed
                    </FormDescription>
                  </FormItem>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit" 
                      disabled={isUpdating}
                      className="gap-2"
                    >
                      {isUpdating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      Save Changes
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={onProfileCancel}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </label>
                    <p className="text-lg font-medium">{profileUser?.name}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </label>
                    <p className="text-lg font-medium">{profileUser?.email}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </label>
                    <p className="text-lg font-medium">
                      {profileUser?.phone || 'Not provided'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Role
                    </label>
                    <Badge variant="secondary" className="capitalize">
                      {profileUser?.role}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Account Status
                  </label>
                  <div className="flex gap-2">
                    <Badge variant={profileUser?.isActive ? "default" : "secondary"}>
                      {profileUser?.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge variant={profileUser?.isVerified ? "default" : "outline"}>
                      {profileUser?.isVerified ? 'Verified' : 'Not Verified'}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Change Password
            </CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Change Password Component with shadcn/ui
const ChangePasswordForm = () => {
  const [changePassword, { isLoading, isSuccess }] = useChangePasswordMutation();
  
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      
      form.reset();
    } catch (error: any) {
      console.error('Password change failed:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="Enter your current password" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="Enter new password (min 6 characters)" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="Confirm your new password" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 items-center">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Key className="h-4 w-4" />
            )}
            {isLoading ? 'Changing Password...' : 'Change Password'}
          </Button>

          {isSuccess && (
            <Badge variant="default" className="gap-1 bg-green-500">
              <Check className="h-3 w-3" />
              Password changed successfully
            </Badge>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ProfileManagement;