import { useAuthQuery } from "./use-auth-query";
import { getOrganization } from "@/services/organization-services";

export const useOrganizations = () => {
	return useAuthQuery({
		queryKey: ["organizations"],
		queryFn: () => getOrganization(),
		staleTime: 1000 * 60 * 5,
	});
};
