import { getPosts } from "../../api/posts.js";
import displayMessage from "../common/displayMessage.js";
import toggleLoader from "../common/toggleLoader.js";
import toggleLoadMoreButton from "../common/toggleLoadMoreButton.js";

export default function renderPaginatedPosts() {
	let offset = 0;

	return async function postList() {
		const container = "#postContainer";

		try {
			toggleLoader(container);
			toggleLoadMoreButton();
			const posts = await getPosts(offset);

			offset = offset + 10;
			renderPosts(posts, container);
			toggleLoader(container);
		} catch (error) {
			displayMessage("danger", error, container);
		}
	};
}

function renderPosts(posts, container) {
	const parent = document.querySelector(container);
	const postHtml = posts.map((post) => createPost(post));
	parent.append(...postHtml);
	if (posts.length > 0) {
		toggleLoadMoreButton(false);
	}
}

function createPost({ title, body }) {
	const div = document.createElement("div");
	div.classList.add("post");
	const heading = document.createElement("h4");
	heading.textContent = title;
	const content = document.createElement("p");
	content.textContent = body;
	div.append(heading, content);
	return div;
}
