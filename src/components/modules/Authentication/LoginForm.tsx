


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
import { Separator } from "@/components/ui/separator";
import config from "@/config";
import { cn } from "@/lib/utils";
import { setCredentials, useLoginMutation } from "@/redux/features/auth/auth.api";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
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
        const blockedUser = {
          id: 'temp-' + Date.now(),
          name: data.email.split('@')[0],
          email: data.email,
          role: 'rider' as const,
          status: 'blocked' as const,
        };
        
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
        toast.error(err.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="yourmail@example.com"
                    {...field}
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

      <div className="relative">
        <Separator />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-background px-2 text-sm text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        onClick={() => window.open(`${config.baseUrl}/auth/google`)}
        type="button"
        variant="outline"
        className="w-full"
      >
        Login with Google
      </Button>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-primary hover:underline font-medium">
          Register
        </Link>
      </div>
    </div>
  );
}