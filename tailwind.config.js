/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			// Typography from Design System
			fontFamily: {
				sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
			},
			fontSize: {
				xs: "0.75rem",
				sm: "0.875rem",
				base: "1rem",
				lg: "1.125rem",
				xl: "1.25rem",
				"2xl": "1.5rem",
				"3xl": "1.875rem",
			},
			fontWeight: {
				normal: "400",
				medium: "500",
				semibold: "600",
				bold: "700",
			},
			lineHeight: {
				tight: "1.25",
				normal: "1.5",
				relaxed: "1.75",
			},
			letterSpacing: {
				tight: "-0.025em",
				normal: "0",
				wide: "0.025em",
			},

			// Spacing from Design System
			spacing: {
				xs: "0.5rem",
				sm: "0.75rem",
				md: "1rem",
				lg: "1.5rem",
				xl: "2rem",
				"2xl": "3rem",
			},

			// Ensure breakpoints are properly configured
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},

			// Border Radius from Design System
			borderRadius: {
				sm: "0.375rem",
				md: "0.5rem",
				lg: "0.75rem",
				xl: "1rem",
			},

			// Shadows from Design System
			boxShadow: {
				card: "0 1px 3px 0 hsl(var(--card-shadow)), 0 1px 2px 0 hsl(var(--card-shadow))",
				"card-offset": "6px 6px 0px 0px hsl(var(--card-shadow))",
				"button-offset": "3px 3px 0px 0px hsl(var(--primary-btn-text))",
				"sidebar-active":
					"4px 4px 1px 0px hsl(var(--sidebar-active)), 0 1px 2px 0 hsl(var(--sidebar-active))",
			},

			// Animation durations from Design System
			transitionDuration: {
				200: "200ms",
				300: "300ms",
			},

			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				success: {
					DEFAULT: "hsl(var(--success))",
					foreground: "hsl(var(--success-foreground))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
					foreground: "hsl(var(--warning-foreground))",
				},
				info: {
					DEFAULT: "hsl(var(--info))",
					foreground: "hsl(var(--info-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},

				// Design System Specific Colors
				header: {
					bg: "hsl(var(--header-bg))",
					border: "hsl(var(--header-border))",
				},
				sidebar: {
					bg: "hsl(var(--sidebar-bg))",
					active: "hsl(var(--sidebar-active))",
					"active-border": "hsl(var(--sidebar-active-border))",
				},
				hover: "hsl(var(--hover-bg))",

				// Card Colors
				"card-bg": "hsl(var(--card-background))",
				"card-shadow": "hsl(var(--card-shadow))",
				"card-border": "hsl(var(--card-border))",

				// Text Colors
				"text-primary": "hsl(var(--text-primary))",
				"text-secondary": "hsl(var(--text-secondary))",
				"text-muted": "hsl(var(--text-muted))",

				// Button Background Colors
				"btn-primary": "hsl(var(--primary-btn-bg))",
				"btn-secondary": "hsl(var(--secondary-btn-bg))",
				"btn-success": "hsl(var(--success-btn-bg))",
				"btn-danger": "hsl(var(--danger-btn-bg))",
				"btn-warning": "hsl(var(--warning-btn-bg))",
				"btn-info": "hsl(var(--info-btn-bg))",

				// Button Text Colors
				"btn-primary-text": "hsl(var(--primary-btn-text))",
				"btn-secondary-text": "hsl(var(--secondary-btn-text))",
				"btn-success-text": "hsl(var(--success-btn-text))",
				"btn-danger-text": "hsl(var(--danger-btn-text))",
				"btn-warning-text": "hsl(var(--warning-btn-text))",
				"btn-info-text": "hsl(var(--info-btn-text))",

				// Button Hover Colors
				"btn-primary-hover": "hsl(var(--primary-btn-hover))",
				"btn-secondary-hover": "hsl(var(--secondary-btn-hover))",
				"btn-success-hover": "hsl(var(--success-btn-hover))",
				"btn-danger-hover": "hsl(var(--danger-btn-hover))",
				"btn-warning-hover": "hsl(var(--warning-btn-hover))",
				"btn-info-hover": "hsl(var(--info-btn-hover))",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
