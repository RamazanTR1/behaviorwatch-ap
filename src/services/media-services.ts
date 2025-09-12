import { fetchClient } from "@/utils/fetch-client";
import type {
	MediaResponse,
	MediaList,
	MediaPresingDownloadResponse,
} from "@/types/media.types";

export const getMedias = (
	businessId: number,
	page: number,
	size: number,
	sort: string
) => {
	return fetchClient<void, MediaList>(
		`/admin/media?businessId=${businessId}&page=${page}&size=${size}&sort=${sort}`
	);
};

export const getMedia = (id: number) => {
	return fetchClient<void, MediaResponse>(`/admin/media/${id}`);
};

export const downloadMediaPresing = (mediaId: number, filename: string) => {
	return fetchClient<void, MediaPresingDownloadResponse>(
		`/admin/media/${mediaId}/presing-download?filename=${filename}`
	);
};

export const deleteMedia = (id: number) => {
	return fetchClient<void, void>(`/admin/media/${id}`, {
		method: "DELETE",
	});
};
