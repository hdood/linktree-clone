<template>
	<AdminLayout>
		<div
			id="ApperancePage"
			class="flex h-[calc(100%-50px)] pb-4"
		>
			<div
				class="lg:w-[calc(100%-500px)] md:w-[calc(100%-330px)] w-full md:pt-20 pt-14"
			>
				<div class="max-w-[750px] mx-auto pb-24">
					<div id="ProfileSection">
						<div
							class="font-semibold pb-4"
							:class="
								userStore.isMobile
									? 'mt-8 text-2xl'
									: 'mt-20 md:mt-8 text-xl'
							"
						>
							Profile
						</div>

						<div class="w-full bg-white rounded-3xl p-6">
							<div
								class="flex items-center justify-between gap-4"
							>
								<img
									class="rounded-full w-[90px]"
									:src="userStore.image"
								/>

								<div class="w-full">
									<button
										@click="openCropper = true"
										class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2"
									>
										Pick image
									</button>
								</div>
							</div>

							<div class="mt-4">
								<TextInput
									placeholder="Profile Title"
									v-model:input="name"
									:rounded="true"
									inputType="text"
									:max="25"
									:error="
										errors && errors.name
											? errors.name[0]
											: ''
									"
								/>
							</div>

							<textarea
								v-model="bio"
								rows="4"
								maxlength="80"
								placeholder="Bio"
								@focus="isBioFocused = true"
								:rounded="true"
								@blur="isBioFocused = false"
								:class="isBioFocused ? 'border-gray-900' : ''"
								class="w-full mt-4 bg-[#EFF0EB] text-gray-800 border-2 text-sm border-[#EFF0EB] rounded-xl py-3.5 px-3 placeholder-gray-500 resize-none focus:outline-none"
							></textarea>
							<div
								class="flex items-center justify-end text-[#676B5F] text-[13px]"
							>
								{{ bioLengthComputed }}/80
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
									<button
										@click="choosePortfolio"
										class="flex items-center justify-center w-40 py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2"
									>
										{{
											userStore.$state.portfolio
												? "Update"
												: "Upload"
										}}
										Portfolio
									</button>
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

					<!-- Contact infos-->

					<div id="ProfileSection">
						<div
							class="font-semibold pb-4"
							:class="
								userStore.isMobile
									? 'mt-8 text-2xl'
									: 'mt-20 md:mt-8 text-xl'
							"
						>
							Contact
						</div>

						<div class="w-full bg-white rounded-3xl p-6">
							<div class="mt-4 flex items-center gap-7">
								<div class="flex">
									<CountryCodePicker
										v-model="countryCode"
										:value="initialCode"
									/>
									<TextInput
										placeholder="Phone number"
										v-model:input="phone"
										class="w-80 h-10"
										inputType="text"
										inputStyle="rounded-tr-xl rounded-br-xl"
										:max="25"
										:error="
											errors && errors.phone
												? errors.phone[0]
												: ''
										"
									/>
								</div>
								<div
									class="flex gap-3 items-center"
									v-if="phone"
								>
									<div class="text-gray-600 text-sm">
										Visibility:
									</div>
									<Switch
										:on="phoneVisibility"
										@toggle="
											phoneVisibility = !phoneVisibility
										"
									/>
								</div>
							</div>

							<div class="mt-4">
								<TextInput
									placeholder="Address"
									v-model:input="address"
									:rounded="true"
									inputType="text"
									:error="
										errors && errors.address
											? errors.address[0]
											: ''
									"
								/>
							</div>
							<div class="mt-4">
								<TextInput
									placeholder="Website"
									v-model:input="website"
									inputType="text"
									:rounded="true"
									:error="
										errors && errors.website
											? errors.website[0]
											: ''
									"
								/>
							</div>
						</div>
					</div>

					<div id="ThemeSection">
						<div
							class="font-semibold pb-4"
							:class="
								userStore.isMobile
									? 'mt-8 text-2xl'
									: 'mt-20 md:mt-8 text-xl'
							"
						>
							Themes
						</div>

						<div class="w-full bg-white rounded-3xl p-6">
							<div
								class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4"
							>
								<div v-for="item in userStore.colors">
									<div
										class="border-2 border-gray-500 rounded-lg aspect-[2/3] border-dashed cursor-pointer"
										:class="
											userStore.theme_id == item.id
												? 'transition-all duration-150 ease-in p-2'
												: 'transition-all duration-150 ease-out p-0'
										"
									>
										<div
											@click="updateTheme(item.id)"
											class="relative rounded-xl h-full mx-auto"
										>
											<div
												class="absolute left-0 top-0 h-full w-full z-0"
												:class="item.color"
											/>
											<div class="relative z-10 pt-9">
												<div
													class="rounded-full mx-auto w-12 h-12 bg-[#EFF0EA] bg-opacity-70"
												/>

												<div
													class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-4 bg-[#EFF0EA] bg-opacity-70"
												/>
												<div
													class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#EFF0EA] bg-opacity-70"
												/>
												<div
													class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#EFF0EA] bg-opacity-70"
												/>
											</div>
										</div>
									</div>
									<div class="text-center">
										{{ item.name }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<MobileSectionDisplay />
			<CropperModal
				v-if="openCropper"
				@data="data = $event"
				@close="openCropper = false"
			/>
		</div>
	</AdminLayout>
</template>

<script setup>
	import AdminLayout from "~~/layouts/AdminLayout.vue";
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();

	definePageMeta({ middleware: "is-logged-out" });

	const name = ref("");
	const phone = ref("");
	const phoneVisibility = ref(false);
	const email = ref("");
	const bio = ref("");
	const website = ref("");
	const address = ref("");
	const countryCode = ref("");
	const data = ref(null);
	const errors = ref("");
	const isBioFocused = ref(false);
	const openCropper = ref(false);
	const portfolioInput = ref(null);
	let initialCode = userStore.$state.countryCode;

	async function uploadPortfolio() {
		const portfolio = portfolioInput.value.files[0];

		await userStore.savePortfolio(portfolio);
	}

	function choosePortfolio() {
		portfolioInput.value.click();
	}

	onMounted(() => {
		name.value = userStore.name;
		bio.value = userStore.bio;
		phone.value = userStore.$state.phone;
		phoneVisibility.value = userStore.$state.phone_visibility;
		address.value = userStore.$state.address;
		website.value = userStore.$state.website;
		countryCode.value = userStore.$state.countryCode;
	});

	const updateTheme = async (themeId) => {
		try {
			await userStore.updateTheme(themeId);
		} catch (error) {
			console.log(error);
		}
	};

	const updateUserDetails = useDebounce(async () => {
		try {
			await userStore.updateUserDetails(
				name.value,
				bio.value,
				phone.value,
				phoneVisibility.value,
				countryCode.value,
				address.value,
				website.value
			);
			await userStore.getUser();
		} catch (error) {
			console.log(error);
			errors.value = error.response.data.errors;
		}
	}, 1000);

	const bioLengthComputed = computed(() => {
		return !bio.value ? 0 : bio.value.length;
	});

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
		() => name.value,
		async () => await updateUserDetails()
	);
	watch(
		() => bio.value,
		async () => await updateUserDetails()
	);

	watch(
		() => email.value,
		async () => await updateUserDetails()
	);
	watch(
		() => phone.value,
		async () => await updateUserDetails()
	);
	watch(
		() => countryCode.value,
		async () => await updateUserDetails()
	);
	watch(
		() => phoneVisibility.value,
		async () => await updateUserDetails()
	);
	watch(
		() => address.value,
		async () => await updateUserDetails()
	);
	watch(
		() => website.value,
		async () => await updateUserDetails()
	);
	watch(
		() => data.value,
		async () => await updateUserImage()
	);
</script>
