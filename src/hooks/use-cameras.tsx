import { useAuthQuery } from "@/hooks/use-auth-query";
import { getCameras } from "@/services/cameras-services";
import type { CameraList } from "@/types/cameras.types";

export const useCameras = (
	businessId: number,
	search: string,
	page: number,
	size: number,
	sort: string
) => {
	return useAuthQuery<CameraList, Error>({
		queryKey: ["cameras", businessId, search, page, size, sort],
		queryFn: () => getCameras(businessId, search, page, size, sort),
	});
};
