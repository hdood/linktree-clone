import { defineStore } from "pinia";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

export const useProfileStore = defineStore("user", {
	state: () => ({
		id: "",
		theme_id: "",
		name: "",
		email: "",
		image: "",
		coverImage: "",
		bio: "",
		phone: "",
		countryCode: "",
		address: "",
		website: "",
		phone_visibility: true,
		portfolio: "",
		theme: null,
		colors: null,
		allLinks: null,
		errors: {},
	}),
	actions: {
		async getProfile(name) {
			let res = await $axios.get(`/api/users/${name}`);
			const user = res.data.user;

			if (!user) return;

			this.$state.id = user.id;
			this.$state.theme_id = user.theme_id;
			this.$state.name = user.name;
			this.$state.bio = user.bio;
			this.$state.image = user.image;
			this.$state.portfolio = user.portfolio;
			this.$state.email = user.email;
			this.$state.phone = user.phone;
			this.$state.add = user.add;
			this.$state.coverImage = user.cover_image;
			this.$state.website = user.website;
			this.$state.countryCode = user.country_code;
			this.$state.phone_visibility = user.phone_visibility;
			this.$state.allLinks = res.data.links;

			this.getUserTheme();
		},

		async downloadPortfolio() {
			try {
				const response = await $axios({
					url: "/api/download-portfolio",
					method: "POST",
					responseType: "blob",
					data: {
						user_id: this.$state.id,
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
					`${this.$state.name}.${fileType}`
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
		},

		resetState() {
			this.$state.id = "";
			this.$state.name = "";
			this.$state.email = "";
			this.$state.image = "";
			this.$state.bio = "";
			this.$state.theme_id = "";
			this.$state.theme = null;
			this.$state.colors = null;
			this.$state.allLinks = null;
			this.$state.isMobile = false;
			this.$state.updatedLinkId = 0;
			this.$state.addLinkOverlay = false;
			this.$state.isPreviewOverlay = false;
		},
	},
	persist: true,
});
