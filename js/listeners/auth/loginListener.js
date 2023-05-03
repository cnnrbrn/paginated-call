import displayMessage from "../../ui/common/displayMessage.js";
import * as auth from "../../api/auth.js";
import * as storage from "../../services/storage.js";

export function loginListener() {
	const form = document.querySelector("form");

	if (form) {
		form.addEventListener("submit", handleLogin);
	}
}
async function handleLogin(event) {
	event.preventDefault();
	const form = event.target;
	const data = new FormData(form);
	const email = data.get("email");
	const password = data.get("password");

	const button = form.querySelector("button");
	button.innerText = "Logging in...";

	const fieldset = form.querySelector("fieldset");
	fieldset.disabled = true;

	try {
		const bodyData = { email: email, password: password };
		const { accessToken } = await auth.login(bodyData);
		storage.save("token", accessToken);
		location.href = "/posts";
	} catch (error) {
		console.error(error);
		displayMessage("danger", error, "#message");
	} finally {
		button.innerText = "Login";
		fieldset.disabled = false;
	}
}
