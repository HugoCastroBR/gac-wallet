import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react"; 

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  showPasswordToggle?: boolean; 
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showPasswordToggle = false, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false); 

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev); 
    };

    return (
      <div className="relative">
        <input
          type={showPasswordToggle && isPasswordVisible ? "text" : type} 
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-2 flex items-center"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? <EyeOff /> : <Eye />} 
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
