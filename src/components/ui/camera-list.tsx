import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Camera } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";

interface Camera {
	name: string;
	business: string;
	organization: string;
	status: "active" | "inactive";
}

interface CameraListProps {
	cameras: Camera[];
	activeCount: number;
	totalCount: number;
	currentPage?: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
}

export default function CameraList({
	cameras,
	activeCount,
	totalCount,
	currentPage = 1,
	totalPages = 1,
	onPageChange = () => {},
}: CameraListProps) {
	return (
		<Card className="shadow-card-offset border-card-border">
			{/* Header */}
			<div className="flex items-center justify-between p-6   ">
				<h2 className="text-xl font-semibold text-text-primary tracking-wide">
					Kamera Listesi
				</h2>
				<Button variant="success" className="gap-2">
					Kamera Ekle +
				</Button>
			</div>

			{/* Summary */}
			<div className="px-6 py-3 bg-btn-success text-center border-b border-border">
				<p className="text-sm text-text-primary dark:text-text-secondary">
					<span className="font-semibold ">{totalCount}</span> Kameradan{" "}
					<span className="font-semibold">{activeCount}</span> Tane Aktif
				</p>
			</div>

			{/* Table */}
			<Table>
				<TableHeader>
					<TableRow className="border-b border-card-border border-dashed">
						<TableHead className="text-text-muted uppercase tracking-wide">
							Kamera
						</TableHead>
						<TableHead className="text-text-muted uppercase tracking-wide text-center">
							İşletme - Organizasyon
						</TableHead>
						<TableHead className="text-text-muted uppercase tracking-wide text-right">
							Durum
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{cameras.map((camera, index) => (
						<TableRow key={index} className="hover:bg-hover transition-colors">
							<TableCell className="w-16">
								{/* Camera icon placeholder */}
								<div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
									<Camera className="h-4 w-4" />
								</div>
							</TableCell>
							<TableCell>
								<h3 className="font-medium text-text-primary">{camera.name}</h3>
							</TableCell>
							<TableCell className="text-center">
								<p className="text-sm text-text-primary">
									{camera.business} - {camera.organization}
								</p>
							</TableCell>
							<TableCell className="text-right">
								<div className="flex items-center justify-end gap-2">
									<div
										className={`w-2 h-2 rounded-full ${
											camera.status === "active"
												? "bg-success"
												: "bg-destructive"
										}`}
									></div>
									<span className="text-sm font-medium text-text-primary">
										{camera.status === "active" ? "Aktif" : "Pasif"}
									</span>
								</div>
							</TableCell>
							<TableCell className="w-12">
								<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
									<MoreVertical className="h-4 w-4" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
				itemsPerPage={cameras.length}
				totalItems={totalCount}
				showingItems={cameras.length}
			/>
		</Card>
	);
}
