import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  to?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      to,
      children,
      ...props
    },
    ref
  ) => {
    if (to) {
      return (
        <Link
          to={to}
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-ring disabled:opacity-50 disabled:pointer-events-none",
            {
              "bg-PMHS-purple text-white shadow hover:bg-PMHS-purple/90":
                variant === "default",
              "bg-transparent border border-PMHS-purple text-PMHS-purple hover:bg-PMHS-purple/10":
                variant === "outline",
              "bg-transparent text-PMHS-purple hover:bg-PMHS-purple/10":
                variant === "ghost",
              "bg-transparent text-PMHS-purple underline-offset-4 hover:underline":
                variant === "link",
              "bg-purple-pink-gradient text-white shadow-md hover:opacity-90":
                variant === "gradient",
              "h-10 px-4 py-2": size === "default",
              "h-8 px-3 text-xs": size === "sm",
              "h-12 px-6 text-base": size === "lg",
              "h-10 w-10 p-0": size === "icon",
            },
            className
          )}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-ring disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-PMHS-purple text-white shadow hover:bg-PMHS-purple/90":
              variant === "default",
            "bg-transparent border border-PMHS-purple text-PMHS-purple hover:bg-PMHS-purple/10":
              variant === "outline",
            "bg-transparent text-PMHS-purple hover:bg-PMHS-purple/10":
              variant === "ghost",
            "bg-transparent text-PMHS-purple underline-offset-4 hover:underline":
              variant === "link",
            "bg-purple-pink-gradient text-white shadow-md hover:opacity-90":
              variant === "gradient",
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-6 text-base": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
