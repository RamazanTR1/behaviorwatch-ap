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
						console.log("Header button clicked");
						// Desktop'ta sidebar toggle, mobile'da mobile toggle
						if (window.innerWidth >= 768) {
							console.log("Desktop - Calling onSidebarToggle");
							onSidebarToggle?.();
						} else {
							console.log("Mobile - Calling onMobileToggle");
							onMobileToggle?.();
						}
					}}
					className="shadow-sm bg-btn-secondary-hover hover:bg-black rounded-sm size-10"
				>
					<Menu className="size-6 text-white" />
				</Button>
			</div>

			{/* Right Section - Header Actions */}
			<div className="flex items-center gap-3">
				{/* Notifications */}
				<Button variant="outline" size="icon" className="relative shadow-sm">
					<Bell className="h-4 w-4" />
					<Badge
						variant="destructive"
						className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
					>
						3
					</Badge>
				</Button>

				{/* Theme Toggle */}
				<DarkModeToggle />
			</div>
		</header>
	);
}
