<template>
	<div
		:class="[userStore.theme?.color]"
		class="w-full h-full flex flex-col items-center"
	>
		<div class="mt-20">
			<img
				src="~~/assets/place_holder.jpg"
				alt=""
				class="h-32 w-32 rounded-full"
			/>
		</div>
		<div
			:class="[userStore.theme?.text]"
			class="font-medium text-2xl mt-10"
		>
			{{ userStore.name }}
		</div>

		<div
			:class="[userStore.theme?.text]"
			class="mt-10"
		>
			{{ userStore.bio }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();

	const route = useRoute();

	onMounted(async () => {
		await userStore.getProfile(route.params.name);
	});
</script>

<style scoped></style>
