<template>
	<!-- <VitePwaManifest /> -->

	<NuxtPage v-if="show" />

	<UpdateLinkOverlay v-if="isMobile && updatedLinkId" />
	<AddLinkOverlay v-if="isMobile && addLinkOverlay" />
	<PreviewOverlay v-if="!isMobile && isPreviewOverlay" />
</template>

<script setup>
	import { useUserStore } from "~~/stores/user";
	import { storeToRefs } from "pinia";

	const userStore = useUserStore();
	const { isMobile, isPreviewOverlay, updatedLinkId, addLinkOverlay, id } =
		storeToRefs(userStore);
	const route = useRoute();
	let show = ref(false);

	watch(
		() => id.value,
		() => {
			if (!userStore.colors) {
				userStore.colors = colors();
			}
		}
	);

	onMounted(async () => {
		userStore.colors = colors();
		updatedLinkId.value = 0;
		addLinkOverlay.value = false;
		isPreviewOverlay.value = false;
		isMobile.value = false;

		await userStore.getTokens();

		try {
			if (userStore.id) {
				await userStore.hasSessionExpired();
				await userStore.getUser();
				await userStore.getAllLinks();
			}
		} catch (error) {
			console.log(error);
		}

		if ("ontouchstart" in window) {
			isMobile.value = true;
		}

		setTimeout(() => (show.value = true), 1);
	});

	const colors = () => {
		return [
			{
				id: 1,
				color: "bg-white",
				text: "text-black",
				name: "Air White",
				button: {
					color: "bg-black",
					text: "text-white",
				},
			},
			{
				id: 2,
				color: "bg-gray-800",
				text: "text-white",
				name: "Lake Black",
				button: {
					color: "bg-white",
					text: "text-black",
				},
			},
			{
				id: 3,
				color: "bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500",
				text: "text-white",
				name: "Purple Pie",
				button: {
					color: "bg-black",
					text: "text-white",
				},
			},
			{
				id: 4,
				color: "bg-gradient-to-t from-gray-500 via-blue-500 to-green-500",
				text: "text-white",
				name: "Green Grass",
				button: {
					color: "bg-black",
					text: "text-white",
				},
			},
			{
				id: 5,
				color: "bg-gradient-to-t from-orange-500 via-green-500 to-red-500",
				text: "text-white",
				name: "Traffic Lights",
				button: {
					color: "bg-black",
					text: "text-white",
				},
			},
			{
				id: 6,
				color: "bg-gradient-to-b from-blue-800 via-blue-500 to-blue-200",
				text: "text-white",
				name: "Blue Sky",
				button: {
					color: "bg-black",
					text: "text-white",
				},
			},
			{
				id: 7,
				color: "bg-gradient-to-t from-lime-500 via-indigo-700 to-amber-500",
				text: "text-white",
				name: "Soft Horizon",
				button: {
					color: "bg-black",
					text: "text-white",
				},
			},
			{
				id: 8,
				color: "bg-gradient-to-t from-gray-800 to-emerald-500",
				text: "text-white",
				name: "Tinted Lake",
				button: {
					color: "bg-black",
					text: "text-white",
				},
			},
		];
	};
</script>
<style>
	* {
		transition: color 100ms ease, background-color 300ms ease;
	}
</style>
