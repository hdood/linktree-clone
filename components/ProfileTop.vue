<template>
	<div
		class="bg-[url('~/assets/background_placeholder.jpeg')] bg-cover bg-no-repeat h-[20rem] mb-20 rounded-lg relative"
	>
		<div
			class="absolute -bottom-16 left-6 outline rounded-2xl outline-white"
		>
			<img
				class="h-40 max-h-[10rem] rounded-2xl"
				:src="userStore.image"
				alt=""
			/>
			<div
				class="w-full bg-gray-800 h-full absolute top-0 opacity-0 hover:opacity-50 transition-opacity duration-300 cursor-pointer max-h-[10rem] rounded-2xl"
				@click="openCropper = true"
			/>
		</div>

		<CropperModal
			v-if="openCropper"
			@data="data = $event"
			@close="openCropper = false"
		/>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();

	const openCropper = ref(false);
	const data = ref({});

	const updateUserImage = async () => {
		try {
			await userStore.updateUserImage(data.value);
			await userStore.getUser();
			setTimeout(() => (openCropper.value = false), 300);
		} catch (error) {
			openCropper.value = false;
			alert(error);
			console.log(error);
		}
	};

	watch(
		() => data.value,
		async () => await updateUserImage()
	);
</script>

<style scoped></style>
