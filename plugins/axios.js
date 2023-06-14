import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
	// axios.defaults.baseURL = "https://api.95dot.com";
	axios.defaults.baseURL = import.meta.env.VITE_API_URL;

	axios.defaults.withCredentials = true;

	return {
		provide: {
			axios: axios,
		},
	};
});
