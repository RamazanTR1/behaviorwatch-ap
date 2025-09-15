import { fetchClient } from "@/utils/fetch-client";
import type { OrganizationList } from "@/types/organization.types";

export const getOrganization = () => {
	return fetchClient<void, OrganizationList>("/admin/organizations");
};
