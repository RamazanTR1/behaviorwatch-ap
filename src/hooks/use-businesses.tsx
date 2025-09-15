import { useAuthQuery } from "@/hooks/use-auth-query";
import { getBusinesses } from "@/services/businesses-services";

export const useBusinesses = () => {
	return useAuthQuery({
		queryKey: ["businesses"],
		queryFn: getBusinesses,
		staleTime: 1000 * 60 * 5,
	});
};
