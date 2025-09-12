import { fetchClient } from "@/utils/fetch-client";
import type {
	ViolationsResponse,
	ViolationsList,
} from "@/types/violations.types";

export const getViolations = (
	businessId: number,
	cameraId: number,
	type: string,
	severity: string,
	personId: number,
	from: string,
	to: string,
	page: number,
	size: number,
	sort: string
) => {
	return fetchClient<void, ViolationsList>(
		`/admin/violations?businessId=${businessId}&cameraId=${cameraId}&type=${type}&severity=${severity}&personId=${personId}&from=${from}&to=${to}&page=${page}&size=${size}&sort=${sort}`
	);
};

export const getViolation = (violationId: number) => {
	return fetchClient<void, ViolationsResponse>(
		`/admin/violations/${violationId}`
	);
};
