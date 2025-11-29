"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Search,
  ArrowRight,
  Loader2,
  RefreshCw,
  ShieldCheck
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

// ==========================================
// UTILITIES
// ==========================================
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==========================================
// UI COMPONENTS (Forced Light & Colorful)
// ==========================================

// --- Button ---
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-md",
        outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        link: "text-blue-600 underline-offset-4 hover:underline",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

// --- Input ---
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-white/50 backdrop-blur-sm px-3 py-2 text-sm text-slate-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// --- Card Components ---
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border border-white/50 bg-white/80 backdrop-blur-md text-slate-950 shadow-xl", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-bold leading-none tracking-tight text-slate-900", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-slate-500", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// --- Badge ---
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
        secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-slate-950 border-slate-200",
        success: "border-transparent bg-green-100 text-green-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// --- Separator ---
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-slate-200",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

// --- Alert ---
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-950",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-950 border-slate-200",
        destructive: "border-red-200 bg-red-50 text-red-900 [&>svg]:text-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";


// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

interface Stage {
  department: string;
  status: string;
  updatedAt: string;
  remarks?: string;
}

interface Complaint {
  trackingId: string;
  status: string;
  category: { name: string };
  submissionDate: string;
  location: { locality: string; city: string; district: string };
  description: string;
  stages: Stage[];
}

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- CAPTCHA STATE ---
  const [captchaCode, setCaptchaCode] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  
  // New state for verifying animation
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setUserCaptcha("");
    setIsCaptchaVerified(false);
    setCaptchaError(false);
  };

  const handleVerifyCaptcha = (e: React.MouseEvent) => {
    e.preventDefault();
    setVerifying(true); // Start loading spinner

    // 1. DELAY FOR 3 SECONDS
    setTimeout(() => {
      if (userCaptcha.toUpperCase() === captchaCode) {
        setIsCaptchaVerified(true);
        setCaptchaError(false);
      } else {
        setCaptchaError(true);
        setUserCaptcha("");
        generateCaptcha(); 
      }
      setVerifying(false); // Stop loading spinner
    }, 3000);
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaVerified) return;
    if (!trackingId.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // 2. DELAY FOR 3 SECONDS BEFORE FETCHING
      await new Promise(resolve => setTimeout(resolve, 3000));

      const res = await fetch(`/api/complaints/track/${trackingId}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Complaint not found");
      } else {
        setResult(data.complaint);
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "REGISTERED": return "bg-blue-600";
      case "UNDER_PROCESSING": return "bg-amber-500";
      case "FORWARDED": return "bg-purple-600";
      case "COMPLETED": return "bg-emerald-600";
      case "REJECTED": return "bg-red-600";
      default: return "bg-slate-600";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
            Swaraj Track
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Monitor the status of your grievance in real-time
          </p>
        </div>

        {/* Search Card */}
        <Card className="border-white/60">
          <CardHeader>
            <CardTitle>Track a Complaint</CardTitle>
            <CardDescription>Enter the unique 10-character Tracking ID sent to your email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <form onSubmit={handleTrack} className="space-y-4">
              
              {/* 1. Tracking ID Input */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-slate-700">Tracking ID</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Ex: TRK8X92M1"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                    className="pl-9 font-mono uppercase tracking-wide bg-white shadow-sm border-slate-200"
                    maxLength={15}
                  />
                </div>
              </div>

              {/* 2. Captcha Section */}
              <div className="flex flex-col space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Security Verification</label>
                 
                 {!isCaptchaVerified ? (
                   <div className="flex flex-col sm:flex-row gap-3">
                     {/* Captcha Display */}
                     <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-4 py-2 rounded-md select-none shadow-inner">
                       <span className="font-mono text-lg font-bold tracking-widest text-slate-700 decoration-wavy line-through decoration-slate-400/50">
                         {captchaCode}
                       </span>
                       <button
                         type="button"
                         onClick={generateCaptcha}
                         className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                         title="Refresh Captcha"
                       >
                         <RefreshCw className="h-4 w-4 text-slate-500" />
                       </button>
                     </div>

                     {/* Captcha Input */}
                     <div className="flex-1 flex gap-2">
                        <Input
                          placeholder="Enter code"
                          value={userCaptcha}
                          onChange={(e) => {
                            setUserCaptcha(e.target.value.toUpperCase());
                            setCaptchaError(false);
                          }}
                          className={cn(
                            "uppercase font-mono bg-white shadow-sm",
                            captchaError && "border-red-500 focus-visible:ring-red-500"
                          )}
                          maxLength={6}
                        />
                        <Button 
                          type="button" 
                          variant="secondary"
                          onClick={handleVerifyCaptcha}
                          disabled={!userCaptcha || verifying} 
                          className="bg-slate-200 hover:bg-slate-300 text-slate-800 min-w-[80px]"
                        >
                          {verifying ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Verify"
                          )}
                        </Button>
                     </div>
                   </div>
                 ) : (
                   <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-md shadow-sm">
                     <ShieldCheck className="h-5 w-5" />
                     <span className="font-medium text-sm">Human verification successful</span>
                   </div>
                 )}
                 
                 {captchaError && (
                   <p className="text-xs text-red-600 font-medium mt-1">Incorrect code. Please try again.</p>
                 )}
              </div>

              <Separator className="bg-slate-200" />

              {/* 3. Submit Button */}
              <Button 
                type="submit" 
                disabled={loading || !isCaptchaVerified} 
                className="w-full sm:w-auto shadow-blue-200/50"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    Track Status
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4 bg-red-50 border-red-200 text-red-900">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <Card className="overflow-hidden border-white/60 shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Status Banner */}
            <div className={`p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${getStatusColor(result.status)}`}>
              <div className="space-y-1">
                <p className="text-white/80 text-sm font-bold uppercase tracking-wider">Tracking ID</p>
                <h2 className="text-3xl font-mono font-bold tracking-tight text-white drop-shadow-md">{result.trackingId}</h2>
              </div>
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-bold bg-white/25 hover:bg-white/30 text-white border border-white/40 backdrop-blur-md">
                {result.status.replace(/_/g, " ")}
              </Badge>
            </div>

            <CardContent className="p-0">
              {/* Key Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/60">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 mb-1">Grievance Category</h3>
                    <p className="font-bold text-slate-900 text-lg flex items-center gap-2">
                      {result.category.name}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 mb-1">Description</h3>
                    <p className="text-slate-800 bg-white p-4 rounded-lg text-sm leading-relaxed border border-slate-100 shadow-sm">
                      {result.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-2 rounded-full shadow-sm">
                      <Calendar className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-500">Submission Date</h3>
                      <p className="font-bold text-slate-900">
                        {format(new Date(result.submissionDate), "PPP")}
                      </p>
                      <p className="text-xs text-slate-500">
                        {format(new Date(result.submissionDate), "p")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-red-100 p-2 rounded-full shadow-sm">
                      <MapPin className="h-4 w-4 text-red-700" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-500">Location</h3>
                      <p className="font-bold text-slate-900">
                        {result.location.locality}, {result.location.city}
                      </p>
                      <p className="text-sm text-slate-500">{result.location.district}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-200" />

              {/* Timeline Section */}
              <div className="p-6 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-600" /> 
                  Resolution Timeline
                </h3>

                <div className="relative space-y-0 pl-2">
                  {/* Vertical Line */}
                  <div className="absolute left-[21px] top-2 bottom-6 w-0.5 bg-slate-300" />

                  {result.stages?.map((stage, i) => (
                    <div key={i} className="relative pl-10 pb-8 last:pb-0 group">
                      {/* Timeline Dot */}
                      <div className={`absolute left-3 top-0 h-5 w-5 rounded-full border-2 border-white shadow-sm z-10 
                        ${i === 0 ? 'bg-green-500 ring-4 ring-green-100' : 'bg-slate-300'}`}>
                        {i === 0 && <CheckCircle2 className="h-full w-full text-white p-0.5" />}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 bg-white p-4 rounded-lg border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-blue-200">
                        <div>
                          <p className="font-bold text-slate-900 flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            {stage.department}
                          </p>
                          <Badge variant="outline" className="mt-1 font-medium border-slate-300 text-slate-700">
                            {stage.status}
                          </Badge>
                          {stage.remarks && (
                             <p className="mt-2 text-sm text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 italic">
                               "{stage.remarks}"
                             </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-600">
                            {format(new Date(stage.updatedAt), "dd MMM yyyy")}
                          </p>
                          <p className="text-xs text-slate-500">
                            {format(new Date(stage.updatedAt), "hh:mm a")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!result.stages || result.stages.length === 0) && (
                    <div className="relative pl-10">
                      <div className="absolute left-3 top-0 h-5 w-5 rounded-full bg-blue-500 ring-4 ring-blue-100 border-2 border-white z-10" />
                      <p className="text-sm text-slate-800 font-bold">Complaint Registered</p>
                      <p className="text-xs text-slate-500">Processing has begun</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}