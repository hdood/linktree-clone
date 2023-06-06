<template>
	<div id="ProfileSection">
		<div class="w-full bg-white rounded-3xl p-6">
			<div class="flex items-center gap-3">
				<div class="basis-11/12">
					<div v-if="editing">
						<TextInput
							placeholder="Profile Title"
							v-model:input="tempName"
							:rounded="true"
							inputType="text"
							:max="25"
							:error="
								errors && errors?.name ? errors?.name[0] : ''
							"
						/>
						<Icon
							v-if="loading"
							name="eos-icons:loading"
							size="25"
						/>
					</div>
					<span
						class="text-xl font-medium"
						v-else
					>
						{{ tempName }}
					</span>
				</div>
				<div v-if="tempName != '' && !errors.name">
					<Button
						:type="name == '' ? 'disabled' : 'success'"
						v-if="editing"
						class="float-right h-10 px-2"
						@click="editing = false"
					>
						<div class="flex items-baseline gap-2">
							<span class="text-md font-medium">Done</span>
							<icon
								size="15"
								name="fluent:checkmark-12-filled"
							/>
						</div>
					</Button>
					<Button
						v-else
						type="info"
						class="float-right h-10 px-2"
						@click="editing = true"
					>
						<div class="flex items-baseline gap-2">
							<span class="text-md font-medium">Edit</span>
							<icon
								size="15"
								name="material-symbols:edit"
							/>
						</div>
					</Button>
				</div>
			</div>

			<textarea
				v-model="designation"
				rows="4"
				maxlength="80"
				placeholder="Designation"
				:rounded="true"
				class="w-full mt-4 bg-[#EFF0EB] text-gray-800 border-2 text-sm border-[#EFF0EB] focus:bg-gray-200 rounded-xl py-3.5 px-3 placeholder-gray-500 resize-none focus:outline-none"
			></textarea>
			<div
				class="flex items-center justify-end text-[#676B5F] text-[13px]"
			>
				{{ designationLengthComputed }}/80
			</div>

			<div class="w-full">
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
						{{ userStore.$state.portfolio ? "Update" : "Upload" }}
						Portfolio
					</Button>
					<div
						class="cursor-pointer"
						@click="userStore.downloadPortfolio"
						v-if="userStore.$state.portfolio"
					>
						<span class="underline"
							>Download current portfolio</span
						>
						<Icon
							name="material-symbols:download"
							class="mr-0.5"
							size="18"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import axios from "~~/plugins/axios";
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();

	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;

	const uploading = ref(false);
	const portfolioInput = ref<null | HTMLInputElement>(null);

	const loading = ref(false);

	const name = ref("");
	const tempName = ref("");
	const designation = ref("");

	const editing = ref(false);

	const errors = ref<{ name?: Array<string> }>({});

	onMounted(() => {
		syncState();
	});

	async function uploadPortfolio() {
		uploading.value = true;

		if (!portfolioInput.value) return;
		const portfolio = portfolioInput.value.files?.[0];

		await userStore.savePortfolio(portfolio);
		uploading.value = false;
		await userStore.getUser();
	}

	function syncState() {
		name.value = userStore.$state.name;
		tempName.value = userStore.$state.name;
		designation.value = userStore.$state.bio;
	}

	const updateProfileInfos = useDebounce(async () => {
		loading.value = true;

		// if the entered name is the same as the current name we don't have update it
		if (tempName.value == name.value && editing.value) {
			loading.value = false;
			return;
		}

		if (tempName.value.includes(" ") && editing.value) {
			loading.value = false;
			errors.value.name = ["username must contain only letters and _"];
			return;
		}
		try {
			await $axios.patch(`/api/users/${userStore.$state.id}`, {
				name: tempName.value,
				bio: designation.value,
			});

			await userStore.getUser();
			name.value = userStore.$state.name;
		} catch (error: any) {
			errors.value = error.response.data.errors;
		}
		loading.value = false;
	}, 1000);

	watch(tempName, (value) => {
		if (!editing) return false;
		errors.value = {};

		updateProfileInfos();
	});
	watch(designation, (value) => updateProfileInfos());

	function choosePortfolio() {
		if (!portfolioInput.value) return;
		portfolioInput?.value.click();
	}

	const designationLengthComputed = computed(() => {
		return !designation.value ? 0 : designation.value.length;
	});
</script>

<style scoped></style>
