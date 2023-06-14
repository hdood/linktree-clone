<template>
	<div id="ThemeSection">
		<div class="w-full rounded-3xl p-6">
			<div
				class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4"
			>
				<div v-for="item in colors">
					<div
						class="border-2 border-gray-500 rounded-lg aspect-[2/3] border-dashed cursor-pointer"
						:class="
							userStore.user.theme_id == item.id
								? 'transition-all duration-150 ease-in p-2'
								: 'transition-all duration-150 ease-out p-0'
						"
					>
						<div
							@click="updateTheme(item.id)"
							class="relative rounded-xl h-full mx-auto"
						>
							<div
								class="absolute left-0 top-0 h-full w-full z-0"
								:class="item.color"
							/>
							<div class="relative z-10 pt-9">
								<div
									class="rounded-full mx-auto w-12 h-12 bg-[#EFF0EA] bg-opacity-70"
								/>

								<div
									class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-4 bg-[#EFF0EA] bg-opacity-70"
								/>
								<div
									class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#EFF0EA] bg-opacity-70"
								/>
								<div
									class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#EFF0EA] bg-opacity-70"
								/>
							</div>
						</div>
					</div>
					<div class="text-center">
						{{ item.name }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();
	import axios from "~~/plugins/axios";

	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;

	async function updateTheme(themeId) {
		let res = await $axios.patch("/api/themes", {
			theme_id: themeId,
		});
		// userStore.$state.theme_id = res.data.theme_id;
		// userStore.getUserTheme();
	}

	const colors = [
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
</script>

<style scoped></style>
