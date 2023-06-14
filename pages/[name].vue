<template>
	<Head>
		<title>@{{ user.name }}</title>
	</Head>
	<NuxtLink
		class="fixed hidden lg:block bottom-1 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg"
		to="/"
	>
		Get your free card
	</NuxtLink>
	<div
		class="w-full h-full flex flex-col items-center min-h-screen p-1 bg-white"
	>
		<div
			class="lg:h-[14rem] lg:w-[50rem] mb-14 w-full h-40 rounded-lg relative"
		>
			<img
				:src="user.cover_image"
				alt=""
				class="absolute top-0 left-0 w-full h-full rounded-lg transition-all"
				srcset=""
			/>
			<div
				class="absolute lg:-bottom-16 lg:left-40 -bottom-14 left-1/2 -translate-x-1/2 outline rounded-2xl outline-white"
			>
				<img
					class="lg:h-36 lg:w-36 w-28 rounded-2xl transition-all"
					:src="user.image"
					alt=""
				/>
			</div>
			<div></div>
		</div>
		<div class="font-medium text-2xl mt-6">@{{ user.name }}</div>

		<div class="mt-4">
			{{ user.bio }}
		</div>

		<div class="flex gap-4 mx-auto w-36 mt-4 justify-center">
			<a
				class="flex items-center rounded-full p-2 cursor-pointer"
				:href="user.website"
				target="_blank"
				v-if="user.website"
			>
				<Icon
					name="icon-park-outline:earth"
					size="30"
				/>
			</a>
			<a
				class="flex items-center rounded-full p-2 cursor-pointer"
				:href="`https://www.google.com/maps/search/?api=1&query=${user.address}`"
				target="_blank"
				v-if="user.address"
			>
				<Icon
					name="logos:google-maps"
					size="30"
				/>
			</a>
			<div
				class="flex items-center rounded-full p-2 cursor-pointer"
				@click="showQr = true"
			>
				<Icon
					name="gg:qr"
					size="30"
				/>
			</div>
			<div
				class="flex items-center rounded-full p-2 cursor-pointer"
				@click="
					useMakeCard(user.name, user.email, user.phone, user.address)
				"
			>
				<Icon
					name="material-symbols:download"
					size="30"
				/>
			</div>
		</div>
		<div class="mx-auto w-72 mt-4 flex flex-col gap-2">
			<a
				class="flex items-center gap-6"
				v-if="user.phone_visibility && user.phone"
				:href="`tel:+${user.countryCode + user.phone}`"
			>
				<div class="flex items-center rounded-full p-2">
					<Icon
						name="bi:phone-fill"
						size="24"
					/>
				</div>
				<div>
					{{ "+" + user.countryCode + " " + user.phone }}
				</div>
			</a>
			<a
				:href="`mailto:${user.email}`"
				class="flex items-center gap-6"
			>
				<div class="flex items-center rounded-full p-2">
					<Icon
						name="ic:baseline-email"
						size="24"
					/>
				</div>
				<div>
					{{ user.email }}
				</div>
			</a>
		</div>

		<div class="flex flex-wrap gap-y-1 gap-x-5 mt-5">
			<a
				v-for="link in user.links"
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

<script setup>
	import { storeToRefs } from "pinia";
	import { useProfileStore } from "~~/stores/profile";
	import useMakeCard from "~~/composables/makeCard";

	const profileStore = useProfileStore();

	const { user } = storeToRefs(profileStore);
	const showQr = ref(false);

	const route = useRoute();
	onMounted(async () => {
		await profileStore.fetchProfile(route.params.name);
	});
</script>

<style scoped></style>
