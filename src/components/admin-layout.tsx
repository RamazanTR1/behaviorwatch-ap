import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function AdminLayout() {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};

	const toggleMobileSidebar = () => {
		setMobileSidebarOpen(!mobileSidebarOpen);
	};

	const closeMobileSidebar = () => {
		setMobileSidebarOpen(false);
	};

	// Auto-collapse sidebar on lg breakpoint
	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		const handleResize = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				const shouldCollapse = window.innerWidth < 1024;

				// Sadece state değiştiyse güncelle
				setSidebarCollapsed((prev) => {
					if (prev !== shouldCollapse) {
						return shouldCollapse;
					}
					return prev;
				});
			}, 100);
		};

		// Check on mount
		handleResize();

		// Listen for resize
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<div className="min-h-screen bg-background text-foreground transition-colors duration-300">
			<Sidebar
				collapsed={sidebarCollapsed}
				isMobileOpen={mobileSidebarOpen}
				onMobileClose={closeMobileSidebar}
			/>
			<div
				className={`min-h-screen flex flex-col transition-all duration-300 ${
					sidebarCollapsed ? "md:pl-20" : "md:pl-64"
				}`}
			>
				<Header
					onSidebarToggle={toggleSidebar}
					onMobileToggle={toggleMobileSidebar}
				/>
				<main className="flex-1 p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
