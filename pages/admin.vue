<template>
	<AdminLayout :noSideBar="!userStore.isMobile">
		<NuxtPage />
	</AdminLayout>
</template>

<script setup lang="ts">
	import { useUserStore } from "~~/stores/user";
	import AdminLayout from "~/layouts/AdminLayout.vue";

	definePageMeta({
		layoutTransition: {
			name: "slide-in",
		},
	});
	const userStore = useUserStore();
</script>

<style scoped></style>
