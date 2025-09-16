import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLoginState } from "@/hooks/use-login-state";
import {
	LayoutDashboard,
	LogOut,
	Users,
	ShieldAlert,
	Building2,
	Building,
	Settings,
	Cctv,
	Video,
	Files,
	FileVideoCamera,
	FileClock,
	FileType2,
	ChevronRight,
	X,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";

interface NavItem {
	to: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	end?: boolean;
	badge?: {
		type: "dot" | "number";
		color: string;
		value?: string | number;
	};
	has_submenu?: boolean;
	submenu?: NavItem[];
}

const NAV_ITEMS = {
	main_nav: [
		{
			to: "/",
			label: "Dashboard",
			icon: LayoutDashboard,
			end: true,
			badge: {
				type: "number" as const,
				color: "success",
				value: "7",
			},
		},
	],
	sections: [
		{
			header: "UYGULAMALAR & SAYFALAR",
			items: [
				{
					to: "/persons",
					label: "Kişiler",
					icon: Users,
				},
				{
					to: "/violations",
					label: "İhlaller",
					icon: ShieldAlert,
				},
				{
					to: "/organizations",
					label: "Organizasyonlar",
					icon: Building2,
				},
				{
					to: "/businesses",
					label: "İşletmeler",
					icon: Building,
				},
				{
					to: "/settings",
					label: "Settings",
					icon: Settings,
				},
				{
					to: "/cameras",
					label: "Kameralar",
					icon: Cctv,
				},
				{
					to: "/videos",
					label: "Görüntüler",
					icon: Video,
				},
				{
					to: "/reports",
					label: "Raporlar",
					icon: Files,
					has_submenu: true,
					submenu: [
						{
							to: "/reports/camera",
							label: "Kamera Raporu",
							icon: FileVideoCamera,
						},
						{
							to: "/reports/timeseries",
							label: "Timeseries",
							icon: FileClock,
						},
						{
							to: "/reports/summary",
							label: "Özet(Summary)",
							icon: FileType2,
						},
					],
				},
			],
		},
	],
};

interface SidebarProps {
	collapsed?: boolean;
	isMobileOpen?: boolean;
	onMobileClose?: () => void;
}

export default function Sidebar({
	collapsed = false,
	isMobileOpen = false,
	onMobileClose,
}: SidebarProps) {
	const { logout, isActionable, isLoading } = useLoginState();
	const navigate = useNavigate();
	const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

	const handleLogout = useCallback(async () => {
		try {
			await logout();
			navigate("/login");
		} catch {
			// noop
		}
	}, [logout, navigate]);

	const toggleSubmenu = useCallback((itemLabel: string) => {
		setExpandedItems((prev) => {
			const newExpanded = new Set(prev);
			if (newExpanded.has(itemLabel)) {
				newExpanded.delete(itemLabel);
			} else {
				newExpanded.add(itemLabel);
			}
			return newExpanded;
		});
	}, []);

	const clearHoverTimeout = useCallback(() => {
		setHoverTimeout((prev) => {
			if (prev) {
				clearTimeout(prev);
			}
			return null;
		});
	}, []);

	const setHoverTimeoutWithDelay = useCallback(
		(callback: () => void, delay = 300) => {
			clearHoverTimeout();
			const timeout = setTimeout(callback, delay);
			setHoverTimeout(timeout);
		},
		[clearHoverTimeout]
	);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (hoverTimeout) {
				clearTimeout(hoverTimeout);
			}
		};
	}, [hoverTimeout]);

	const renderBadge = useCallback((badge: NavItem["badge"]) => {
		if (!badge) return null;

		if (badge.type === "dot") {
			return <div className={`w-2 h-2 rounded-full bg-${badge.color}`}></div>;
		}

		if (badge.type === "number") {
			return (
				<div
					className={`size-5 rounded-full bg-${badge.color} text-white text-xs font-bold flex items-center justify-center`}
				>
					{badge.value}
				</div>
			);
		}

		return null;
	}, []);

	const getNavItemPosition = useCallback((label: string) => {
		const element = document.querySelector(`[data-nav-item="${label}"]`);
		return element?.getBoundingClientRect().top || 0;
	}, []);

	const renderNavItem = useCallback(
		(item: NavItem, isSubmenu = false, isMobile = false) => {
			const Icon = item.icon;
			const isExpanded = expandedItems.has(item.label);
			const isHovered = hoveredItem === item.label;

			return (
				<div
					key={item.to}
					className="relative z-[60]"
					onMouseEnter={() => {
						if (collapsed && !isMobile && item.has_submenu) {
							clearHoverTimeout();
							setHoveredItem(item.label);
						}
					}}
					onMouseLeave={() => {
						if (collapsed && !isMobile && item.has_submenu) {
							setHoverTimeoutWithDelay(() => setHoveredItem(null));
						}
					}}
				>
					<NavLink
						to={item.to}
						end={item.end}
						data-nav-item={item.label}
						className={({ isActive }) =>
							`flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
								collapsed && !isMobile
									? "px-2 py-3 justify-center"
									: "px-3 py-3"
							} ${
								isActive
									? "bg-sidebar-active text-sidebar-active-border border border-sidebar-bg shadow-sidebar-active"
									: "text-text-primary hover:bg-sidebar-active hover:text-sidebar-active-border"
							} ${isSubmenu ? "ml-4" : ""}`
						}
						onClick={
							item.has_submenu && (!collapsed || isMobile)
								? (e) => {
										e.preventDefault();
										toggleSubmenu(item.label);
								  }
								: undefined
						}
					>
						<Icon
							className={`transition-colors duration-200 group-hover:text-sidebar-active-border${
								collapsed && !isMobile ? "h-6 w-6" : "h-4 w-4"
							}`}
						/>
						{(!collapsed || isMobile) && (
							<>
								<span className="flex-1 text-base">{item.label}</span>
								{item.badge && renderBadge(item.badge)}
								{item.has_submenu && (
									<ChevronRight
										className={`transition-transform duration-200 ease-in-out ${
											isExpanded ? "rotate-90" : "rotate-0"
										} ${collapsed && !isMobile ? "h-6 w-6" : "h-4 w-4"}`}
									/>
								)}
							</>
						)}
					</NavLink>

					{/* Regular submenu for expanded sidebar */}
					{item.has_submenu && isExpanded && (!collapsed || isMobile) && (
						<div className="mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
							{item.submenu?.map((subItem) =>
								renderNavItem(subItem, true, isMobile)
							)}
						</div>
					)}

					{/* Hover submenu for collapsed sidebar */}
					{collapsed && !isMobile && item.has_submenu && isHovered && (
						<div
							data-submenu
							className="fixed bg-sidebar-bg border border-border rounded-lg shadow-lg z-[60] min-w-[200px]"
							style={{
								left: "80px", // w-20 = 80px
								top: `${getNavItemPosition(item.label)}px`,
							}}
							onMouseEnter={() => {
								clearHoverTimeout();
								setHoveredItem(item.label);
							}}
							onMouseLeave={() => {
								setHoverTimeoutWithDelay(() => setHoveredItem(null));
							}}
						>
							<div className="p-2 space-y-1">
								<div className="px-3 py-2 text-sm font-semibold text-text-primary border-b border-border mb-2">
									{item.label}
								</div>
								{item.submenu?.map((subItem) => (
									<NavLink
										key={subItem.to}
										to={subItem.to}
										end={subItem.end}
										className={({ isActive }) =>
											`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
												isActive
													? "bg-sidebar-active text-sidebar-active-border"
													: "text-text-primary hover:bg-sidebar-active hover:text-sidebar-active-border"
											}`
										}
									>
										<subItem.icon className="h-4 w-4" />
										<span>{subItem.label}</span>
									</NavLink>
								))}
							</div>
						</div>
					)}
				</div>
			);
		},
		[
			collapsed,
			expandedItems,
			hoveredItem,
			clearHoverTimeout,
			setHoverTimeoutWithDelay,
			getNavItemPosition,
			toggleSubmenu,
			renderBadge,
		]
	);

	return (
		<>
			{/* Mobile Overlay */}
			{isMobileOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/40 md:hidden backdrop-blur-sm"
					onClick={onMobileClose}
				/>
			)}

			{/* Desktop Sidebar */}
			<aside
				className={`fixed left-0 top-0 z-30 h-screen bg-sidebar-bg border-r border-black flex flex-col transition-all duration-300 ${
					collapsed ? "w-20" : "w-64"
				} hidden md:flex`}
				onMouseLeave={() => {
					if (collapsed) {
						clearHoverTimeout();
						setHoveredItem(null);
					}
				}}
			>
				{/* Logo Section */}
				<div
					className={`flex h-20 items-center ${
						collapsed ? "px-2 justify-center" : "px-6"
					}`}
				>
					<div className="flex items-center gap-2">
						<span className="text-xl font-bold tracking-wide text-text-primary">
							{collapsed ? "WP" : "Web Panel"}
						</span>
					</div>
				</div>

				{/* Navigation */}
				<nav
					className={`flex flex-col gap-2 overflow-y-auto flex-1 min-h-0 ${
						collapsed ? "p-2" : "p-4"
					}`}
				>
					{/* Main Navigation */}
					<div className="space-y-1">
						{NAV_ITEMS.main_nav.map((item) => renderNavItem(item))}
					</div>

					{/* Sections */}
					{NAV_ITEMS.sections.map((section, sectionIndex) => (
						<div key={sectionIndex} className="mt-6">
							{!collapsed && (
								<h3 className="px-3 mb-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">
									{section.header}
								</h3>
							)}
							<div className="space-y-2">
								{section.items.map((item) => renderNavItem(item))}
							</div>
						</div>
					))}
				</nav>

				{/* Footer */}
				<div className="mt-auto p-4 border-t border-border ">
					<Button
						variant="outline"
						onClick={handleLogout}
						disabled={!isActionable || isLoading}
						className={`w-full gap-3 ${
							collapsed ? "justify-center px-0 rounded-sm" : "justify-start"
						}`}
						aria-busy={isLoading}
						size={collapsed ? "icon" : "lg"}
					>
						<LogOut className={`${collapsed ? "h-6 w-6" : "h-4 w-4"}`} />
						{!collapsed && (
							<span className="text-base">
								{isLoading ? "Çıkış yapılıyor..." : "Çıkış Yap"}
							</span>
						)}
					</Button>
				</div>
			</aside>

			{/* Mobile Sidebar */}
			<aside
				className={`fixed left-0 top-0 z-50 h-screen bg-sidebar-bg border-r border-black flex flex-col transition-all duration-300 w-64 transform ${
					isMobileOpen ? "translate-x-0" : "-translate-x-full"
				} md:hidden`}
				style={{ display: isMobileOpen ? "flex" : "none" }}
			>
				{/* Mobile Logo Section */}
				<div className="flex h-20 items-center justify-between px-6">
					<div className="flex items-center gap-2">
						<span className="text-xl font-bold tracking-wide text-text-primary">
							Web Panel
						</span>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={onMobileClose}
						className="md:hidden hover:bg-transparent "
					>
						<X className="size-4" />
					</Button>
				</div>

				{/* Mobile Navigation */}
				<nav className="flex flex-col gap-2 p-4 overflow-y-auto flex-1 min-h-0">
					{/* Main Navigation */}
					<div className="space-y-1">
						{NAV_ITEMS.main_nav.map((item) => renderNavItem(item, false, true))}
					</div>

					{/* Sections */}
					{NAV_ITEMS.sections.map((section, sectionIndex) => (
						<div key={sectionIndex} className="mt-6">
							<h3 className="px-3 mb-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">
								{section.header}
							</h3>
							<div className="space-y-1">
								{section.items.map((item) => renderNavItem(item, false, true))}
							</div>
						</div>
					))}
				</nav>

				{/* Mobile Footer */}
				<div className="mt-auto p-4 border-t border-border">
					<Button
						variant="secondary"
						onClick={handleLogout}
						disabled={!isActionable || isLoading}
						className="w-full gap-3 justify-start"
						aria-busy={isLoading}
						size="lg"
					>
						<LogOut className="h-4 w-4" />
						<span className="text-base">
							{isLoading ? "Çıkış yapılıyor..." : "Çıkış Yap"}
						</span>
					</Button>
				</div>
			</aside>
		</>
	);
}
