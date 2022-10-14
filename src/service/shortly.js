import axios from "axios";

const BASE_URL = "http://localhost:5000"//"https://shortly-urls-app.herokuapp.com";

function createHeaders() {
	const token = JSON.parse(localStorage.getItem("shortly"))?.token;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return config;
}

function signUp(body) {
	const promise = axios.post(`${BASE_URL}/signup`, body);

	return promise;
}

function signIn(body) {
	const promise = axios.post(`${BASE_URL}/signin`, body);

	return promise;
}

function logout() {
	const config = createHeaders();

	const promise = axios.post(`${BASE_URL}/logout`, {}, config);

	return promise;
}

function postUrl(body) {
	const config = createHeaders();

	const promise = axios.post(`${BASE_URL}/urls/shorten`, body, config);

	return promise;
}

function getUrl(id) {
	const promise = axios.get(`${BASE_URL}/urls/${id}`);

	return promise;
}

function deleteUrl(id) {
	const config = createHeaders();

	const promise = axios.delete(`${BASE_URL}/urls/${id}`, config);

	return promise;
}

function openUrl(shortUrl) {
	const promise = axios.get(`${BASE_URL}/urls/open/${shortUrl}`);

	return promise;
}
function getUserData() {
	const config = createHeaders();

	const promise = axios.get(`${BASE_URL}/users/me`, config);

	return promise;
}

function getRanking() {
	const promise = axios.get(`${BASE_URL}/ranking`);

	return promise;
}

export {
	signUp,
	signIn,
	logout,
	postUrl,
	getUrl,
	deleteUrl,
	openUrl,
	getUserData,
	getRanking,
};
