<template>
	<div class="flex flex-col gap-3">
		<textInput
			v-model:input="url"
			:placeholder="`${props.media?.name} post link`"
			:error="errors.url"
		/>

		<Button
			type="success"
			class="px-2 h-10"
			@click="save"
			:loading="loading"
		>
			Add Media</Button
		>
	</div>
</template>

<script setup>
	import axios from "~~/plugins/axios";
	import { useUserStore } from "~~/stores/user";
	import { useMediaStore } from "~/stores/media";
	const userStore = useUserStore();
	const mediaStore = useMediaStore();

	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;

	const props = defineProps(["media"]);
	const errors = ref({});
	const url = ref("");
	const loading = ref(false);

	async function save() {
		loading.value = true;
		if (url.value == "") {
			errors.value.url = "url cannot be empty";
			loading.value = false;
			return false;
		}

		try {
			await $axios.post("/api/media/embedded", {
				user_id: userStore.$state.id,
				type: props.media?.name,
				data: JSON.stringify({
					url: url.value,
				}),
			});
			await mediaStore.fetchMedia();
		} catch (error) {
			console.log(error);
		}
		loading.value = false;
	}
</script>

<style scoped></style>
