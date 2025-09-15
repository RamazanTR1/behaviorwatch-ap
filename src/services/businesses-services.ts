import { fetchClient } from "@/utils/fetch-client";
import type { BusinessesList } from "@/types/businesses.types";

export const getBusinesses = () => {
	return fetchClient<void, BusinessesList>("/admin/businesses");
};
