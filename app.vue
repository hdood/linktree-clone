<template>
	<!-- <VitePwaManifest /> -->

	<NuxtPage />

	<Notifications />
</template>

<script setup>
	import { useUserStore } from "~~/stores/user";
	import { storeToRefs } from "pinia";

	const userStore = useUserStore();
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
