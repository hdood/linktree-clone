<template>
	<div id="ContactsSection">
		<div class="max-w-sm rounded-3xl p-6">
			<div class="mt-4 flex items-center gap-7">
				<div
					class="flex flex-col md:flex-row md:gap-3 lg:gap-3 lg:flex-row"
				>
					<CountryCodePicker v-model="countryCode" />
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
						class="w-10"
						:on="phoneVisibility"
						@toggle="phoneVisibility = !phoneVisibility"
					/>
				</div>
			</div>

			<div class="mt-4 flex gap-3 items-center">
				<TextInput
					placeholder="Address"
					v-model:input="address"
					:rounded="true"
					inputType="text"
					:error="errors && errors.address ? errors.address[0] : ''"
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

<script setup>
	import { useUserStore } from "~~/stores/user";
	import axios from "~~/plugins/axios";
	import { storeToRefs } from "pinia";
	const userStore = useUserStore();
	const { user } = storeToRefs(userStore);

	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;

	const phone = ref("");
	const address = ref("");
	const website = ref("");
	const phoneVisibility = ref(false);
	const errors = ref({});
	const countryCode = ref(91);

	function syncState() {
		phone.value = user.value.phone;
		address.value = user.value.address;
		website.value = user.value.website;
		phoneVisibility.value = user.value.phone_visibility;
		countryCode.value = user.value.countryCode;
	}

	const updateContactInfos = useDebounce(async () => {
		errors.value = {};
		try {
			await $axios.patch(`/api/users/contact/${user.value.id}`, {
				phone: phone.value,
				address: address.value,
				website: website.value,
				phone_visibility: phoneVisibility.value,
				country_code: countryCode.value,
			});

			await userStore.getUser();
			userStore.refreshFrame();
		} catch (error) {
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
