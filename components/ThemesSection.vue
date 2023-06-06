<template>
	<div id="ThemeSection">
		<div class="w-full bg-white rounded-3xl p-6">
			<div
				class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4"
			>
				<div v-for="item in userStore.colors">
					<div
						class="border-2 border-gray-500 rounded-lg aspect-[2/3] border-dashed cursor-pointer"
						:class="
							userStore.theme_id == item.id
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

<script setup lang="ts">
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();
	import axios from "~~/plugins/axios";

	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;

	async function updateTheme(themeId: any) {
		let res = await $axios.patch("/api/themes", {
			theme_id: themeId,
		});
		userStore.$state.theme_id = res.data.theme_id;
		userStore.getUserTheme();
	}
</script>

<style scoped></style>
