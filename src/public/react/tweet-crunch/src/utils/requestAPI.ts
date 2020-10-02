export const getAPI = async (endpoint: string) => {
	const res = await fetch(endpoint);

	const json = await res.json();

	if (json.error)
		throw new Error(json.error || "Sorry, but we have encountered an error while loading" + endpoint)

	return json;
}