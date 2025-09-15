import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
	return (
		<nav className="flex items-center space-x-1 text-sm">
			<Link
				to="/dashboard"
				className="flex items-center text-text-muted hover:text-text-primary transition-colors"
			>
				<Home className="h-4 w-4" />
			</Link>
			{items.map((item, index) => (
				<div key={index} className="flex items-center space-x-1">
					<ChevronRight className="h-4 w-4 text-text-muted" />
					{item.href ? (
						<Link
							to={item.href}
							className="text-text-muted hover:text-text-primary transition-colors"
						>
							{item.label}
						</Link>
					) : (
						<span className="text-text-primary font-medium">{item.label}</span>
					)}
				</div>
			))}
		</nav>
	);
}
