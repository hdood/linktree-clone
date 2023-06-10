import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
	// axios.defaults.baseURL = "https://api.95dot.com";
	axios.defaults.baseURL = "http://localhost:8000";

	axios.defaults.withCredentials = true;

	return {
		provide: {
			axios: axios,
		},
	};
});
