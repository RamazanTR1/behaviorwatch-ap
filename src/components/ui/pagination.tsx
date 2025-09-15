import { Button } from "@/components/ui/button";
import {
	ChevronLeft,
	ChevronRight,
	ChevronFirst,
	ChevronLast,
} from "lucide-react";

// Dashboard için basit pagination
interface DashboardPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	itemsPerPage: number;
	totalItems: number;
	showingItems: number;
}

// List sayfaları için gelişmiş pagination
interface ListPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
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
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
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
					disabled={currentPage === 1}
					title="Önceki sayfa"
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				{/* Page Numbers */}
				{Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
					let pageNumber;
					if (totalPages <= 3) {
						pageNumber = i + 1;
					} else if (currentPage <= 2) {
						pageNumber = i + 1;
					} else if (currentPage >= totalPages - 1) {
						pageNumber = totalPages - 2 + i;
					} else {
						pageNumber = currentPage - 1 + i;
					}

					return (
						<Button
							key={pageNumber}
							variant="outline"
							size="sm"
							className={`h-8 w-8 p-0 ${
								currentPage === pageNumber
									? "bg-primary text-primary-foreground"
									: ""
							}`}
							onClick={() => onPageChange(pageNumber)}
							title={`Sayfa ${pageNumber}`}
						>
							{pageNumber}
						</Button>
					);
				})}

				{/* Next Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 p-0"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					title="Sonraki sayfa"
				>
					<ChevronRight className="h-4 w-4" />
				</Button>

				{/* Last Page Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 p-0"
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
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
	return (
		<div className="flex items-center justify-between px-6 py-4 bg-card border-t border-border">
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
					className="h-8 px-2 text-sm rounded-none border-r-0"
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
				>
					<ChevronFirst className="h-4 w-4" />
				</Button>
				{/* Previous Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 px-2 text-sm rounded-none border-r-0 border-l-[#343a3f]"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				{/* Page Numbers */}
				{Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
					let pageNumber;
					if (totalPages <= 5) {
						pageNumber = i + 1;
					} else if (currentPage <= 3) {
						pageNumber = i + 1;
					} else if (currentPage >= totalPages - 2) {
						pageNumber = totalPages - 4 + i;
					} else {
						pageNumber = currentPage - 2 + i;
					}

					// const isFirst = i === 0;
					// const isLast = i === Math.min(totalPages, 5) - 1;

					return (
						<Button
							key={pageNumber}
							variant="primary"
							size="sm"
							className={`h-8 w-8 p-0 text-sm rounded-none
							 ${
									currentPage === pageNumber
										? "bg-primary text-primary-foreground z-10"
										: "bg-background border-t-0 border-b-0"
								}`}
							onClick={() => onPageChange(pageNumber)}
						>
							{pageNumber}
						</Button>
					);
				})}

				{/* Next Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 px-2 text-sm rounded-none border-r-[#343a3f]"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
				{/* Last Page Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 px-2 text-sm rounded-none"
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
				>
					<ChevronLast className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}

// Default export - Dashboard için
export default DashboardPagination;
