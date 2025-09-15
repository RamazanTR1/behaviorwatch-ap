import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Video } from "lucide-react";
import { useCameras } from "@/hooks/use-cameras";
import { ListPagination } from "@/components/ui/pagination";
import Breadcrumb from "@/components/ui/breadcrumb";
import SearchComponent from "@/components/ui/search";
import CameraList from "@/components/ui/camera-list";
import type { CameraResponse } from "@/types/cameras.types";

export default function CamerasListPage() {
	const [currentPage, setCurrentPage] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");

	// Mock business ID - gerçek uygulamada route params veya state'ten alınacak
	const businessId = 1;
	const pageSize = 10;
	const sort = "id,desc";

	const {
		data: camerasData,
		isLoading,
		error,
	} = useCameras(businessId, searchTerm, currentPage, pageSize, sort);

	const handleAddCamera = () => {
		console.log("Add camera clicked");
		// TODO: Implement add camera modal/page
	};

	const handleEditCamera = (camera: CameraResponse) => {
		console.log("Edit camera:", camera);
		// TODO: Implement edit camera modal/page
	};

	const handleDeleteCamera = (camera: CameraResponse) => {
		console.log("Delete camera:", camera);
		// TODO: Implement delete confirmation modal
	};

	const handleViewCameraDetails = (camera: CameraResponse) => {
		console.log("View camera details:", camera);
		// TODO: Implement camera details page
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		console.log("Page changed to:", page);
	};

	const handleSearch = (searchValue: string) => {
		setSearchTerm(searchValue);
		setCurrentPage(1); // Reset to first page when searching
		console.log("Search:", searchValue);
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
				{/* Page Header */}
				<div className="flex items-center justify-between flex-wrap gap-3">
					<h1 className="text-2xl font-bold text-text-primary tracking-wide">
						KAMERALAR
					</h1>
				</div>

				<Card className="shadow-card-offset border-card-border">
					<div className="p-6">
						<div className="flex items-center justify-center py-12">
							<div className="text-text-secondary">Yükleniyor...</div>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className="space-y-6">
				{/* Page Header */}
				<div className="flex items-center justify-between flex-wrap gap-3">
					<h1 className="text-2xl font-bold text-text-primary tracking-wide">
						KAMERALAR
					</h1>
				</div>

				<Card className="shadow-card-offset border-card-border">
					<div className="p-6">
						<div className="flex items-center justify-center py-12">
							<div className="text-danger">Veriler yüklenirken hata oluştu</div>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	const cameras = camerasData?.content || [];
	const totalCount = camerasData?.page?.totalElements || 0;
	const totalPages = camerasData?.page?.totalPages || 1;

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="flex items-center justify-between flex-wrap gap-3">
				<h1 className="text-2xl font-bold text-text-primary tracking-wide">
					KAMERALAR
				</h1>
				<Breadcrumb
					items={[
						{ label: "BehaviorWatch", href: "/" },
						{ label: "Kameralar", href: "/cameras" },
					]}
				/>
			</div>

			{/* Cameras Table */}
			{cameras.length > 0 ? (
				<Card className="shadow-card-offset border-card-border">
					{/* Search and Add Section */}
					<div className="flex justify-between items-center p-6">
						<SearchComponent
							placeholder="Kamera ara..."
							onSearch={handleSearch}
							className="w-64 h-10"
						/>
						<Button variant="success" onClick={handleAddCamera}>
							<Plus className="h-4 w-4 mr-2" />
							Kamera Ekle
						</Button>
					</div>
					<CameraList
						cameras={cameras}
						onEdit={handleEditCamera}
						onDelete={handleDeleteCamera}
						onViewDetails={handleViewCameraDetails}
					/>
				</Card>
			) : (
				<Card className="shadow-card-offset border-card-border">
					<div className="flex flex-col items-center justify-center py-12">
						<Video className="h-16 w-16 text-text-muted mb-4" />
						<h3 className="text-lg font-medium text-text-primary mb-2">
							Henüz kamera yok
						</h3>
						<p className="text-text-secondary text-center mb-6">
							İlk kameranızı oluşturmak için "Kamera Ekle" butonuna tıklayın.
						</p>
						<Button variant="success" onClick={handleAddCamera}>
							<Plus className="h-4 w-4 mr-2" />
							Kamera Ekle
						</Button>
					</div>
				</Card>
			)}

			{/* Pagination */}
			{cameras.length > 0 && (
				<ListPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					totalItems={totalCount}
					showingItems={cameras.length}
				/>
			)}
		</div>
	);
}
