<template>
	<div
		class="flex h-screen gap-2 fixed w-screen dark:bg-slate-800 bg-gray-100"
	>
		<div
			class="h-screen hidden md:block lg:block w-24 hover:w-[12rem] [&:hover_.item]:inline [&:hover_.item-wrapper]:w-36 [&:hover_.item-wrapper]:transition-all duration-300 transition-all"
		>
			<SideNavigation />
		</div>
		<div
			class="main pb-14 lg:pb-0 md:pb-0 flex-grow h-full flex flex-col items-center overflow-y-scroll overflow-x-hidden"
		>
			<div
				class="mt-3 lg:flex justify-between md:flex lg:md:mb-6 mb-3 px-4 w-full py-2 rounded-lg"
			>
				<Search />
				<Button
					class="justify-self-end lg:block md:block h-10 px-2 min-w-fit hidden"
					type="primary"
				>
					<div class="flex gap-2 items-center">
						<icon
							name="material-symbols:share"
							size="25"
						/>
						<span class="text-lg font-medium block">Share</span>
					</div>
				</Button>
			</div>
			<div class="w-full min-h-fit px-2 p-1">
				<slot />
			</div>
		</div>

		<div class="lg:hidden md:hidden fixed bottom-0 w-full z-50">
			<BottomNavigation />
		</div>
	</div>
</template>

<script setup lang="ts">
	import SideNavigation from "./partials/SideNavigation.vue";
	import Search from "~/components/Search.vue";
</script>

<style scoped>
	.main::-ms-track {
		background-color: red;
	}
	.main::-webkit-scrollbar-thumb {
		background-color: red;
	}
	.main::-webkit-scrollbar-track {
		background-color: red;
	}
</style>
