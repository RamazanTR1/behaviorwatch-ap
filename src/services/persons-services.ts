import { fetchClient } from "@/utils/fetch-client";
import type {
	PersonsResponse,
	PersonsList,
	PersonsRequest,
	PersonsPresingUploadResponse,
	PersonsPresingDownloadResponse,
	PersonsPhotoAttachResponse,
} from "@/types/persons.types";

export const getPersons = (
	businessId: number,
	search: string,
	page: number,
	size: number,
	sort: string
) => {
	return fetchClient<void, PersonsList>(
		`/admin/persons?businessId=${businessId}&search=${search}&page=${page}&size=${size}&sort=${sort}`
	);
};

export const getPerson = (personId: number) => {
	return fetchClient<void, PersonsResponse>(`/admin/persons/${personId}`);
};

export const downloadPersonsPresing = (personId: number, filename: string) => {
	return fetchClient<void, PersonsPresingDownloadResponse>(
		`/admin/persons/${personId}/presing-download?filename=${filename}`
	);
};

export const createPerson = (request: PersonsRequest) => {
	return fetchClient<PersonsRequest, PersonsResponse>("/admin/persons", {
		method: "POST",
		body: request,
	});
};

export const uploadPersonsPresing = (
	personId: number,
	extension: string,
	contentType: string
) => {
	return fetchClient<void, PersonsPresingUploadResponse>(
		`/admin/persons/${personId}/presing-upload?extension=${extension}&contentType=${contentType}`,
		{
			method: "POST",
		}
	);
};

export const attachPhoto = (personId: number, photoKey: string) => {
	return fetchClient<void, PersonsPhotoAttachResponse>(
		`/admin/persons/${personId}/photo/attach?key=${photoKey}`,
		{
			method: "POST",
		}
	);
};

export const updatePerson = (personId: number, request: PersonsRequest) => {
	return fetchClient<PersonsRequest, PersonsResponse>(
		`/admin/persons/${personId}`,
		{
			method: "PUT",
			body: request,
		}
	);
};

export const deletePerson = (personId: number) => {
	return fetchClient<void, void>(`/admin/persons/${personId}`, {
		method: "DELETE",
	});
};
