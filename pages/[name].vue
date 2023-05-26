<template>
	<div
		:class="[userStore.theme?.color]"
		class="w-full h-full flex flex-col items-center min-h-screen"
	>
		<div class="mt-20">
			<img
				:src="imageUrl(userStore.image)"
				alt=""
				class="h-32 w-32 rounded-full"
			/>
		</div>
		<div
			:class="[userStore.theme?.text]"
			class="font-medium text-2xl mt-6"
		>
			@{{ userStore.name }}
		</div>

		<div
			:class="[userStore.theme?.text]"
			class="mt-4"
		>
			{{ userStore.bio }}
		</div>

		<div class="w-72 mt-5">
			<a
				v-for="link in userStore.allLinks"
				:href="link.url"
				target="_blank"
				class="flex items-center relative border w-[calc(100%-10px)] mx-auto bg-white mt-4 p-1 rounded-lg"
			>
				<img
					class="rounded-lg h-[30px] aspect-square"
					:src="imageUrl(link.image)"
				/>

				<div class="absolute text-[20px] text-center w-full">
					{{ link.name }}
				</div>
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();

	const route = useRoute();
	const imageUrl = (link: string) => {
		return "http://localhost:8000" + link;
	};

	onMounted(async () => {
		await userStore.getProfile(route.params.name);
	});
</script>

<style scoped></style>
