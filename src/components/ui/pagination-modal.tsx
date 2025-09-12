import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PaginationBarProps = {
  page: number; // 0-indexed
  totalPages: number; // can be 0
  onPageChange: (nextPage: number) => void;
  className?: string;
};

export function PaginationBar({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationBarProps) {
  const canGoPrev = page > 0 && totalPages !== 0;
  const canGoNext = totalPages > 0 && page < totalPages - 1;

  const currentDisplay = totalPages > 0 ? page + 1 : 0;

  return (
    <div
      className={cn(
        "rounded-xl border border-[#E5E5E5] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] p-4 shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-[#666666] dark:text-[#B0B0B0]">
          <span>Sayfa</span>
          <Badge
            variant="outline"
            className="border-[#61E523]/20 bg-[#61E523]/10 px-3 py-1 text-[#61E523]"
          >
            {currentDisplay} / {totalPages}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={!canGoPrev}
            className="transition-all duration-200 border-[#E5E5E5] dark:border-[#2D2D2D] text-[#666666] dark:text-[#B0B0B0] hover:bg-[#FAFAFA] dark:hover:bg-[#2D2D2D] hover:text-[#333333] dark:hover:text-white"
          >
            Önceki
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={!canGoNext}
            className="transition-all duration-200 border-[#E5E5E5] dark:border-[#2D2D2D] text-[#666666] dark:text-[#B0B0B0] hover:bg-[#FAFAFA] dark:hover:bg-[#2D2D2D] hover:text-[#333333] dark:hover:text-white"
          >
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaginationBar;