import type { Pagination } from "./pagination.types";
import type { BusinessesResponse } from "./businesses.types";

export interface CameraRequest {
	businessId: number;
	name: string;
	rtspUrl: string;
	zonePolygonGeoJson: string;
	optionsJson: string;
	enabled: boolean;
}

export interface CameraResponse {
	id: number;
	business: BusinessesResponse;
	name: string;
	rtspUrl: string;
	zonePolygonGeoJson: string;
	optionsJson: string;
	enabled: boolean;
}

export interface CameraList {
	content: CameraResponse[];
	page: Pagination;
}
