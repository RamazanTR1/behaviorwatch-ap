import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./ui/sidebar";
import Header from "./ui/header";

export default function AdminLayout() {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};

	const toggleMobileSidebar = () => {
		console.log(
			"Mobile sidebar toggle clicked, current state:",
			mobileSidebarOpen
		);
		setMobileSidebarOpen(!mobileSidebarOpen);
	};

	const closeMobileSidebar = () => {
		setMobileSidebarOpen(false);
	};

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
