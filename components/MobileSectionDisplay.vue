<template>
	<div
		v-if="userStore.theme"
		class="md:block fixed hidden right-0 lg:w-[500px] w-[310px] h-[calc(100%-20px)] mt-[20px] mx-auto border-l border-l-gray-300 pt-20"
	>
		<div
			class="mx-auto mt-16 mb-16 flex items-center justify-center w-full lg:max-w-[230px] max-w-[200px] lg:h-[460px] h-[400px] p-3 rounded-3xl relative"
		>
			<img
				class="absolute z-10 pointer-events-none select-none"
				src="~/assets/images/mobile-case.png"
			/>

			<div
				class="w-full h-full absolute lg:max-w-[220px] max-w-[195px] rounded-3xl z-0"
				:class="userStore.theme.color"
			/>

			<div class="h-full mx-auto w-full overflow-auto z-10">
				<img
					class="rounded-full min-w-[60px] w-[60px] mx-auto mt-8"
					:src="userStore.image"
				/>

				<div
					class="text-center text-sm font-semibold mt-4 break-words"
					:class="userStore.theme.text"
				>
					@{{ userStore.allLowerCaseNoCaps(userStore.name) }}
				</div>

				<div
					class="text-center text-[8px] font-semibold mt-2"
					:class="userStore.theme.text"
				>
					<div class="px-8 break-words">
						{{ userStore.bio }}
					</div>
				</div>

				<div
					class="mt-4"
					v-if="userStore.$state.portfolio"
				>
					<button
						@click="userStore.downloadPortfolio"
						class="flex items-center mt-2 mx-auto justify-center w-36 rounded-full text-xs mb-2"
						:class="[
							userStore.theme.button.color,
							userStore.theme.button.text,
						]"
					>
						Download Portfolio
					</button>
				</div>

				<div class="flex gap-4 mx-auto w-36 mt-4 justify-center">
					<a
						class="flex items-center rounded-full p-1 cursor-pointer"
						:class="[
							userStore.theme.button.color,
							userStore.theme.button.text,
						]"
						:href="userStore.$state.website"
						v-if="userStore.$state.website"
						target="_blank"
					>
						<Icon name="icon-park-outline:earth" />
					</a>
					<a
						class="flex items-center rounded-full p-1 cursor-pointer"
						:class="[
							userStore.theme.button.color,
							userStore.theme.button.text,
						]"
						:href="`https://www.google.com/maps/search/?api=1&query=${userStore.$state.address}`"
						v-if="userStore.$state.address"
						target="_blank"
					>
						<Icon name="logos:google-maps" />
					</a>
					<div
						class="flex items-center rounded-full p-1 cursor-pointer"
						:class="[
							userStore.theme.button.color,
							userStore.theme.button.text,
						]"
					>
						<Icon name="gg:qr" />
					</div>
					<div
						class="flex items-center rounded-full p-1 cursor-pointer"
						:class="[
							userStore.theme.button.color,
							userStore.theme.button.text,
						]"
						@click="
							useMakeCard(
								userStore.$state.name,
								userStore.$state.email,
								userStore.$state.phone,
								userStore.$state.address
							)
						"
					>
						<Icon name="material-symbols:download" />
					</div>
				</div>
				<div
					class="mx-auto w-36 mt-4 text-xs flex flex-col gap-2"
					:class="[userStore.theme.text]"
				>
					<div
						class="flex items-center gap-2"
						v-if="
							userStore.$state.phone_visibility &&
							userStore.$state.phone
						"
					>
						<div
							class="flex items-center rounded-full p-1"
							:class="[
								userStore.theme.button.color,
								userStore.theme.button.text,
							]"
						>
							<Icon name="bi:phone-fill" />
						</div>
						<div class="text-xs">
							{{
								"+" +
								userStore.$state.countryCode +
								userStore.$state.phone
							}}
						</div>
					</div>
					<div
						class="flex items-center gap-2"
						v-if="true"
					>
						<div
							class="flex items-center rounded-full p-1"
							:class="[
								userStore.theme.button.color,
								userStore.theme.button.text,
							]"
						>
							<Icon name="ic:baseline-email" />
						</div>
						<div>
							{{ userStore.email }}
						</div>
					</div>
				</div>
				<div class="flex gap-2 mt-5">
					<a
						v-for="link in userStore.allLinks"
						:href="link.url"
						target="_blank"
						class="flex items-center relative border min-w-fit mx-auto bg-white mt-4 p-1 rounded-lg"
					>
						<img
							class="rounded-lg h-[30px] aspect-square"
							:src="link.image"
						/>
					</a>
				</div>

				<div class="pb-12" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useUserStore } from "~~/stores/user";
	import useMakeCard from "~~/composabales/makeCard";
	const userStore = useUserStore();
</script>
