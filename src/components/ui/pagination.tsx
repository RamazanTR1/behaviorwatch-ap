import { Button } from "@/components/ui/button";
import {
	ChevronLeft,
	ChevronRight,
	ChevronFirst,
	ChevronLast,
} from "lucide-react";

// Dashboard için basit pagination
interface DashboardPaginationProps {
	currentPage: number; // 0-indexed backend page
	totalPages: number;
	onPageChange: (page: number) => void; // Returns 0-indexed page
	itemsPerPage: number;
	totalItems: number;
	showingItems: number;
}

// List sayfaları için gelişmiş pagination
interface ListPaginationProps {
	currentPage: number; // 0-indexed backend page
	totalPages: number;
	onPageChange: (page: number) => void; // Returns 0-indexed page
	totalItems: number;
	showingItems: number;
}

export function DashboardPagination({
	currentPage,
	totalPages,
	onPageChange,
	totalItems,
	showingItems,
}: DashboardPaginationProps) {
	// Backend 0-indexed, UI 1-indexed
	const displayCurrentPage = currentPage + 1;

	return (
		<div className="flex items-center justify-between px-6 py-4 border-t border-card-border">
			<p className="text-sm text-text-secondary">
				Toplam <span className="font-semibold">{totalItems}</span> sonuçtan{" "}
				<span className="font-semibold">{showingItems}</span> tanesi
				gösteriliyor
			</p>
			<div className="flex items-center gap-1">
				{/* First Page Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 p-0"
					onClick={() => onPageChange(0)}
					disabled={currentPage === 0}
					title="İlk sayfa"
				>
					<ChevronFirst className="h-4 w-4" />
				</Button>

				{/* Previous Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 p-0"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 0}
					title="Önceki sayfa"
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				{/* Page Numbers */}
				{Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
					let displayPageNumber;
					if (totalPages <= 3) {
						displayPageNumber = i + 1;
					} else if (displayCurrentPage <= 2) {
						displayPageNumber = i + 1;
					} else if (displayCurrentPage >= totalPages - 1) {
						displayPageNumber = totalPages - 2 + i;
					} else {
						displayPageNumber = displayCurrentPage - 1 + i;
					}

					// Convert display page (1-indexed) to backend page (0-indexed)
					const backendPage = displayPageNumber - 1;

					return (
						<Button
							key={displayPageNumber}
							variant="outline"
							size="sm"
							className={`h-8 w-8 p-0 ${
								currentPage === backendPage
									? "bg-primary text-primary-foreground"
									: ""
							}`}
							onClick={() => onPageChange(backendPage)}
							title={`Sayfa ${displayPageNumber}`}
						>
							{displayPageNumber}
						</Button>
					);
				})}

				{/* Next Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 p-0"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages - 1}
					title="Sonraki sayfa"
				>
					<ChevronRight className="h-4 w-4" />
				</Button>

				{/* Last Page Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 p-0"
					onClick={() => onPageChange(totalPages - 1)}
					disabled={currentPage === totalPages - 1}
					title="Son sayfa"
				>
					<ChevronLast className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}

export function ListPagination({
	currentPage,
	totalPages,
	onPageChange,
	totalItems,
	showingItems,
}: ListPaginationProps) {
	// Backend 0-indexed, UI 1-indexed
	const displayCurrentPage = currentPage + 1;

	return (
		<div className="flex items-center justify-between px-6 py-4 ">
			{/* Sol taraf - Sonuç sayısı */}
			<div className="text-sm text-text-secondary">
				<span className="font-medium">
					Showing {showingItems} of {totalItems} Results
				</span>
			</div>

			{/* Sağ taraf - Pagination butonları */}
			<div className="flex items-center border border-[#343a3f] rounded-sm overflow-hidden">
				{/* First Page Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 px-2 text-sm rounded-none border-r-0 border-t-0 border-b-0"
					onClick={() => onPageChange(0)}
					disabled={currentPage === 0}
				>
					<ChevronFirst className="h-4 w-4" />
				</Button>
				{/* Previous Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 px-2 text-sm rounded-none border-r-0 border-l-[#343a3f] border-t-0 border-b-0"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 0}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				{/* Page Numbers */}
				{Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
					let displayPageNumber;
					if (totalPages <= 5) {
						displayPageNumber = i + 1;
					} else if (displayCurrentPage <= 3) {
						displayPageNumber = i + 1;
					} else if (displayCurrentPage >= totalPages - 2) {
						displayPageNumber = totalPages - 4 + i;
					} else {
						displayPageNumber = displayCurrentPage - 2 + i;
					}

					// Convert display page (1-indexed) to backend page (0-indexed)
					const backendPage = displayPageNumber - 1;

					return (
						<Button
							key={displayPageNumber}
							variant="primary"
							size="sm"
							className={`h-8 w-8 p-0 text-sm rounded-none
							 ${
									currentPage === backendPage
										? "bg-primary text-primary-foreground z-10"
										: "bg-background border-t-0 border-b-0"
								}`}
							onClick={() => onPageChange(backendPage)}
						>
							{displayPageNumber}
						</Button>
					);
				})}

				{/* Next Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 px-2 text-sm rounded-none border-r-[#343a3f] border-t-0 border-b-0"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages - 1}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
				{/* Last Page Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 px-2 text-sm rounded-none border-t-0 border-b-0"
					onClick={() => onPageChange(totalPages - 1)}
					disabled={currentPage === totalPages - 1}
				>
					<ChevronLast className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}

// Default export - Dashboard için
export default DashboardPagination;
