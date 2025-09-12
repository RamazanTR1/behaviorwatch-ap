import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				// Primary Button - Soft style with border
				primary:
					"bg-btn-primary text-primary border border-primary shadow-sm hover:bg-primary hover:text-primary-foreground",
				// Secondary Button - Soft style with border
				secondary:
					"bg-btn-secondary text-secondary border border-secondary shadow-sm hover:bg-secondary hover:text-secondary-foreground",
				// Success Button - Soft style with border
				success:
					"bg-btn-success text-success border border-success shadow-sm hover:bg-success hover:text-success-foreground",
				// Danger Button - Soft style with border
				danger:
					"bg-btn-danger text-destructive border border-destructive shadow-sm hover:bg-destructive hover:text-destructive-foreground",
				// Warning Button - Soft style with border
				warning:
					"bg-btn-warning text-warning border border-warning shadow-sm hover:bg-warning hover:text-warning-foreground",
				// Info Button - Soft style with border
				info: "bg-btn-info text-info border border-info shadow-sm hover:bg-info hover:text-info-foreground",
				// Legacy variants for backward compatibility
				default:
					"bg-btn-primary text-primary border border-primary shadow-sm hover:bg-primary hover:text-primary-foreground",
				destructive:
					"bg-btn-danger text-destructive border border-destructive shadow-sm hover:bg-destructive hover:text-destructive-foreground",
				outline:
					"border border-border bg-background shadow-sm hover:bg-hover hover:text-foreground",
				ghost: "hover:bg-hover hover:text-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				sm: "h-8 px-3 py-1.5 text-sm rounded-md",
				md: "h-9 px-4 py-2 text-base rounded-md",
				lg: "h-11 px-6 py-3 text-lg rounded-md",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
