<template>
	<div class="w-full rounded-3xl px-2 flex flex-col">
		<div class="flex items-center gap-3 justify-between">
			<div class="space-x-4">
				<icon
					size="40"
					:name="link.icon"
				/>
				<span>
					{{ link.url }}
				</span>
			</div>

			<Button
				type="danger"
				class="px-2 h-10 justify-self-end"
				@click="showDeleteModal = true"
			>
				<div class="flex gap-2 items-center">
					<icon
						size="25"
						name="ic:round-delete"
					/>
				</div>
			</Button>
		</div>

		<ConfirmModal
			:show="showDeleteModal"
			title="Delete Link"
			body="Are you sure you want to delete this link"
			type="danger"
			positive="Delete"
			@close="showDeleteModal = false"
			@confirm="deleteLink"
		/>
	</div>
</template>

<script setup>
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();

	const showDeleteModal = ref(false);

	const props = defineProps({
		link: Object,
	});
	const { link } = toRefs(props);

	const emit = defineEmits(["updatedInput"]);

	async function deleteLink() {
		try {
			await userStore.deleteLink(link.value.id);
			await userStore.getAllLinks();
		} catch (error) {
			console.log(error);
		}
	}
</script>
