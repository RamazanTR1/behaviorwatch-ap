import type { Pagination } from "./pagination.types";

export interface OrganizationRequest {
	name: string;
	ownerUserId: number;
}

export interface OrganizationResponse {
	id: number;
	name: string;
	ownerUserId: number;
}

export interface OrganizationList {
	content: OrganizationResponse[];
	page: Pagination;
}
