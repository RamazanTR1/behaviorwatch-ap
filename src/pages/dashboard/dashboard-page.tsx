import StatsCard from "@/components/stats-card";
import CameraList from "@/components/dashboard-camera-list";
import PersonList from "@/components/person-list";
import { Users, Calendar, Cctv, ShieldAlert, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data from design.json
const statsData = [
	{
		title: "TOPLAM KAMERA SAYISI",
		value: "75",
		icon: Cctv,
		iconBg: "primary" as const,
	},
	{
		title: "TOPLAM KİŞİ SAYISI",
		value: "9",
		icon: Users,
		iconBg: "primary" as const,
	},
	{
		title: "TOPLAM İHLALLER",
		value: "98",
		icon: ShieldAlert,
		iconBg: "primary" as const,
	},
	{
		title: "TOPLAM GÖRÜNTÜLER",
		value: "87K",
		icon: Image,
		iconBg: "primary" as const,
	},
];

// Mock camera data
const cameraData = [
	{
		name: "Kamera 1",
		business: "Yemelik Çiğköfte",
		organization: "Ana Şube",
		status: "active" as const,
	},
	{
		name: "Kamera 2",
		business: "Yemelik Çiğköfte",
		organization: "Şube 2",
		status: "active" as const,
	},
	{
		name: "Kamera 3",
		business: "Kahve Dünyası",
		organization: "Merkez",
		status: "inactive" as const,
	},
	{
		name: "Kamera 4",
		business: "Pizza Palace",
		organization: "Avm Şubesi",
		status: "active" as const,
	},
	{
		name: "Kamera 5",
		business: "Burger King",
		organization: "Ana Cadde",
		status: "active" as const,
	},
];

// Mock person data
const personData = [
	{
		name: "Ramazan Türkyılmaz",
		business: "Yemelik Çiğköfte",
		organization: "Ana Şube",
		email: "ramazan@gmail.com",
		phone: "532 123 45 67",
		title: "Çalışan",
	},
	{
		name: "Murat Gündüz",
		business: "Yemelik Çiğköfte",
		organization: "Şube 2",
		email: "murat@gmail.com",
		phone: "532 987 65 43",
		title: "Yönetici",
	},
	{
		name: "Ali Veli",
		business: "Kahve Dünyası",
		organization: "Merkez",
		email: "ali@gmail.com",
		phone: "532 555 44 33",
		title: "Çalışan",
	},
	{
		name: "Ayşe Demir",
		business: "Pizza Palace",
		organization: "Avm Şubesi",
		email: "ayse@gmail.com",
		phone: "532 777 88 99",
		title: "Kasiyer",
	},
	{
		name: "Mehmet Kaya",
		business: "Burger King",
		organization: "Ana Cadde",
		email: "mehmet@gmail.com",
		phone: "532 111 22 33",
		title: "Müdür",
	},
];

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="flex items-center justify-between flex-wrap gap-3">
				<h1 className="text-2xl font-bold text-text-primary tracking-wider">
					DASHBOARD
				</h1>

				{/* Header Actions */}
				<div className="flex items-center gap-3">
					<Button variant="outline" className="gap-2">
						<Calendar className="h-4 w-4" />
						01 May to 31 May
					</Button>
				</div>
			</div>

			{/* Content with Sidebar */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{/* Left content */}
				<div className="sm:col-span-2 lg:col-span-3 space-y-8">
					{/* Stats cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-8">
						{statsData.map((stat, index) => (
							<StatsCard
								key={index}
								title={stat.title}
								value={stat.value}
								change={null}
								changeType={null}
								period={null}
								icon={stat.icon}
								iconBg={stat.iconBg}
							/>
						))}
					</div>

					{/* Camera List */}
					<CameraList
						cameras={cameraData}
						activeCount={4}
						totalCount={5}
						currentPage={1}
						totalPages={3}
						onPageChange={(page) => console.log("Page changed to:", page)}
					/>

					{/* Person List */}
					<PersonList
						persons={personData}
						currentPage={1}
						totalPages={2}
						onPageChange={(page) =>
							console.log("Person page changed to:", page)
						}
						totalCount={5}
					/>
				</div>

				{/* Right sidebar (Son İhlaller) */}
				<div className="space-y-6 sm:col-span-2 lg:col-span-1">
					<div className="bg-card-bg border border-card-border rounded-sm p-6 shadow-card-offset">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-text-primary">
								Son İhlaller
							</h3>
						</div>

						<div className="space-y-3">
							{/* Mock violation data */}
							<div className="flex items-center justify-between py-2 border-b border-border/50">
								<div>
									<p className="text-sm font-medium text-text-primary">
										İhlal 1
									</p>
									<p className="text-xs text-text-secondary">
										Ramazan Türkyılmaz
									</p>
									<p className="text-xs text-text-muted">Yemelik Çiğköfte</p>
								</div>
								<span className="text-xs bg-btn-danger text-destructive px-2 py-1 rounded">
									Yüksek
								</span>
							</div>

							<div className="flex items-center justify-between py-2 border-b border-border/50">
								<div>
									<p className="text-sm font-medium text-text-primary">
										İhlal 2
									</p>
									<p className="text-xs text-text-secondary">Murat Gündüz</p>
									<p className="text-xs text-text-muted">Yemelik Çiğköfte</p>
								</div>
								<span className="text-xs bg-btn-warning text-warning px-2 py-1 rounded">
									Orta
								</span>
							</div>

							<div className="flex items-center justify-between py-2 border-b border-border/50">
								<div>
									<p className="text-sm font-medium text-text-primary">
										İhlal 3
									</p>
									<p className="text-xs text-text-secondary">Ali Veli</p>
									<p className="text-xs text-text-muted">Yemelik Çiğköfte</p>
								</div>
								<span className="text-xs bg-btn-success text-success px-2 py-1 rounded">
									Düşük
								</span>
							</div>
						</div>

						<Button
							variant="link"
							className="w-full font-normal mt-4 underline underline-offset-4 text-text-primary "
						>
							Tümünü Gör
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
