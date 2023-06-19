<template>
	<div class="w-full">
		<div class="mx-auto pb-24 py-3">
			<Button
				type="primary"
				class="px-2 h-10 w-full flex justify-center items-center"
				@click="showLinksModal = true"
			>
				<div class="flex items-center">
					<span>Add Link</span>
					<icon
						size="25"
						name="material-symbols:add"
					/>
				</div>
			</Button>

			<div
				class="mt-4 mx-2 text-xl font-medium"
				v-if="linksStore.all.length != 0"
			>
				Links:
			</div>
			<div
				v-else
				class="mt-8 mx-2 text-xl font-medium w-full text-center"
			>
				You don't have any links
			</div>

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

		<LinksModal
			:show="showLinksModal"
			@close="showLinksModal = false"
		/>
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

	const showLinksModal = ref(false);

	async function onEnd(evt) {
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
