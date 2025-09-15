import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MoreVertical, Users, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import type { OrganizationResponse } from "@/types/organization.types";

interface OrganizationCardProps {
	organization: OrganizationResponse;
	onEdit?: (organization: OrganizationResponse) => void;
	onDelete?: (organization: OrganizationResponse) => void;
	onViewDetails?: (organization: OrganizationResponse) => void;
}

export default function OrganizationCard({
	organization,
	onEdit,
	onDelete,
	onViewDetails,
}: OrganizationCardProps) {
	const [showActions, setShowActions] = useState(false);

	return (
		<Card className="shadow-card-offset border-card-border hover:shadow-hover transition-all duration-300 group">
			<div className="p-6">
				{/* Header */}
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-btn-secondary/20 rounded-lg flex items-center justify-center">
							<Building2 className="h-6 w-6 text-secondary" />
						</div>
						<div>
							<h3 className="text-lg font-semibold text-text-primary">
								{organization.name}
							</h3>
							<p className="text-sm text-text-secondary">
								ID: {organization.id}
							</p>
						</div>
					</div>

					{/* Actions Menu */}
					<div className="relative">
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
							onClick={() => setShowActions(!showActions)}
						>
							<MoreVertical className="h-4 w-4" />
						</Button>

						{showActions && (
							<div className="absolute right-0 top-8 z-10 w-48 bg-card-bg border border-card-border rounded-md shadow-card py-1">
								{onViewDetails && (
									<Button
										className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-hover transition-colors flex items-center gap-2"
										onClick={() => {
											onViewDetails(organization);
											setShowActions(false);
										}}
									>
										<Users className="h-4 w-4" />
										Detayları Görüntüle
									</Button>
								)}
								{onEdit && (
									<Button
										variant="success"
										className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-hover transition-colors flex items-center gap-2"
										onClick={() => {
											onEdit(organization);
											setShowActions(false);
										}}
									>
										<Settings className="h-4 w-4" />
										Düzenle
									</Button>
								)}
								{onDelete && (
									<button
										className="w-full px-3 py-2 text-left text-sm text-danger hover:bg-btn-danger/10 transition-colors flex items-center gap-2"
										onClick={() => {
											onDelete(organization);
											setShowActions(false);
										}}
									>
										<Trash2 className="h-4 w-4" />
										Sil
									</button>
								)}
							</div>
						)}
					</div>
				</div>

				{/* Content */}
				<div className="space-y-3">
					<div className="flex items-center justify-between py-2 border-b border-border/50">
						<span className="text-sm text-text-secondary">
							Sahip Kullanıcı ID:
						</span>
						<span className="text-sm font-medium text-text-primary">
							{organization.ownerUserId}
						</span>
					</div>

					{/* Stats placeholder - gerçek data geldiğinde doldurulabilir */}
					<div className="grid grid-cols-2 gap-4 pt-2">
						<div className="text-center">
							<p className="text-2xl font-bold text-text-primary">0</p>
							<p className="text-xs text-text-secondary">İşletme</p>
						</div>
						<div className="text-center">
							<p className="text-2xl font-bold text-text-primary">0</p>
							<p className="text-xs text-text-secondary">Kullanıcı</p>
						</div>
					</div>
				</div>

				{/* Footer Actions */}
				<div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
					{onViewDetails && (
						<Button
							variant="outline"
							size="sm"
							className="flex-1"
							onClick={() => onViewDetails(organization)}
						>
							Detaylar
						</Button>
					)}
					{onEdit && (
						<Button
							variant="secondary"
							size="sm"
							className="flex-1"
							onClick={() => onEdit(organization)}
						>
							Düzenle
						</Button>
					)}
				</div>
			</div>
		</Card>
	);
}
