<template>
	<!-- <VitePwaManifest /> -->

	<NuxtPage />

	<Notifications />
</template>

<script setup>
	import { useUserStore } from "~~/stores/user";

	const userStore = useUserStore();

	userStore.$onAction(
		({
			name, // name of the action
			store, // store instance, same as `someStore`
			args, // array of parameters passed to the action
			after, // hook after the action returns or resolves
			onError, // hook if the action throws or rejects
		}) => {
			after((result) => {
				if (name != "refreshFrame") store.refreshFrame();
			});
		}
	);
	let show = ref(false);

	onMounted(async () => {
		try {
			await userStore.getCSRFCookie();
		} catch (error) {
			console.log(error);
		}

		setTimeout(() => (show.value = true), 1);
	});
</script>
<style>
	* {
		transition: color 100ms ease, background-color 300ms ease;
	}
</style>
