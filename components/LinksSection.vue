<template>
	<div class="w-full">
		<div class="mx-auto pb-24 py-3">
			<div
				class="text-gray-500 flex justify-between px-3 w-full flex-wrap"
			>
				<div class="flex items-center gap-5 flex-wrap">
					<LinksCombobox
						v-model="link"
						placeholder="URL"
					/>
					<TextInput
						class="w-[20rem]"
						v-model:input="url"
						placeholder="URL"
					/>
				</div>
				<Button
					type="success"
					class="px-2 w-20 h-10"
					@click="addLink"
				>
					Add
				</Button>
			</div>
			<div class="mt-4 mx-2">Links:</div>
			<div v-for="link in userStore.allLinks">
				<LinkBox
					:link="link"
					class="mt-6"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();

	const selectedInput = ref({ id: 0, str: "" });

	const link = ref({ name: "Platform", icon: "" });
	const url = ref("");

	async function addLink() {
		try {
			const response = await userStore.addLink(
				link.value.name,
				url.value,
				link.value.icon
			);
			await userStore.getAllLinks();
		} catch (error) {
			console.log("error happened");
		}
	}

	const updatedInput = (e: any) => {
		selectedInput.value.id = e.id;
		selectedInput.value.str = e.str;
	};
</script>

<style scoped></style>
