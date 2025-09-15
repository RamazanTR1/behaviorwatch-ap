import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
	title: string;
	value: string;
	change: string | null;
	changeType: "increase" | "decrease" | null;
	period: string | null;
	icon: React.ComponentType<{ className?: string }> | null;
	iconBg?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
}

export default function StatsCard({
	title,
	value,
	change,
	changeType,
	period,
	icon: Icon = null,
	iconBg = "primary",
}: StatsCardProps) {
	const getIconBgColor = () => {
		switch (iconBg) {
			case "primary":
				return "bg-primary";
			case "secondary":
				return "bg-secondary";
			case "success":
				return "bg-success";
			case "danger":
				return "bg-danger";
			case "warning":
				return "bg-warning";
			case "info":
				return "bg-info";
			default:
				return "bg-primary";
		}
	};

	const getChangeColor = () => {
		return changeType === "increase" ? "text-success-500" : "text-danger-500";
	};

	return (
		<Card className="p-6 shadow-card-offset border-card-border">
			{/* Title */}
			<div className="text-center mb-4">
				<h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
					{title}
				</h3>
			</div>

			{/* Content */}
			<div className="flex items-center justify-center gap-4">
				{/* Icon */}
				<div
					className={`${getIconBgColor()} rounded-full p-3 flex items-center justify-center`}
				>
					{Icon && <Icon className="h-6 w-6 text-white" />}
				</div>

				{/* Value */}
				<div className="text-center">
					<div className="text-3xl font-bold text-text-primary mb-1">
						{value}
					</div>
				</div>
			</div>

			{/* Change */}
			<div className="text-center mt-4">
				<div className="flex items-center justify-center gap-1">
					<span className={`text-sm font-medium ${getChangeColor()}`}>
						{change}
					</span>
					{changeType === "increase"
						? change && <TrendingUp className={`h-4 w-4 ${getChangeColor()}`} />
						: changeType === "decrease"
						? change && (
								<TrendingDown className={`h-4 w-4 ${getChangeColor()}`} />
						  )
						: null}
				</div>
				<p className="text-xs text-text-secondary mt-1">{period}</p>
			</div>
		</Card>
	);
}
