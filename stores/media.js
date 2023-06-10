import axios from "~~/plugins/axios";
import { defineStore } from "pinia";

const app = useNuxtApp();
const $axios = axios(app).provide.axios;

class MediaStore {
	media = ref({});
	fetchMedia = async (userId) => {
		try {
			const response = await $axios.get(`/api/media/${userId}`);
			this.media.value = response.data;
		} catch (error) {
			console.error(error);
		}
	};
}

export const useMediaStore = defineStore("media", () => new MediaStore());
