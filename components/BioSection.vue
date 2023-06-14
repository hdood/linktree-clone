<template>
	<div id="ProfileSection">
		<div class="w-full rounded-3xl p-6">
			<div class="flex gap-3">
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
				<div>
					<Button
						:type="name == '' ? 'disabled' : 'success'"
						v-if="editing"
						class="float-right h-10 px-2"
						@click="updateProfileInfos"
					>
						<div class="flex items-baseline gap-2">
							<span class="text-md font-medium">Update</span>
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

			<div>
				<TextInput
					class="mt-4"
					placeholder="Full Name"
					v-model:input="fullName"
					:rounded="true"
					inputType="text"
					:error="
						errors && errors?.full_name ? errors?.full_name[0] : ''
					"
				/>
			</div>

			<div>
				<TextInput
					class="mt-4"
					placeholder="Designation"
					v-model:input="designation"
					:rounded="true"
					inputType="text"
					:error="
						errors && errors?.designation
							? errors?.designation[0]
							: ''
					"
				/>
			</div>

			<textarea
				v-model="bio"
				rows="4"
				maxlength="80"
				placeholder="Bio"
				:rounded="true"
				class="w-full mt-4 bg-[#EFF0EB] text-gray-800 border-2 text-sm border-[#EFF0EB] focus:bg-gray-200 rounded-xl py-3.5 px-3 placeholder-gray-500 resize-none focus:outline-none"
			></textarea>
			<div
				class="flex items-center justify-end text-[#676B5F] text-[13px]"
			>
				{{ bioLengthComputed }}/80
			</div>

			<div class="w-full">
				<div class="flex items-center gap-4 max-w-fit">
					<Button
						type="primary"
						@click="updateProfileInfos"
						:loading="uploading"
						class="p-2 min-w-[2.5rem]"
					>
						Save Bio
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import axios from "~~/plugins/axios";
	import { useUserStore } from "~~/stores/user";
	import { useNotificationsStore } from "~/stores/notifications";
	import { storeToRefs } from "pinia";
	const userStore = useUserStore();
	const { user } = storeToRefs(userStore);

	const { notification } = useNotificationsStore();

	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;

	const uploading = ref(false);

	const loading = ref(false);

	const name = ref("");
	const tempName = ref("");
	const bio = ref("");
	const designation = ref("");
	const fullName = ref("");

	const editing = ref(false);

	const errors = ref({});

	onMounted(() => {
		syncState();
	});

	function syncState() {
		name.value = user.value.name;
		tempName.value = name.value;
		bio.value = user.value.bio;
		designation.value = user.value.designation;
		fullName.value = user.value.full_name;
	}

	const updateProfileInfos = useDebounce(async () => {
		errors.value = [];
		// if the entered name is the same as the current name we don't have update it
		if (tempName.value == name.value && editing.value) {
			loading.value = false;
			editing.value = false;

			return;
		}

		if (tempName.value.includes(" ") && editing.value) {
			loading.value = false;
			errors.value.name = ["username must contain only letters and _"];
			return;
		}
		try {
			loading.value = true;
			await $axios.patch(`/api/users/${user.value.id}`, {
				name: tempName.value,
				bio: bio.value,
				full_name: fullName.value,
				designation: designation.value,
			});

			await userStore.getUser();
			name.value = user.value.name;
			notification(
				{
					type: "success",
					title: "success",
					icon: "fluent:checkmark-12-filled",
					content: "bio content updated successfully",
				},
				5000
			);

			userStore.refreshFrame();
			editing.value = false;
		} catch (error) {
			errors.value = error.response.data?.errors;
		}
		loading.value = false;
	}, 1000);

	const bioLengthComputed = computed(() => {
		return !bio.value ? 0 : bio.value.length;
	});
</script>

<style scoped></style>
