import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	itemsPerPage: number;
	totalItems: number;
	showingItems: number;
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	//itemsPerPage,
	totalItems,
	showingItems,
}: PaginationProps) {
	//const startItem = (currentPage - 1) * itemsPerPage + 1;
	//const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex items-center justify-between px-6 py-4 border-t border-card-border">
			<p className="text-sm text-text-secondary">
				Toplam {totalItems} sonuçtan {showingItems} tanesi gösteriliyor.
			</p>
			<div className="flex items-center gap-1">
				{/* Previous Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 p-0"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
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
						>
							{pageNumber}
						</Button>
					);
				})}

				{/* Next Button */}
				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 p-0 "
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
