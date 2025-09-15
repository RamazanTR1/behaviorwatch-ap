import { Search } from "lucide-react";
import { useState } from "react";

interface SearchProps {
	placeholder?: string;
	onSearch?: (value: string) => void;
	className?: string;
}

export default function SearchComponent({
	placeholder = "Search Here...",
	onSearch,
	className = "",
}: SearchProps) {
	const [searchValue, setSearchValue] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch?.(searchValue);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<form onSubmit={handleSearch} className={`relative ${className}`}>
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
				<input
					type="text"
					value={searchValue}
					onChange={handleInputChange}
					placeholder={placeholder}
					className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
				/>
			</div>
		</form>
	);
}
