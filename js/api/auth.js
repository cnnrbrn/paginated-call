import { BASE_URL } from "../constants/api.js";

export async function login(data) {
	const url = `${BASE_URL}auth/login`;

	const options = {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};

	const response = await fetch(url, options);

	if (!response.ok) {
		throw new Error("Either the username or password is incorrect");
	}

	return await response.json();
}
