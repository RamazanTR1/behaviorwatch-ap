import type { Pagination } from "./pagination.types";
import type { PersonsResponse } from "./persons.types";
import type { CameraResponse } from "./cameras.types";
import type { BusinessesResponse } from "./businesses.types";
import type { MediaResponse } from "./media.types";

export interface ViolationsResponse {
	id: number;
	business: BusinessesResponse;
	camera: CameraResponse;
	media: MediaResponse;
	person: PersonsResponse;
	type: string;
	severity: string;
	confidence: number;
	startedAt: string;
	endedAt: string;
	confirmed: boolean;
	status: string;
	eventHash: string;
}

export interface ViolationsList {
	content: ViolationsResponse[];
	page: Pagination;
}
