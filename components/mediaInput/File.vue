<template>
	<div class="w-full flex flex-col gap-4">
		<TextInput
			v-model:input="title"
			:placeholder="props.media.name + ' title'"
			:error="errors.title"
		/>
		<input
			type="file"
			name="portfolio"
			id=""
			:rounded="true"
			ref="portfolioInput"
			@change="selectFile"
			class="hidden"
		/>
		<div class="flex items-center gap-4 w-full">
			<Button
				type="success"
				@click="choosePortfolio"
				class="p-2 min-w-[10rem]"
			>
				select {{ props.media.name }}
			</Button>

			<div v-if="file">selected file : {{ file.name }}</div>

			<span class="italic text-red-400">
				{{ errors?.file }}
			</span>
		</div>
		<div class="flex justify-center gap-4 w-full relative">
			<Button
				type="primary"
				:loading="uploading"
				@click="uploadFile"
				class="p-2 min-w-[10rem] relative"
			>
				upload {{ props.media.name }}
			</Button>
			<div
				class="absolute -bottom-3 left-0 bg-white h-1 transition-all duration-300 w-full"
			></div>
			<div
				class="absolute -bottom-3 left-0 bg-indigo-600 h-1 transition-all duration-300"
				:style="{
					width: progressBarPercentage + '%',
					transition: 'all 300ms ease',
				}"
			></div>
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
	const { media } = storeToRefs(mediaStore);

	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;
	const uploading = ref(false);
	const portfolioInput = ref(null);
	const title = ref("");
	const errors = ref({ title: "" });
	const file = ref(false);

	const progressBarPercentage = ref(0);

	const props = defineProps(["media"]);

	const onUploadProgress = (progressEvent) => {
		const { loaded, total } = progressEvent;
		let percent = Math.floor((loaded * 100) / total);
		if (percent <= 100) {
			progressBarPercentage.value = percent;
		}
	};

	function selectFile(e) {
		file.value = e.target.files[0];
	}

	watch(file, (value) => console.log(value));

	async function uploadFile() {
		uploading.value = true;

		if (title.value == "") {
			errors.value.name = "the title field is required";
			uploading.value = false;
			return false;
		}

		if (!file.value) {
			uploading.value = false;
			errors.file = "please choose a file";
			return false;
		}

		const data = new FormData();

		data.append("media", file.value);
		data.append("user_id", user.value.id);
		data.append("data", JSON.stringify({}));
		data.append("type", props.media.type);
		data.append("title", title.value);
		data.append("order", media.value.length);
		data.append("icon", props.media.icon);
		data.append("name", props.media.name);

		try {
			await $axios.post("/api/media/file", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress,
			});
			mediaStore.fetchMedia(user.value.id);
			userStore.refreshFrame();
		} catch (error) {}
		progressBarPercentage.value = 0;

		uploading.value = false;
	}

	function choosePortfolio() {
		if (!portfolioInput.value) return;
		portfolioInput?.value.click();
	}
</script>

<style scoped></style>
