import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building } from "lucide-react";
import { useBusinesses } from "@/hooks/use-businesses";
import { ListPagination } from "@/components/ui/pagination";
import Breadcrumb from "@/components/ui/breadcrumb";
import SearchComponent from "@/components/ui/search";
import BusinessList from "@/components/ui/business-list";
import type { BusinessesResponse } from "@/types/businesses.types";

export default function BusinessListPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const { data: businessesData, isLoading, error } = useBusinesses();

	const handleAddBusiness = () => {
		console.log("Add business clicked");
		// TODO: Implement add business modal/page
	};

	const handleEditBusiness = (business: BusinessesResponse) => {
		console.log("Edit business:", business);
		// TODO: Implement edit business modal/page
	};

	const handleDeleteBusiness = (business: BusinessesResponse) => {
		console.log("Delete business:", business);
		// TODO: Implement delete confirmation modal
	};

	const handleViewBusinessDetails = (business: BusinessesResponse) => {
		console.log("View business details:", business);
		// TODO: Implement business details page
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		console.log("Page changed to:", page);
	};

	const handleSearch = (searchValue: string) => {
		console.log("Search:", searchValue);
		// TODO: Implement search functionality
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
				{/* Page Header */}
				<div className="flex items-center justify-between flex-wrap gap-3">
					<h1 className="text-2xl font-bold text-text-primary tracking-wide">
						İŞLETMELER
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
						İŞLETMELER
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

	const businesses = businessesData?.content || [];
	const totalCount = businessesData?.page?.totalElements || 0;
	const totalPages = businessesData?.page?.totalPages || 1;

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="flex items-center justify-between flex-wrap gap-3">
				<h1 className="text-2xl font-bold text-text-primary tracking-wide">
					İŞLETMELER
				</h1>
				<Breadcrumb
					items={[
						{ label: "BehaviorWatch", href: "/" },
						{ label: "İşletmeler", href: "/businesses" },
					]}
				/>
			</div>

			{/* Businesses Table */}
			{businesses.length > 0 ? (
				<Card className="shadow-card-offset border-card-border">
					{/* Search and Add Section */}
					<div className="flex justify-between items-center p-6">
						<SearchComponent
							placeholder="İşletme ara..."
							onSearch={handleSearch}
							className="w-64 h-10"
						/>
						<Button variant="success" onClick={handleAddBusiness}>
							<Plus className="h-4 w-4 mr-2" />
							İşletme Ekle
						</Button>
					</div>
					<BusinessList
						businesses={businesses}
						onEdit={handleEditBusiness}
						onDelete={handleDeleteBusiness}
						onViewDetails={handleViewBusinessDetails}
					/>
				</Card>
			) : (
				<Card className="shadow-card-offset border-card-border">
					<div className="flex flex-col items-center justify-center py-12">
						<Building className="h-16 w-16 text-text-muted mb-4" />
						<h3 className="text-lg font-medium text-text-primary mb-2">
							Henüz işletme yok
						</h3>
						<p className="text-text-secondary text-center mb-6">
							İlk işletmenizi oluşturmak için "İşletme Ekle" butonuna tıklayın.
						</p>
						<Button variant="success" onClick={handleAddBusiness}>
							<Plus className="h-4 w-4 mr-2" />
							İşletme Ekle
						</Button>
					</div>
				</Card>
			)}

			{/* Pagination */}
			{businesses.length > 0 && (
				<ListPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					totalItems={totalCount}
					showingItems={businesses.length}
				/>
			)}
		</div>
	);
}
