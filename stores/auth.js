import axios from "~~/plugins/axios";
import { defineStore } from "pinia";

const app = useNuxtApp();
const $axios = axios(app).provide.axios;

class AuthStore {
	register = async (name, email, password, confirmPassword) => {
		await $axios.post("/register", {
			name: name,
			email: email,
			password: password,
			password_confirmation: confirmPassword,
		});
	};

	login = async (email, password) => {
		await $axios.post("/login", {
			email: email,
			password: password,
		});
	};

	logout = async () => {
		await $axios.post("/logout");
	};
}

export const useAuthStore = defineStore("auth", () => new AuthStore());
