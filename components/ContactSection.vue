<template>
	<div id="ContactsSection">
		<div class="rounded-3xl w-full">
			<div
				class="mt-4 flex lg:flex-nowrap flex-wrap items-center w-full gap-2"
			>
				<CountryCodePicker v-model="countryCode" />
				<TextInput
					placeholder="Phone number"
					v-model:input="phone"
					class="h-10"
					inputType="number"
					inputStyle="rounded-tr-xl rounded-br-xl"
					:max="25"
					:error="errors && errors.phone ? errors.phone[0] : ''"
				/>
				<div
					class="flex gap-3 items-center"
					v-if="user.phone"
				>
					<div class="text-gray-600 text-sm">Visibility:</div>
					<Switch
						class="w-10"
						:on="user.visibility.phone"
						@toggle="userStore.toggleVisibility('phone')"
					/>
				</div>
			</div>

			<div class="w-full mt-4 flex gap-2 flex-wrap">
				<TextInput
					placeholder="Email"
					v-model:input="email"
					label="Email"
					inputType="text"
					:rounded="true"
					:error="errors && errors.email ? errors.email[0] : ''"
				/>
				<div
					class="flex gap-3 items-center"
					v-if="user.email"
				>
					<div class="text-gray-600 text-sm">Visibility:</div>
					<Switch
						class="w-10"
						:on="user.visibility.email"
						@toggle="userStore.toggleVisibility('email')"
					/>
				</div>
			</div>

			<div class="mt-4 flex gap-3 items-center flex-wrap">
				<div class="flex gap-2 items-center">
					<TextInput
						placeholder="Address"
						v-model:input="address"
						:rounded="true"
						label="Address"
						inputType="text"
						:error="
							errors && errors.address ? errors.address[0] : ''
						"
					/>
					<a
						:href="`https://www.google.com/maps/search/?api=1&query=${address}`"
						target="_blank"
					>
						<Icon
							class="bg-gray-200 p-1 rounded-lg"
							name="logos:google-maps"
							size="30"
						/>
					</a>
				</div>
				<div
					class="flex gap-3 items-center"
					v-if="user.address"
				>
					<div class="text-gray-600 text-sm">Visibility:</div>
					<Switch
						class="w-10"
						:on="user.visibility.address"
						@toggle="userStore.toggleVisibility('address')"
					/>
				</div>
			</div>
			<div class="mt-4 flex gap-2 flex-wrap">
				<TextInput
					placeholder="Website"
					v-model:input="website"
					inputType="text"
					label="Website"
					:rounded="true"
					:error="errors && errors.website ? errors.website[0] : ''"
				/>
				<div
					class="flex gap-3 items-center"
					v-if="user.website"
				>
					<div class="text-gray-600 text-sm">Visibility:</div>
					<Switch
						class="w-10"
						:on="user.visibility.website"
						@toggle="userStore.toggleVisibility('website')"
					/>
				</div>
			</div>

			<Button
				type="primary"
				@click="updateContactInfos"
				class="min-w-[10rem] h-10 mt-10"
				:loading="loading"
			>
				Save
			</Button>
		</div>
	</div>
</template>

<script setup>
	import { useUserStore } from "~~/stores/user";
	import axios from "~~/plugins/axios";
	import { storeToRefs } from "pinia";
	import { useNotificationsStore } from "~/stores/notifications";
	const userStore = useUserStore();
	const { user } = storeToRefs(userStore);
	const { successNotification } = useNotificationsStore();

	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;

	const phone = ref("");
	const address = ref("");
	const website = ref("");
	const email = ref("");
	const errors = ref({});
	const countryCode = ref(
		user.value.country_code ? user.value.country_code : 91
	);
	const loading = ref(false);

	function syncState() {
		phone.value = user.value.phone;
		address.value = user.value.address;
		website.value = user.value.website;
		countryCode.value = user.value.country_code;
		email.value = user.value.email;
	}

	const updateContactInfos = async () => {
		errors.value = {};

		if (email.value == "") {
			errors.value = { email: ["email value cannot be empty"] };

			return;
		}
		try {
			loading.value = true;

			await $axios.patch(`/api/users/contact/${user.value.id}`, {
				phone: phone.value,
				address: address.value,
				website: website.value,
				country_code: countryCode.value ? countryCode.value : 91,
				email: email.value,
			});

			await userStore.getUser();
			userStore.refreshFrame();

			successNotification("Contact info updated successfully");
		} catch (error) {
			errors.value = error.response.data.errors;
		}
		loading.value = false;
	};

	onMounted(() => {
		syncState();
	});
</script>

<style scoped></style>
