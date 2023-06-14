<template>
	<div class="flex flex-col-reverse gap-2 bg-white p-1 rounded-lg w-full">
		<div>
			<Button
				type="danger"
				class="p-2 justify-self-end"
				@click="showDeleteModal = true"
			>
				<div class="flex gap-2 items-center">
					<icon name="ic:round-delete" />
				</div>
			</Button>
		</div>

		<div>
			<slot />
		</div>
	</div>

	<ConfirmModal
		:show="showDeleteModal"
		title="Delete Media"
		body="Are you sure you want to delete this media"
		type="danger"
		positive="Delete"
		@close="showDeleteModal = false"
		@confirm="deleteMedia"
	/>
</template>

<script setup>
	const props = defineProps(["media"]);
	const showDeleteModal = ref(false);
	const emit = defineEmits(["delete"]);

	function deleteMedia() {
		emit("delete");
	}
</script>

<style scoped></style>
