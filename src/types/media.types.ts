import type { Pagination } from "./pagination.types";
import type { BusinessesResponse } from "./businesses.types";

export interface MediaResponse {
	id: number;
	business: BusinessesResponse;
	key: string;
	url: string;
	sha256: string;
	durationMs: number;
	piiMasked: boolean;
}

export interface MediaPresingDownloadResponse {
	url: string;
	expiresInMinutes: number;
}

export interface MediaList {
	content: MediaResponse[];
	page: Pagination;
}
