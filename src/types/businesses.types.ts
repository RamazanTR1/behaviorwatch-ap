import type { Pagination } from "./pagination.types";
import type { OrganizationResponse } from "./organization.types";

export interface BusinessesRequest {
	organizationId: number;
	name: string;
	address: string;
	ownerEmail: string;
}

export interface BusinessesResponse {
	id: number;
	organization: OrganizationResponse;
	name: string;
	address: string;
	ownerEmail: string;
}

export interface BusinessesList {
	content: BusinessesResponse[];
	page: Pagination;
}
