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
		<div class="flex items-center gap-4 max-w-fit">
			<Button
				type="primary"
				@click="choosePortfolio"
				:loading="uploading"
				class="p-2 min-w-[2.5rem]"
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
	const userStore = useUserStore();

	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;
	const uploading = ref(false);
	const portfolioInput = ref(null);
	const title = ref("");
	const errors = ref({ title: "" });

	const props = defineProps(["media"]);

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
		data.append("user_id", userStore.$state.id);
		data.append("data", JSON.stringify({}));
		data.append("type", props.media.name);
		data.append("title", title.value);

		await $axios.post("/api/media/file", data);

		uploading.value = false;
	}

	function choosePortfolio() {
		if (!portfolioInput.value) return;
		portfolioInput?.value.click();
	}
</script>

<style scoped></style>
