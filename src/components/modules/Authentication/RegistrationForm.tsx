

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// Schema matching IRegisterRequest interface
const registerSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters",
    }),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    password: z.string().min(6, { 
      message: "Password must be at least 6 characters" 
    }),
    confirmPassword: z.string().min(6, { 
      message: "Confirm Password must be at least 6 characters" 
    }),
    role: z.enum(["rider", "driver"]),
    // Driver-specific fields (optional)
    licenseNumber: z.string().optional(),
    vehicleModel: z.string().optional(),
    vehiclePlate: z.string().optional(),
    vehicleColor: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => {
    // If role is driver, license number is required
    if (data.role === "driver" && !data.licenseNumber) {
      return false;
    }
    return true;
  }, {
    message: "License number is required for drivers",
    path: ["licenseNumber"],
  })
  .refine((data) => {
    // If role is driver, vehicle info is required
    if (data.role === "driver" && (!data.vehicleModel || !data.vehiclePlate)) {
      return false;
    }
    return true;
  }, {
    message: "Vehicle model and plate are required for drivers",
    path: ["vehicleModel"],
  });

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "rider",
      licenseNumber: "",
      vehicleModel: "",
      vehiclePlate: "",
      vehicleColor: "",
    },
  });

  // Watch role to conditionally show driver fields
  const selectedRole = form.watch("role");

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    // Prepare data according to IRegisterRequest interface
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
      ...(data.role === "driver" && {
        licenseNumber: data.licenseNumber,
        vehicleInfo: {
          model: data.vehicleModel!,
          plate: data.vehiclePlate!,
          ...(data.vehicleColor && { color: data.vehicleColor }),
        },
      }),
    };

    try {
      const result = await register(userInfo).unwrap();
      
      if (result.success) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error);
      
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic Information */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+1234567890"
                    type="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Selection */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>I want to join as</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="rider">Rider</SelectItem>
                    <SelectItem value="driver">Driver</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose how you want to use the platform
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Driver Specific Fields */}
          {selectedRole === "driver" && (
            <>
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver License Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="DL123456789"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your official driver's license number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vehicleModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Toyota Camry"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehiclePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Plate</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ABC-123"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="vehicleColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Color (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Red"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Passwords */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Password {...field} />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="Confirm your password" />
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
            {isLoading ? "Creating Account..." : "Create Account"}
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
        type="button"
        variant="outline"
        className="w-full"
      >
        Sign up with Google
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline font-medium">
          Login
        </Link>
      </div>
    </div>
  );
}