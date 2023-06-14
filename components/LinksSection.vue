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
						:error="errors?.url?.[0]"
					/>
				</div>
				<Button
					type="success"
					class="px-2 w-20 h-10"
					@click="addLink"
					:loading="loading"
				>
					Add
				</Button>
			</div>
			<div class="mt-4 mx-2">Links:</div>

			<draggable
				v-model="linksStore.all"
				:component-data="{ name: 'fade' }"
				:item-key="'nothing'"
				ghost-class="brightness-50"
				@end="onEnd"
			>
				<template #item="{ element }">
					<LinkBox
						:link="element"
						class="mt-3"
					/>
				</template>
			</draggable>
		</div>
	</div>
</template>

<script setup>
	import { useLinksStore } from "~/stores/links";
	import { useUserStore } from "~/stores/user";
	import draggable from "vuedraggable";
	const linksStore = useLinksStore();
	const userStore = useUserStore();

	const link = ref({ name: "Platform", icon: "" });
	const url = ref("");
	const loading = ref(false);
	const errors = ref({});

	async function onEnd(evt) {
		console.log("dropped");
		await linksStore.reorder();
	}

	async function addLink() {
		errors.value = {};
		if (url.value == "") {
			errors.value = { url: ["please specify a url for this link"] };
			return;
		}

		loading.value = true;

		try {
			const response = await linksStore.addLink(
				link.value.name,
				url.value,
				link.value.icon,
				linksStore.all.length
			);

			await linksStore.getAllLinks();

			url.value = "";
			userStore.refreshFrame();
		} catch (error) {
			errors.value = error.response.data.errors;
		}
		loading.value = false;
	}

	onMounted(() => {
		linksStore.getAllLinks();
	});
</script>

<style scoped></style>
