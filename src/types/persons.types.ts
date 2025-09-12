import type { BusinessesResponse } from "./businesses.types";
import type { Pagination } from "./pagination.types";

export interface PersonsRequest {
	businessId: number;
	name: string;
	email: string;
	phone: string;
	title: string;
	photoKey: string;
}

export interface PersonsResponse {
	id: number;
	business: BusinessesResponse;
	name: string;
	email: string;
	phone: string;
	title: string;
	photoKey: string;
}

export interface PersonsPresingUploadResponse {
	key: string;
	url: string;
	expiresInMinutes: number;
}

export interface PersonsPresingDownloadResponse {
	url: string;
	expiresInMinutes: number;
}

export interface PersonsPhotoAttachResponse {
	id: number;
	photoKey: string;
}

export interface PersonsList {
	content: PersonsResponse[];
	page: Pagination;
}
