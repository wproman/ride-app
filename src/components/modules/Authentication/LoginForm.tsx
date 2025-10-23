// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import config from "@/config";
// import { cn } from "@/lib/utils";
// import { useLoginMutation } from "@/redux/features/auth/auth.api";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router"; // Fixed import
// import { toast } from "sonner";

// export function LoginForm({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   const navigate = useNavigate();
//   const form = useForm({
//     defaultValues: {
//       email: "super@gmail.com",
//       password: "12345678",
//     },
//   });
  
//   const [login, { isLoading }] = useLoginMutation();
  
//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     try {
//       const res = await login(data).unwrap();
//       console.log(res);

//       if (res.success) {
//         toast.success("Logged in successfully");
//         navigate("/");
//       }
//     } catch (err: any) { // Fixed: Added proper typing
//       console.error("Login error:", err);

//       // Handle 403 Forbidden (Blocked/Suspended user)
//       if (err?.status === 403) {
//         toast.error("Your account has been restricted. Please contact support.");
//         navigate("/account-status");
//         return;
//       }

//       // Handle other specific errors from your backend
//       if (err?.data?.message === "Password does not match") {
//         toast.error("Invalid credentials");
//       } else if (err?.data?.message === "User is not verified") {
//         toast.error("Your account is not verified");
//         navigate("/verify", { state: { email: data.email } }); // Fixed state object
//       } else if (err?.data?.message === "User is blocked" || err?.data?.message === "User is suspended") {
//         toast.error("Your account has been restricted");
//         navigate("/account-status");
//       } else if (err?.data?.message) {
//         // Show any other error message from backend
//         toast.error(err.data.message);
//       } else {
//         // Generic error
//         toast.error("Login failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold">Login to your account</h1>
//         <p className="text-balance text-sm text-muted-foreground">
//           Enter your email below to login to your account
//         </p>
//       </div>
//       <div className="grid gap-6">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="john@example.com"
//                       {...field}
//                       value={field.value || ""}
//                       autoComplete="email" // Added for accessibility
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="password"
//                       placeholder="********"
//                       {...field}
//                       value={field.value || ""}
//                       autoComplete="current-password" // Added for accessibility
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button 
//               type="submit" 
//               className="w-full" 
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </Button>
//           </form>
//         </Form>

//         <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
//           <span className="relative z-10 bg-background px-2 text-muted-foreground">
//             Or continue with
//           </span>
//         </div>

//         <Button
//           onClick={() => window.open(`${config.baseUrl}/auth/google`)}
//           type="button"
//           variant="outline"
//           className="w-full cursor-pointer"
//         >
//           Login with Google
//         </Button>
//       </div>
//       <div className="text-center text-sm">
//         Don&apos;t have an account?{" "}
//         <Link to="/register" replace className="underline underline-offset-4">
//           Register
//         </Link>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { cn } from "@/lib/utils";
import { setCredentials, useLoginMutation } from "@/redux/features/auth/auth.api";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux"; // ADD THIS
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ADD THIS
  const form = useForm({
    defaultValues: {
      email: "super@gmail.com",
      password: "12345678",
    },
  });
  
  const [login, { isLoading }] = useLoginMutation();
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log(res);

      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err: any) {
      console.error("Login error:", err);

      // Handle 403 Forbidden (Blocked/Suspended user)
      if (err?.status === 403) {
        // Create a temporary blocked user object
        const blockedUser = {
          id: 'temp-' + Date.now(),
          name: data.email.split('@')[0],
          email: data.email,
          role: 'rider' as const,
          status: 'blocked' as const,
        };
        
        // Set the blocked user in Redux state
        dispatch(setCredentials({ user: blockedUser }));
        
        toast.error("Your account has been restricted. Please contact support.");
        navigate("/account-status");
        return;
      }

      // Handle other specific errors from your backend
      if (err?.data?.message === "Password does not match") {
        toast.error("Invalid credentials");
      } else if (err?.data?.message === "User is not verified") {
        toast.error("Your account is not verified");
        navigate("/verify", { state: { email: data.email } });
      } else if (err?.data?.message === "User is blocked" || err?.data?.message === "User is suspended") {
        // Create appropriate user object based on the message
        const status = err?.data?.message.includes('blocked') ? 'blocked' as const : 'suspended' as const;
        const restrictedUser = {
          id: 'temp-' + Date.now(),
          name: data.email.split('@')[0],
          email: data.email,
          role: 'rider' as const,
          status: status,
        };
        
        dispatch(setCredentials({ user: restrictedUser }));
        toast.error("Your account has been restricted");
        navigate("/account-status");
      } else if (err?.data?.message) {
        // Show any other error message from backend
        toast.error(err.data.message);
      } else {
        // Generic error
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          onClick={() => window.open(`${config.baseUrl}/auth/google`)}
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}