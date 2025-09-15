import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { BusinessesResponse } from "@/types/businesses.types";

interface BusinessListProps {
	businesses: BusinessesResponse[];
	onEdit: (business: BusinessesResponse) => void;
	onDelete: (business: BusinessesResponse) => void;
	onViewDetails: (business: BusinessesResponse) => void;
}

export default function BusinessList({
	businesses,
	onEdit,
	onDelete,
	onViewDetails,
}: BusinessListProps) {
	if (businesses.length === 0) {
		return null;
	}

	return (
		<Table>
			<TableHeader>
				<TableRow className="border-dashed">
					<TableHead className="text-left">İşletme ID</TableHead>
					<TableHead className="text-center">İsim</TableHead>
					<TableHead className="text-center">Organizasyon</TableHead>
					<TableHead className="text-center">E-posta</TableHead>
					<TableHead className="text-center">Adres</TableHead>
					<TableHead className="text-right px-12">İşlemler</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{businesses.map((business) => (
					<TableRow key={business.id}>
						<TableCell className="font-medium text-left">
							#{business.id.toString().padStart(3, "0")}
						</TableCell>
						<TableCell className="text-center">
							<span className="font-medium">{business.name}</span>
						</TableCell>
						<TableCell className="text-center">
							<div className="font-medium">
								{business.organization?.name || "N/A"}
							</div>
						</TableCell>
						<TableCell className="text-center">{business.ownerEmail}</TableCell>
						<TableCell className="text-center">
							<div className="max-w-xs mx-auto truncate">
								{business.address || "Adres belirtilmemiş"}
							</div>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex items-center justify-end gap-2">
								<Button
									variant="listInfo"
									size="listIcon"
									onClick={() => onViewDetails(business)}
									title="Detayları Görüntüle"
								>
									<Eye className="h-4 w-4" />
								</Button>
								<Button
									variant="listSuccess"
									size="listIcon"
									onClick={() => onEdit(business)}
									title="Düzenle"
								>
									<Edit className="h-4 w-4" />
								</Button>
								<Button
									variant="listDanger"
									size="listIcon"
									onClick={() => onDelete(business)}
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
