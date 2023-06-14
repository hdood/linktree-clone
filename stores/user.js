import { defineStore } from "pinia";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

class UserStore {
	user = ref({});
	colors = ref(null);
	frame = ref(null);
	error = ref({});

	getCSRFCookie = async () => await $axios.get("/sanctum/csrf-cookie");

	getUser = async () => {
		let res = await $axios.get("/api/users");
		this.user.value = res.data;
	};

	refreshFrame = () => {
		if (!this.frame.value) return;
		this.frame?.value?.contentWindow?.location?.reload?.();
	};
	updateUserImage = async (data) => {
		await $axios.post("/api/user-image", data);
	};
	updateUserCoverImage = async (data) => {
		await $axios.post("/api/user-cover-image", data);
	};
	updateUserDetails = async (
		name,
		bio,
		phone,
		phoneVisibility,
		countryCode,
		address,
		website
	) => {
		await $axios.patch(`/api/users/${this.$state.id}`, {
			name,
			bio,
			phone: phone,
			phone_visibility: phoneVisibility,
			country_code: countryCode,
			address,
			website,
		});
	};

	downloadPortfolio = async () => {
		try {
			const response = await $axios({
				url: "/api/download-portfolio",
				method: "POST",
				responseType: "blob",
				data: {
					user_id: this.user.value.id,
				},
			});
			const blob = new Blob([response.data], {
				type: response.headers["content-type"],
			});

			const fileType = response.headers["content-type"].split("/")[1];

			const url = window.URL.createObjectURL(blob);

			const link = document.createElement("a");
			link.href = url;

			link.setAttribute(
				"download",
				`${this.user.value.name}.${fileType}`
			);

			document.body.appendChild(link);

			link.click();

			window.URL.revokeObjectURL(url);
			document.body.removeChild(link);
		} catch (error) {
			console.log("error", error);
			await this.getUser();
		}

		await this.getUser();
	};

	savePortfolio = async (portfolio) => {
		const data = new FormData();

		data.append("portfolio", portfolio);
		data.append("user_id", this.user.value.id);

		try {
			await $axios.post("/api/user-portfolio", data);
		} catch (error) {
			console.error(error);
		}
	};
}

export const useUserStore = defineStore("user", () => new UserStore(), {
	persist: true,
});
