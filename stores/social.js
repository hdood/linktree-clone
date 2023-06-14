import { defineStore } from "pinia";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

class SocialStore {
	googleLogin = async (payload) => {
		try {
			await $axios.post("/login/google", {
				client_id: payload.clientId,
				credential: payload.credential,
			});

			return true;
		} catch (error) {
			return false;
		}
	};

	googleRegister = async (payload) => {
		try {
			await $axios.post("/register/google", {
				client_id: payload.clientId,
				credential: payload.credential,
			});

			return true;
		} catch (error) {
			return false;
		}
	};
}

export const useSocialStore = defineStore("social", () => new SocialStore());
