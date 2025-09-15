import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DarkModeToggle from "@/components/dark-mode-toggle";
import { Bell, Menu } from "lucide-react";

interface HeaderProps {
	onSidebarToggle?: () => void;
	onMobileToggle?: () => void;
}

export default function Header({
	onSidebarToggle,
	onMobileToggle,
}: HeaderProps) {
	return (
		<header className="sticky top-0 z-30 h-20 bg-header-bg border-b border-dashed border-header-border flex items-center justify-between px-6">
			{/* Left Section - Sidebar Toggle */}
			<div className="flex items-center">
				<Button
					variant="outline"
					size="icon"
					onClick={() => {
						// Desktop'ta sidebar toggle, mobile'da mobile toggle
						if (window.innerWidth >= 768) {
							onSidebarToggle?.();
						} else {
							onMobileToggle?.();
						}
					}}
					className="shadow-sm bg-btn-secondary-hover hover:bg-black rounded-sm relative"
				>
					<Menu className="size-6 text-white" />
					<span className="absolute inset-0 rounded-sm border border-btn-secondary-hover translate-x-1 translate-y-1 -z-10"></span>
				</Button>
			</div>

			{/* Right Section - Header Actions */}
			<div className="flex items-center gap-3">
				{/* Notifications */}
				<Button
					variant="ghost"
					size="icon"
					className="relative border border-card-border rounded-sm shadow-button-offset"
				>
					<Bell className="h-5 w-5" />
					<Badge
						variant="destructive"
						className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
					>
						3
					</Badge>
				</Button>

				{/* Theme Toggle */}
				<DarkModeToggle className="border border-card-border rounded-sm shadow-button-offset" />
			</div>
		</header>
	);
}
