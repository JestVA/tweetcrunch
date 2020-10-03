import { getAPI } from "./requestAPI";

export const generateBearerToken = async (endpoint: string) => {
	const apiRes = await getAPI(endpoint);

	return apiRes;
}