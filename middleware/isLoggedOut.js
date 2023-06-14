import { useUserStore } from "~~/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const userStore = useUserStore();
	try {
		await userStore.getUser();
		return true;
	} catch (error) {
		return navigateTo("/");
	}
});
