import { isLoggedIn } from "../../helpers/storage.js";

export default function buildMenu(pathname) {
	const menu = document.querySelector("#menu");

	if (isLoggedIn()) {
		menu.innerHTML += `<li class="nav-item">
                        <a class="nav-link ${pathname === "/posts/" ? "active" : ""}" href="/posts">Posts</a>
                      </li>`;
	} else {
		menu.innerHTML += `<li class="nav-item">
                        <a class="nav-link ${pathname === "/" || pathname === "/index.html" ? "active" : ""}" href="/">Login</a>
                      </li>`;
	}
}
