<template>
	<div id="ContactsSection">
		<div class="max-w-sm bg-white rounded-3xl p-6">
			<div class="mt-4 flex items-center gap-7">
				<div class="flex flex-col md:flex-row lg:flex-row">
					<CountryCodePicker
						v-model="countryCode"
						:value="initialCode"
					/>
					<TextInput
						placeholder="Phone number"
						v-model:input="phone"
						class="h-10"
						inputType="text"
						inputStyle="rounded-tr-xl rounded-br-xl"
						:max="25"
						:error="errors && errors.phone ? errors.phone[0] : ''"
					/>
				</div>
				<div
					class="flex gap-3 items-center"
					v-if="phone"
				>
					<div class="text-gray-600 text-sm">Visibility:</div>
					<Switch
						:on="phoneVisibility"
						@toggle="phoneVisibility = !phoneVisibility"
					/>
				</div>
			</div>

			<div class="mt-4">
				<TextInput
					placeholder="Address"
					v-model:input="address"
					:rounded="true"
					inputType="text"
					:error="errors && errors.address ? errors.address[0] : ''"
				/>
			</div>
			<div class="mt-4">
				<TextInput
					placeholder="Website"
					v-model:input="website"
					inputType="text"
					:rounded="true"
					:error="errors && errors.website ? errors.website[0] : ''"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from "~~/stores/user";
	import axios from "~~/plugins/axios";

	const userStore = useUserStore();
	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;

	const phone = ref("");
	const address = ref("");
	const website = ref("");
	const phoneVisibility = ref(false);
	const errors = ref({});
	const countryCode = ref("");
	let initialCode = userStore.$state.countryCode;

	function syncState() {
		phone.value = userStore.$state.phone;
		address.value = userStore.$state.address;
		website.value = userStore.$state.website;
		phoneVisibility.value = userStore.$state.phone_visibility;
		countryCode.value = userStore.$state.countryCode;
	}

	const updateContactInfos = useDebounce(async () => {
		errors.value = {};
		try {
			await $axios.patch(`/api/users/contact/${userStore.$state.id}`, {
				phone: phone.value,
				address: address.value,
				website: website.value,
				phone_visibility: phoneVisibility.value,
				country_code: countryCode.value,
			});

			await userStore.getUser();
		} catch (error: any) {
			errors.value = error.response.data.errors;
		}
	}, 1000);

	onMounted(() => {
		syncState();
	});

	watch(phone, (value) => updateContactInfos());
	watch(address, (value) => updateContactInfos());
	watch(website, (value) => updateContactInfos());
	watch(phoneVisibility, (value) => updateContactInfos());
	watch(countryCode, (value) => updateContactInfos());
</script>

<style scoped></style>
