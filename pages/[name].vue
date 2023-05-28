<template>
	<div
		:class="[userStore.theme?.color]"
		class="w-full h-full flex flex-col items-center min-h-screen"
	>
		<div class="mt-10">
			<img
				:src="userStore.image"
				alt=""
				class="h-32 w-32 rounded-full"
			/>
		</div>

		<div
			:class="[userStore.theme?.text]"
			class="font-medium text-2xl mt-6"
		>
			@{{ userStore.name }}
		</div>

		<div
			:class="[userStore.theme?.text]"
			class="mt-4"
		>
			{{ userStore.bio }}
		</div>

		<div v-if="userStore.$state.portfolio">
			<button
				@click="userStore.downloadPortfolio"
				class="flex items-center justify-center w-52 mt-6 py-1 rounded-full font-semibold mb-2"
				:class="[
					userStore.theme.button.text,
					userStore.theme.button.color,
				]"
			>
				Download Portfolio
			</button>
		</div>

		<div class="flex gap-4 mx-auto w-36 mt-4 justify-center">
			<a
				class="flex items-center rounded-full p-2 cursor-pointer"
				:class="[
					userStore.theme.button.color,
					userStore.theme.button.text,
				]"
				:href="userStore.$state.website"
				target="_blank"
				v-if="userStore.$state.website"
			>
				<Icon
					name="icon-park-outline:earth"
					size="30"
				/>
			</a>
			<a
				class="flex items-center rounded-full text-white cursor-pointer"
				:class="[
					userStore.theme.button.color,
					userStore.theme.button.text,
				]"
				:href="`https://www.google.com/maps/search/?api=1&query=${userStore.$state.address}`"
				target="_blank"
				v-if="userStore.$state.address"
			>
				<Icon
					name="logos:google-maps"
					size="30"
				/>
			</a>
		</div>
		<div
			class="mx-auto w-72 mt-4 flex flex-col gap-2"
			:class="[userStore.theme.text]"
		>
			<div
				class="flex items-center gap-6"
				v-if="
					userStore.$state.phone_visibility && userStore.$state.phone
				"
			>
				<div
					class="flex items-center rounded-full p-2"
					:class="[
						userStore.theme.button.color,
						userStore.theme.button.text,
					]"
				>
					<Icon
						name="bi:phone-fill"
						size="24"
					/>
				</div>
				<div>
					{{
						"+" +
						userStore.$state.countryCode +
						" " +
						userStore.$state.phone
					}}
				</div>
			</div>
			<div class="flex items-center gap-6">
				<div
					class="flex items-center rounded-full p-2"
					:class="[
						userStore.theme.button.color,
						userStore.theme.button.text,
					]"
				>
					<Icon
						name="ic:baseline-email"
						size="24"
					/>
				</div>
				<div>
					{{ userStore.email }}
				</div>
			</div>
		</div>

		<div class="w-72 mt-5">
			<a
				v-for="link in userStore.allLinks"
				:href="link.url"
				target="_blank"
				class="flex items-center relative border w-[calc(100%-10px)] mx-auto bg-white mt-4 p-1 rounded-lg"
			>
				<img
					class="rounded-lg h-[30px] aspect-square"
					:src="link.image"
				/>

				<div class="absolute text-[20px] text-center w-full">
					{{ link.name }}
				</div>
			</a>
		</div>

		<button
			class="flex items-center justify-center w-52 mt-6 py-1 rounded-full font-semibold mb-2"
			:class="[userStore.theme.button.text, userStore.theme.button.color]"
			@click="
				useMakeCard(
					userStore.$state.name,
					userStore.$state.email,
					userStore.$state.phone,
					userStore.$state.address
				)
			"
		>
			Save Contact
		</button>

		<button
			class="flex items-center justify-center w-52 mt-6 py-1 rounded-full font-semibold mb-2"
			:class="[userStore.theme.button.text, userStore.theme.button.color]"
			@click="showQr = true"
		>
			See Qr Code
		</button>

		<QrModal
			:show="showQr"
			@close="showQr = false"
		/>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();
	import useMakeCard from "~~/composabales/makeCard";

	const showQr = ref(false);

	const route = useRoute();
	onMounted(async () => {
		await userStore.getProfile(route.params.name);
	});
</script>

<style scoped></style>
