import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

// Entity türleri için tip tanımlamaları
export type EntityType =
	| "iletişimMesaj"
	| "bildirimAbonelik"
	| "anaSayfaHakkında"
	| "slider"
	| "bildirim"
	| "partner"
	| "contactForm"
	| "ecoPartner"
	| "componentType"
	| "dil"
	| "asset"
	| "office"
	| "pageType"
	| "çeviri"
	| "sayfa"
	| "takımUyesi"
	| "component";
// Entity konfigürasyonu
interface EntityConfig {
	article: string; // "bu", "şu" vb.
	accusative: string; // "kullanıcıyı", "kategoriyi", "etiketi" vb.
}

const entityConfigs: Record<EntityType, EntityConfig> = {
	iletişimMesaj: { article: "bu", accusative: "iletişim mesajını" },
	bildirim: { article: "bu", accusative: "bildirimi" },
	bildirimAbonelik: { article: "bu", accusative: "bildirim aboneliğini" },
	partner: { article: "bu", accusative: "partneri" },
	anaSayfaHakkında: {
		article: "bu",
		accusative: "ana sayfa hakkında bilgisini",
	},
	slider: { article: "bu", accusative: "slideri" },
	dil: { article: "bu", accusative: "dili" },
	contactForm: { article: "bu", accusative: "iletişim formu" },
	ecoPartner: { article: "bu", accusative: "eco partneri" },
	componentType: { article: "bu", accusative: "bileşen tipini" },
	asset: { article: "bu", accusative: "asset'i" },
	office: { article: "bu", accusative: "ofisi" },
	pageType: { article: "bu", accusative: "sayfa tipini" },
	çeviri: { article: "bu", accusative: "çeviriyi" },
	sayfa: { article: "bu", accusative: "sayfayı" },
	takımUyesi: { article: "bu", accusative: "takım üyesini" },
	component: { article: "bu", accusative: "bileşeni" },
};

interface DeleteConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => Promise<void> | void;
	entityType: EntityType;
	entityName?: string;
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	requireTextConfirmation?: boolean;
	confirmationText?: string;
	isDangerous?: boolean;
	isLoading?: boolean;
	children?: React.ReactNode;
}

function DeleteConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	entityType,
	entityName,
	title,
	description,
	confirmText = "Sil",
	cancelText = "İptal",
	requireTextConfirmation = false,
	confirmationText,
	isDangerous = true,
	isLoading = false,
	children,
}: DeleteConfirmationModalProps) {
	const [textInput, setTextInput] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	const config = entityConfigs[entityType];
	const defaultConfirmationText = confirmationText || entityName || entityType;

	// Varsayılan başlık ve açıklama
	const defaultTitle =
		title ||
		`${entityType?.charAt(0).toUpperCase() + entityType?.slice(1)} Sil`;
	const defaultDescription =
		description ||
		`${config?.article?.charAt(0).toUpperCase() + config?.article?.slice(1)} ${
			config?.accusative
		} silmek istediğinize emin misiniz?${
			entityName
				? ` Bu işlem "${entityName}" öğesini kalıcı olarak kaldıracaktır.`
				: ""
		}`;

	const handleConfirm = async () => {
		if (
			requireTextConfirmation &&
			textInput.trim() !== defaultConfirmationText
		) {
			return;
		}

		try {
			setIsDeleting(true);
			await onConfirm();
			onClose();
		} catch (error) {
			console.error("Silme işlemi başarısız:", error);
		} finally {
			setIsDeleting(false);
		}
	};

	const handleClose = () => {
		if (!isDeleting && !isLoading) {
			setTextInput("");
			onClose();
		}
	};

	const isConfirmDisabled =
		isDeleting ||
		isLoading ||
		(requireTextConfirmation && textInput.trim() !== defaultConfirmationText);

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2D2D2D]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-[#333333] dark:text-white">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F44336]/10">
							<Trash2 className="h-4 w-4 text-[#F44336]" />
						</div>
						{defaultTitle}
					</DialogTitle>
					<DialogDescription className="text-left text-[#666666] dark:text-[#B0B0B0]">
						{defaultDescription}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{isDangerous && (
						<Alert className="border-[#F44336] bg-[#F44336]/10 dark:bg-[#F44336]/10">
							<AlertTriangle className="h-4 w-4 text-[#F44336]" />
							<AlertDescription className="text-[#333333] dark:text-white">
								Bu işlem geri alınamaz. Silinen veriler kalıcı olarak
								kaybolacaktır.
							</AlertDescription>
						</Alert>
					)}

					{requireTextConfirmation && (
						<div className="space-y-2">
							<Label
								htmlFor="confirmation-input"
								className="text-sm font-medium text-[#333333] dark:text-white"
							>
								Silmek için "<strong>{defaultConfirmationText}</strong>" yazın:
							</Label>
							<Input
								id="confirmation-input"
								value={textInput}
								onChange={(e) => setTextInput(e.target.value)}
								placeholder={defaultConfirmationText}
								disabled={isDeleting || isLoading}
								className="font-mono bg-white dark:bg-[#2D2D2D] border-[#E5E5E5] dark:border-[#2D2D2D] text-[#333333] dark:text-white placeholder:text-[#999999] dark:placeholder:text-[#666666] focus:border-[#F44336] focus:ring-[#F44336]"
							/>
						</div>
					)}

					{/* Ek içerik için children */}
					{children}
				</div>

				<DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
					<Button
						variant="outline"
						onClick={handleClose}
						disabled={isDeleting || isLoading}
						className="w-full cursor-pointer sm:w-auto border-[#E5E5E5] dark:border-[#2D2D2D] text-[#666666] dark:text-[#B0B0B0] hover:bg-[#FAFAFA] dark:hover:bg-[#2D2D2D] hover:text-[#333333] dark:hover:text-white"
					>
						{cancelText}
					</Button>
					<Button
						onClick={handleConfirm}
						disabled={isConfirmDisabled}
						className="w-full cursor-pointer bg-[#F44336] hover:bg-[#D32F2F] text-white font-semibold sm:w-auto"
					>
						{(isDeleting || isLoading) && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// Hook for easier usage

export default DeleteConfirmationModal;
