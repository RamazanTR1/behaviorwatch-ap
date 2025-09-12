import StatsCard from "@/components/ui/stats-card";
import {
	ShoppingBag,
	Package,
	DollarSign,
	Users,
	Calendar,
	SortAsc,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data from design.json
const statsData = [
	{
		title: "TOPLAM SİPARİŞLER",
		value: "687.3K",
		change: "-0.19%",
		changeType: "decrease" as const,
		period: "Geçen aya göre",
		icon: ShoppingBag,
		iconBg: "primary" as const,
	},
	{
		title: "TOPLAM İADELER",
		value: "9.62K",
		change: "+26.87%",
		changeType: "increase" as const,
		period: "Geçen aya göre",
		icon: Package,
		iconBg: "primary" as const,
	},
	{
		title: "ORT. SATIŞ KAZANCI",
		value: "$98.24",
		change: "+3.51%",
		changeType: "increase" as const,
		period: "Geçen aya göre",
		icon: DollarSign,
		iconBg: "primary" as const,
	},
	{
		title: "ZİYARET SAYISI",
		value: "87.94M",
		change: "-1.05%",
		changeType: "decrease" as const,
		period: "Geçen aya göre",
		icon: Users,
		iconBg: "primary" as const,
	},
];

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-text-primary">DASHBOARD</h1>

				{/* Header Actions */}
				<div className="flex items-center gap-3">
					<Button variant="outline" className="gap-2">
						<SortAsc className="h-4 w-4" />
						Sırala
					</Button>
					<Button variant="outline" className="gap-2">
						<Calendar className="h-4 w-4" />
						01 May to 31 May
					</Button>
				</div>
			</div>

			{/* Stats Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{statsData.map((stat, index) => (
					<StatsCard
						key={index}
						title={stat.title}
						value={stat.value}
						change={stat.change}
						changeType={stat.changeType}
						period={stat.period}
						icon={stat.icon}
						iconBg={stat.iconBg}
					/>
				))}
			</div>

			{/* Additional Content Placeholder */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-card-background border border-border rounded-lg p-6 shadow-card-offset">
					<h3 className="text-lg font-semibold text-text-primary mb-4">
						Son İhlaller
					</h3>
					<p className="text-text-secondary">
						İhlal verileri burada görüntülenecek...
					</p>
				</div>

				<div className="bg-card-background border border-border rounded-lg p-6 shadow-card-offset">
					<h3 className="text-lg font-semibold text-text-primary mb-4">
						Kamera Durumu
					</h3>
					<p className="text-text-secondary">
						Kamera durum bilgileri burada görüntülenecek...
					</p>
				</div>
			</div>
		</div>
	);
}
