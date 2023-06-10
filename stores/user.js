import { defineStore } from "pinia";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

export const useUserStore = defineStore("profile", {
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
		isMobile: false,
		updatedLinkId: 0,
		addLinkOverlay: false,
		isPreviewOverlay: false,
		frame: null,
		errors: {},
	}),
	actions: {
		hidePageOverflow(val, id) {
			if (val) {
				document.body.style.overflow = "hidden";
				if (id) {
					document.getElementById(id).style.overflow = "hidden";
				}
				return;
			}
			document.body.style.overflow = "visible";
			if (id) {
				document.getElementById(id).style.overflow = "visible";
			}
		},

		allLowerCaseNoCaps(str) {
			return str.split(" ").join("").toLowerCase();
		},

		async hasSessionExpired() {
			await $axios.interceptors.response.use(
				(response) => {
					// Call was successful, continue.
					return response;
				},
				(error) => {
					switch (error.response.status) {
						case 401: // Not logged in
						case 419: // Session expired
						case 503: // Down for maintenance
							// Bounce the user to the login screen with a redirect back
							this.resetState();
							window.location.href = "/";
							break;
						case 500:
							alert(
								"Oops, something went wrong!  The team has been notified."
							);
							break;
						default:
							// Allow individual requests to handle other errors
							return Promise.reject(error);
					}
				}
			);
		},

		async getTokens() {
			await $axios.get("/sanctum/csrf-cookie");
		},

		async login(email, password) {
			await $axios.post("/login", {
				email: email,
				password: password,
			});
		},

		async register(name, email, password, confirmPassword) {
			await $axios.post("/register", {
				name: name,
				email: email,
				password: password,
				password_confirmation: confirmPassword,
			});
		},

		async getUser() {
			let res = await $axios.get("/api/users");

			this.$state.id = res.data.id;
			this.$state.theme_id = res.data.theme_id;
			this.$state.name = res.data.name;
			this.$state.email = res.data.email;
			this.$state.bio = res.data.bio;
			this.$state.image = res.data.image;
			this.$state.coverImage = res.data.cover_image;
			this.$state.portfolio = res.data.portfolio;
			this.$state.phone = res.data.phone;
			this.$state.countryCode = res.data.country_code;
			this.$state.address = res.data.address;
			this.$state.website = res.data.website;
			this.$state.phone_visibility = res.data.phone_visibility;

			this.getUserTheme();
		},

		async savePortfolio(portfolio) {
			const data = new FormData();

			data.append("portfolio", portfolio);
			data.append("user_id", this.$state.id);

			try {
				await $axios.post("/api/user-portfolio", data);
			} catch (error) {
				console.error(error);
			}
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

		async updateUserImage(data) {
			await $axios.post("/api/user-image", data);
		},
		async updateUserCoverImage(data) {
			await $axios.post("/api/user-cover-image", data);
		},
		async updateLinkImage(data) {
			await $axios.post(`/api/link-image`, data);
		},

		async deleteLink(id) {
			await $axios.delete(`/api/links/${id}`);
		},

		getUserTheme() {
			this.$state.colors.forEach((color) => {
				if (this.$state.theme_id === color.id) {
					this.$state.theme = color;
				}
			});
		},

		updateUserDetails: async (
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
		},

		async updateTheme(themeId) {
			let res = await $axios.patch("/api/themes", {
				theme_id: themeId,
			});
			this.$state.theme_id = res.data.theme_id;
			this.getUserTheme();
		},

		async getAllLinks() {
			let res = await $axios.get("/api/links");
			this.$state.allLinks = res.data;
		},

		async addLink(name, url, icon) {
			await $axios.post("/api/links", {
				name,
				url,
				icon,
			});
		},

		async updateLink(id, name, url) {
			await $axios.patch(`/api/links/${id}`, {
				name: name,
				url: url,
			});
		},

		async logout() {
			await $axios.post("/logout");
			this.resetState();
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
