import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";

// Filtre seçenekleri tipleri
export interface FilterOption {
	value: string;
	label: string;
}

export interface FilterConfig {
	sizeOptions: FilterOption[];
	sortOptions: FilterOption[];
}

// Props interface
interface FilterModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSizeChange: (size: string) => void;
	onSortChange: (sort: string) => void;
	currentSize: string;
	currentSort: string;
	totalElements: number;
	filterConfig: FilterConfig;
	title?: string;
	description?: string;
}

export default function FilterModal({
	isOpen,
	onClose,
	onSizeChange,
	onSortChange,
	currentSize,
	currentSort,
	totalElements,
	filterConfig,
	title = "Filtre Ayarları",
	description = "Liste görünümünü özelleştirin",
}: FilterModalProps) {
	const currentSizeOption =
		filterConfig.sizeOptions.find((option) => option.value === currentSize) ||
		filterConfig.sizeOptions[1];
	const currentSortOption =
		filterConfig.sortOptions.find((option) => option.value === currentSort) ||
		filterConfig.sortOptions[0];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2D2D2D]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-[#333333] dark:text-white">
						<Settings className="h-5 w-5 text-[#61E523]" />
						{title}
					</DialogTitle>
					<DialogDescription className="text-[#666666] dark:text-[#B0B0B0]">
						{description}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 py-4">
					{/* Sayfa Başına Öğe Sayısı */}
					<div className="space-y-2">
						<Label className="text-sm font-medium text-[#333333] dark:text-white">
							Sayfa Başına Öğe Sayısı
						</Label>
						<Select value={currentSize} onValueChange={onSizeChange}>
							<SelectTrigger className="bg-white dark:bg-[#2D2D2D] border-[#E5E5E5] dark:border-[#2D2D2D] text-[#333333] dark:text-white focus:border-[#61E523] focus:ring-[#61E523]">
								<SelectValue placeholder="Öğe sayısı seçin" />
							</SelectTrigger>
							<SelectContent className="bg-white dark:bg-[#2D2D2D] border-[#E5E5E5] dark:border-[#2D2D2D]">
								{filterConfig.sizeOptions.map((option) => (
									<SelectItem
										key={option.value}
										value={option.value}
										className="text-[#333333] dark:text-white hover:bg-[#FAFAFA] dark:hover:bg-[#2D2D2D] focus:bg-[#61E523]/10 focus:text-[#61E523]"
									>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Sıralama */}
					<div className="space-y-2">
						<Label className="text-sm font-medium text-[#333333] dark:text-white">
							Sıralama
						</Label>
						<Select value={currentSort} onValueChange={onSortChange}>
							<SelectTrigger className="bg-white dark:bg-[#2D2D2D] border-[#E5E5E5] dark:border-[#2D2D2D] text-[#333333] dark:text-white focus:border-[#61E523] focus:ring-[#61E523]">
								<SelectValue placeholder="Sıralama seçin" />
							</SelectTrigger>
							<SelectContent className="bg-white dark:bg-[#2D2D2D] border-[#E5E5E5] dark:border-[#2D2D2D]">
								{filterConfig.sortOptions.map((option) => (
									<SelectItem
										key={option.value}
										value={option.value}
										className="text-[#333333] dark:text-white hover:bg-[#FAFAFA] dark:hover:bg-[#2D2D2D] focus:bg-[#61E523]/10 focus:text-[#61E523]"
									>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Mevcut ayarlar özeti */}
					<div className="p-3 bg-[#FAFAFA] dark:bg-[#2D2D2D] border border-[#E5E5E5] dark:border-[#2D2D2D] rounded-lg">
						<p className="text-xs text-[#666666] dark:text-[#B0B0B0] mb-1">
							Mevcut Ayarlar:
						</p>
						<p className="text-sm text-[#333333] dark:text-white">
							{currentSizeOption.label} • {currentSortOption.label}
						</p>
						<p className="text-xs text-[#666666] dark:text-[#B0B0B0] mt-1">
							Toplam {totalElements.toLocaleString("tr-TR")} öğe
						</p>
					</div>
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={onClose}
						className="border-[#E5E5E5] dark:border-[#2D2D2D] text-[#666666] dark:text-[#B0B0B0] hover:bg-[#FAFAFA] dark:hover:bg-[#2D2D2D] hover:text-[#333333] dark:hover:text-white"
					>
						Kapat
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
