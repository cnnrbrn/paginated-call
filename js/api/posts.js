import { getToken } from "../helpers/storage.js";
import { BASE_URL } from "../constants/api.js";

export async function getPosts(offset) {
	const url = `${BASE_URL}posts?limit=10&offset=${offset}`;

	const token = getToken();

	if (!token) {
		throw new Error("No token found");
	}

	const options = {
		headers: {
			"Content-Type": "application/json;",
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await fetch(url, options);

	if (!response.ok) {
		const error = await response.json();
		const errorMessage = error.errors[0].message;
		throw new Error(errorMessage);
	}

	return await response.json();
}
