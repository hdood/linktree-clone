<template>
	<Head>
		<title>@{{ profileStore.name }}</title>
	</Head>
	<NuxtLink
		class="fixed hidden lg:block bottom-1 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg"
		to="/"
	>
		Get your free card
	</NuxtLink>
	<div
		:class="[profileStore?.theme?.color]"
		class="w-full h-full flex flex-col items-center min-h-screen p-1 bg-white"
	>
		<div
			class="lg:h-[14rem] lg:w-[50rem] mb-14 w-full h-40 rounded-lg relative"
		>
			<img
				:src="profileStore.$state.coverImage"
				alt=""
				class="absolute top-0 left-0 w-full h-full rounded-lg transition-all"
				srcset=""
			/>
			<div
				class="absolute lg:-bottom-16 lg:left-40 -bottom-14 left-1/2 -translate-x-1/2 outline rounded-2xl outline-white"
			>
				<img
					class="lg:h-36 lg:w-36 w-28 rounded-2xl transition-all"
					:src="profileStore.image"
					alt=""
				/>
			</div>
			<div></div>
		</div>
		<div
			:class="[profileStore.theme?.text]"
			class="font-medium text-2xl mt-6"
		>
			@{{ profileStore.name }}
		</div>

		<div
			:class="[profileStore.theme?.text]"
			class="mt-4"
		>
			{{ profileStore.bio }}
		</div>

		<div v-if="profileStore.$state.portfolio">
			<button
				@click="profileStore.downloadPortfolio"
				class="flex items-center justify-center w-52 mt-6 py-1 rounded-full font-semibold mb-2"
				:class="[
					profileStore?.theme?.button.text,
					profileStore?.theme?.button.color,
				]"
			>
				Download Portfolio
			</button>
		</div>

		<div class="flex gap-4 mx-auto w-36 mt-4 justify-center">
			<a
				class="flex items-center rounded-full p-2 cursor-pointer"
				:class="[
					profileStore?.theme?.button.color,
					profileStore?.theme?.button.text,
				]"
				:href="profileStore.$state.website"
				target="_blank"
				v-if="profileStore.$state.website"
			>
				<Icon
					name="icon-park-outline:earth"
					size="30"
				/>
			</a>
			<a
				class="flex items-center rounded-full p-2 cursor-pointer"
				:class="[
					profileStore?.theme?.button.color,
					profileStore?.theme?.button.text,
				]"
				:href="`https://www.google.com/maps/search/?api=1&query=${profileStore.$state.address}`"
				target="_blank"
				v-if="profileStore.$state.address"
			>
				<Icon
					name="logos:google-maps"
					size="30"
				/>
			</a>
			<div
				class="flex items-center rounded-full p-2 cursor-pointer"
				:class="[
					profileStore?.theme?.button.color,
					profileStore?.theme?.button.text,
				]"
				@click="showQr = true"
			>
				<Icon
					name="gg:qr"
					size="30"
				/>
			</div>
			<div
				class="flex items-center rounded-full p-2 cursor-pointer"
				:class="[
					profileStore?.theme?.button.color,
					profileStore?.theme?.button.text,
				]"
				@click="
					useMakeCard(
						profileStore.$state.name,
						profileStore.$state.email,
						profileStore.$state.phone,
						profileStore.$state.address
					)
				"
			>
				<Icon
					name="material-symbols:download"
					size="30"
				/>
			</div>
		</div>
		<div
			class="mx-auto w-72 mt-4 flex flex-col gap-2"
			:class="[profileStore.theme?.text]"
		>
			<a
				class="flex items-center gap-6"
				v-if="
					profileStore.$state.phone_visibility &&
					profileStore.$state.phone
				"
				:href="`tel:+${
					profileStore.$state.countryCode + profileStore.$state.phone
				}`"
			>
				<div
					class="flex items-center rounded-full p-2"
					:class="[
						profileStore?.theme?.button.color,
						profileStore?.theme?.button.text,
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
						profileStore.$state.countryCode +
						" " +
						profileStore.$state.phone
					}}
				</div>
			</a>
			<a
				:href="`mailto:${profileStore.email}`"
				class="flex items-center gap-6"
			>
				<div
					class="flex items-center rounded-full p-2"
					:class="[
						profileStore?.theme?.button.color,
						profileStore?.theme?.button.text,
					]"
				>
					<Icon
						name="ic:baseline-email"
						size="24"
					/>
				</div>
				<div>
					{{ profileStore.email }}
				</div>
			</a>
		</div>

		<div class="flex flex-wrap gap-y-1 gap-x-5 mt-5">
			<a
				v-for="link in profileStore.allLinks"
				:href="link.url"
				target="_blank"
				class="flex items-center flex-wrap relative border min-w-fit mx-auto bg-white mt-4 p-1 rounded-lg"
			>
				<icon
					:name="link.icon"
					size="30"
				/>
			</a>
		</div>

		<QrModal
			:show="showQr"
			@close="showQr = false"
		/>
	</div>
</template>

<script setup lang="ts">
	import { useProfileStore } from "~/stores/profile";
	const profileStore = useProfileStore();
	import useMakeCard from "~~/composabales/makeCard";

	const showQr = ref(false);

	const route = useRoute();
	onMounted(async () => {
		await profileStore.getProfile(route.params.name);
	});
</script>

<style scoped></style>
