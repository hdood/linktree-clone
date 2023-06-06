<template>
	<div class="w-full">
		<div class="mx-auto pb-24">
			<Button
				v-if="userStore.isMobile || !showAddLink"
				type="primary"
				class="block w-full h-10"
				@click="showAddLinkFunc()"
			>
				<Icon
					name="mdi:plus"
					class="mr-0.5 hidden lg:inline md:inline"
					size="25"
				/>
				<span>Add link</span>
			</Button>

			<AddLink
				v-if="!userStore.isMobile"
				@close="showAddLink = false"
				:class="[
					{
						'mt-20 md:mt-8 mb-12 max-h-[1000px] transition-all duration-300 ease-in':
							showAddLink,
					},
					{
						'max-h-0 transition-all duration-300 ease-out':
							!showAddLink,
					},
				]"
			/>

			<div
				v-for="link in userStore.allLinks"
				class="mt-4"
			>
				<LinkBox
					v-if="link"
					:link="link"
					:selectedId="selectedInput.id"
					:selectedStr="selectedInput.str"
					@updatedInput="updatedInput"
					class="mt-6"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();

	definePageMeta({ middleware: "is-logged-out" });

	const selectedInput = ref({ id: 0, str: "" });
	const showAddLink = ref(false);

	const updatedInput = (e: any) => {
		selectedInput.value.id = e.id;
		selectedInput.value.str = e.str;
	};

	const showAddLinkFunc = () => {
		if (userStore.isMobile) {
			userStore.addLinkOverlay = true;
		} else {
			showAddLink.value = true;
		}
	};
</script>

<style scoped></style>
