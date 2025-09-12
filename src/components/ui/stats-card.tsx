import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
	title: string;
	value: string;
	change: string;
	changeType: "increase" | "decrease";
	period: string;
	icon: React.ComponentType<{ className?: string }>;
	iconBg?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
}

export default function StatsCard({
	title,
	value,
	change,
	changeType,
	period,
	icon: Icon,
	iconBg = "primary",
}: StatsCardProps) {
	const getIconBgColor = () => {
		switch (iconBg) {
			case "primary":
				return "bg-primary-500";
			case "secondary":
				return "bg-secondary-500";
			case "success":
				return "bg-success-500";
			case "danger":
				return "bg-danger-500";
			case "warning":
				return "bg-warning-500";
			case "info":
				return "bg-info-500";
			default:
				return "bg-primary-500";
		}
	};

	const getChangeColor = () => {
		return changeType === "increase" ? "text-success-500" : "text-danger-500";
	};

	return (
		<Card className="p-6 shadow-card-offset border-black">
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
					<Icon className="h-6 w-6 text-white" />
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
					{changeType === "increase" ? (
						<TrendingUp className={`h-4 w-4 ${getChangeColor()}`} />
					) : (
						<TrendingDown className={`h-4 w-4 ${getChangeColor()}`} />
					)}
				</div>
				<p className="text-xs text-text-secondary mt-1">{period}</p>
			</div>
		</Card>
	);
}
