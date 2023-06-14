<template>
	<div class="w-full flex flex-col gap-4">
		<TextInput
			v-model:input="title"
			:placeholder="media.name + ' title'"
			:error="errors.title"
		/>
		<input
			type="file"
			name="portfolio"
			id=""
			:rounded="true"
			ref="portfolioInput"
			@change="uploadPortfolio"
			class="hidden"
		/>
		<div class="flex items-center gap-4 w-full">
			<Button
				type="success"
				@click="choosePortfolio"
				:loading="uploading"
				class="p-2 w-full"
			>
				upload {{ props.media.name }}
			</Button>
			<div
				class="cursor-pointer"
				@click="userStore.downloadPortfolio"
				v-if="userStore.$state.portfolio"
			>
				<span class="underline">Download current portfolio</span>
				<Icon
					name="material-symbols:download"
					class="mr-0.5"
					size="18"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import axios from "~~/plugins/axios";
	import { useUserStore } from "~~/stores/user";
	import { useMediaStore } from "~/stores/media";
	import { storeToRefs } from "pinia";
	const userStore = useUserStore();
	const mediaStore = useMediaStore();

	const { user } = storeToRefs(userStore);

	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;
	const uploading = ref(false);
	const portfolioInput = ref(null);
	const title = ref("");
	const errors = ref({ title: "" });

	const props = defineProps(["media"]);
	const onUploadProgress = (progressEvent) => {
		const { loaded, total } = progressEvent;
		let percent = Math.floor((loaded * 100) / total);
		if (percent < 100) {
			console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
		}
	};

	async function uploadPortfolio() {
		uploading.value = true;

		if (title.value == "") {
			errors.value.name = "the title field is required";
			return false;
		}

		if (!portfolioInput.value) return;
		const portfolio = portfolioInput.value.files?.[0];

		const data = new FormData();

		data.append("media", portfolio);
		data.append("user_id", user.value.id);
		data.append("data", JSON.stringify({}));
		data.append("type", props.media.name);
		data.append("title", title.value);

		try {
			await $axios.post(
				"/api/media/file",
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
				onUploadProgress
			);
			mediaStore.fetchMedia(user.value.id);
			userStore.refreshFrame();
		} catch (error) {}

		uploading.value = false;
	}

	function choosePortfolio() {
		if (!portfolioInput.value) return;
		portfolioInput?.value.click();
	}
</script>

<style scoped></style>
