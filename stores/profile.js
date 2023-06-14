import { defineStore } from "pinia";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

class ProfileStore {
	user = ref({});

	fetchProfile = async (name) => {
		let res = await $axios.get(`/api/users/${name}`);
		const data = res.data.user;
		this.user.value = data;
		this.user.value.links = res.data.links;
	};
}

export const useProfileStore = defineStore("profile", () => new ProfileStore());
