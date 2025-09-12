import { fetchClient } from "@/utils/fetch-client";
import type {
	CameraResponse,
	CameraList,
	CameraRequest,
} from "@/types/camera.types";

export const getCameras = (
	businessId: number,
	search: string,
	page: number,
	size: number,
	sort: string
) => {
	return fetchClient<void, CameraList>(
		`/admin/cameras?businessId=${businessId}&search=${search}&page=${page}&size=${size}&sort=${sort}`
	);
};

export const getCamera = (id: number) => {
	return fetchClient<void, CameraResponse>(`/admin/cameras/${id}`);
};

export const createCamera = (request: CameraRequest) => {
	return fetchClient<CameraRequest, CameraResponse>("/admin/cameras", {
		method: "POST",
		body: request,
	});
};

export const updateCamera = (id: number, request: CameraRequest) => {
	return fetchClient<CameraRequest, CameraResponse>(`/admin/cameras/${id}`, {
		method: "PUT",
		body: request,
	});
};

export const deleteCamera = (id: number) => {
	return fetchClient<void, void>(`/admin/cameras/${id}`, {
		method: "DELETE",
	});
};
