import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";

interface Person {
	name: string;
	business: string;
	organization: string;
	email: string;
	phone: string;
	title: string;
}

interface PersonListProps {
	persons: Person[];
	currentPage?: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
	totalCount?: number;
}

export default function PersonList({
	persons,
	currentPage = 1,
	totalPages = 1,
	onPageChange = () => {},
	totalCount = 0,
}: PersonListProps) {
	return (
		<Card className="shadow-card-offset border-card-border">
			{/* Header */}
			<div className="flex items-center justify-between p-6">
				<h2 className="text-xl font-semibold text-text-primary tracking-wide">
					Kişi Listesi
				</h2>
				<Button variant="success" className="gap-2">
					Kişi Ekle +
				</Button>
			</div>

			{/* Table */}
			<Table>
				<TableHeader>
					<TableRow className="border-b border-card-border border-dashed">
						<TableHead className="w-16"></TableHead>
						<TableHead className="text-text-muted uppercase tracking-wide">
							Ad Soyad
						</TableHead>
						<TableHead className="text-text-muted uppercase tracking-wide">
							İşletme - Organizasyon
						</TableHead>
						<TableHead className="text-text-muted uppercase tracking-wide">
							E-posta
						</TableHead>
						<TableHead className="text-text-muted uppercase tracking-wide">
							Telefon
						</TableHead>
						<TableHead className="text-text-muted uppercase tracking-wide">
							Yetki
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{persons.map((person, index) => (
						<TableRow key={index} className="hover:bg-hover transition-colors">
							<TableCell className="w-16">
								{/* Person icon placeholder */}
								<div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
									<User className="h-4 w-4" />
								</div>
							</TableCell>
							<TableCell>
								<p className="font-medium text-text-primary">{person.name}</p>
							</TableCell>
							<TableCell>
								<h3 className="text-sm text-text-primary">
									{person.business} - {person.organization}
								</h3>
							</TableCell>
							<TableCell>
								<p className="text-sm text-text-primary">{person.email}</p>
							</TableCell>
							<TableCell>
								<p className="text-sm text-text-primary">{person.phone}</p>
							</TableCell>
							<TableCell>
								<span className="text-xs bg-btn-info text-info px-2 py-1 rounded">
									{person.title}
								</span>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
				itemsPerPage={persons.length}
				totalItems={totalCount}
				showingItems={persons.length}
			/>
		</Card>
	);
}
