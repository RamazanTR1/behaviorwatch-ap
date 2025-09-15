import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";
import { useOrganizations } from "@/hooks/use-organization";
import OrganizationCard from "@/components/ui/organization-card";
import { ListPagination } from "@/components/ui/pagination";
import Breadcrumb from "@/components/ui/breadcrumb";
import SearchComponent from "@/components/ui/search";
import type { OrganizationResponse } from "@/types/organization.types";

export default function OrganizationListPage() {
	const [currentPage, setCurrentPage] = useState(0); // 0-indexed for backend
	const { data: organizationsData, isLoading, error } = useOrganizations();

	const handleAddOrganization = () => {
		console.log("Add organization clicked");
		// TODO: Implement add organization modal/page
	};

	const handleEditOrganization = (organization: OrganizationResponse) => {
		console.log("Edit organization:", organization);
		// TODO: Implement edit organization modal/page
	};

	const handleDeleteOrganization = (organization: OrganizationResponse) => {
		console.log("Delete organization:", organization);
		// TODO: Implement delete confirmation modal
	};

	const handleViewOrganizationDetails = (
		organization: OrganizationResponse
	) => {
		console.log("View organization details:", organization);
		// TODO: Implement organization details page
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page); // page is already 0-indexed from pagination component
		console.log("Page changed to:", page);
	};

	const handleSearch = (searchValue: string) => {
		setCurrentPage(0); // Reset to first page when searching
		console.log("Search:", searchValue);
		// TODO: Implement search functionality
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
				{/* Page Header */}
				<div className="flex items-center justify-between flex-wrap gap-3">
					<h1 className="text-2xl font-bold text-text-primary tracking-wider">
						ORGANİZASYONLAR
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
					<h1 className="text-2xl font-bold text-text-primary tracking-wider">
						ORGANİZASYONLAR
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

	const organizations = organizationsData?.content || [];
	const totalCount = organizationsData?.page?.totalElements || 0;
	const totalPages = organizationsData?.page?.totalPages || 1;

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="flex items-center justify-between flex-wrap gap-3">
				<h1 className="text-2xl font-bold text-text-primary tracking-wide">
					ORGANİZASYONLAR
				</h1>
				<Breadcrumb
					items={[
						{ label: "BehaviorWatch", href: "/" },
						{ label: "Organizasyonlar", href: "/organizations" },
					]}
				/>
			</div>

			{/* Search and Add Section */}
			<div className="flex justify-between items-center gap-5">
				<SearchComponent
					placeholder="Organizasyon ara..."
					onSearch={handleSearch}
					className="w-64 h-10"
				/>
				<Button variant="success" onClick={handleAddOrganization}>
					<Plus className="h-4 w-4 mr-2" />
					Organizasyon Ekle
				</Button>
			</div>
			{/* Organizations Grid */}
			{organizations.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{organizations.map((organization) => (
						<OrganizationCard
							key={organization.id}
							organization={organization}
							onEdit={handleEditOrganization}
							onDelete={handleDeleteOrganization}
							onViewDetails={handleViewOrganizationDetails}
						/>
					))}
				</div>
			) : (
				<Card className="shadow-card-offset border-card-border">
					<div className="flex flex-col items-center justify-center py-12">
						<Building2 className="h-16 w-16 text-text-muted mb-4" />
						<h3 className="text-lg font-medium text-text-primary mb-2">
							Henüz organizasyon yok
						</h3>
						<p className="text-text-secondary text-center mb-6">
							İlk organizasyonunuzu oluşturmak için "Organizasyon Ekle" butonuna
							tıklayın.
						</p>
						<Button variant="success" onClick={handleAddOrganization}>
							<Plus className="h-4 w-4 mr-2" />
							Organizasyon Ekle
						</Button>
					</div>
				</Card>
			)}

			{/* Pagination */}
			{organizations.length > 0 && (
				<ListPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					totalItems={totalCount}
					showingItems={organizations.length}
				/>
			)}
		</div>
	);
}
