import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Video } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { CameraResponse } from "@/types/cameras.types";

interface CameraListProps {
	cameras: CameraResponse[];
	onEdit: (camera: CameraResponse) => void;
	onDelete: (camera: CameraResponse) => void;
	onViewDetails: (camera: CameraResponse) => void;
}

export default function CameraList({
	cameras,
	onEdit,
	onDelete,
	onViewDetails,
}: CameraListProps) {
	if (cameras.length === 0) {
		return null;
	}

	return (
		<Table>
			<TableHeader>
				<TableRow className="border-dashed">
					<TableHead className="text-left">Kamera ID</TableHead>
					<TableHead className="text-center">Kamera Adı</TableHead>
					<TableHead className="text-center">İşletme - Organizasyon</TableHead>
					<TableHead className="text-center">RTSP URL</TableHead>
					<TableHead className="text-center">Durum</TableHead>
					<TableHead className="text-right px-12">İşlemler</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{cameras.map((camera) => (
					<TableRow key={camera.id}>
						<TableCell className="font-medium text-left">
							#{camera.id.toString().padStart(3, "0")}
						</TableCell>
						<TableCell className="text-center">
							<div className="flex items-center justify-center gap-3">
								<div className="h-8 w-8 bg-btn-info rounded-md flex items-center justify-center">
									<Video className="h-4 w-4 text-info" />
								</div>
								<span className="font-medium">{camera.name}</span>
							</div>
						</TableCell>
						<TableCell className="text-center">
							<div>
								<div className="font-medium">
									{camera.business?.name || "N/A"}
								</div>
								<div className="text-xs text-text-muted">
									{camera.business?.organization?.name || "Organizasyon yok"}
								</div>
							</div>
						</TableCell>
						<TableCell className="text-center">
							<div className="max-w-xs mx-auto truncate text-sm">
								{camera.rtspUrl || "RTSP URL belirtilmemiş"}
							</div>
						</TableCell>
						<TableCell className="text-center">
							<Badge
								variant={camera.enabled ? "success" : "danger"}
								className="font-medium"
							>
								{camera.enabled ? "Aktif" : "Pasif"}
							</Badge>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex items-center justify-end gap-2">
								<Button
									variant="listInfo"
									size="listIcon"
									onClick={() => onViewDetails(camera)}
									title="Detayları Görüntüle"
								>
									<Eye className="h-4 w-4" />
								</Button>
								<Button
									variant="listSuccess"
									size="listIcon"
									onClick={() => onEdit(camera)}
									title="Düzenle"
								>
									<Edit className="h-4 w-4" />
								</Button>
								<Button
									variant="listDanger"
									size="listIcon"
									onClick={() => onDelete(camera)}
									title="Sil"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
