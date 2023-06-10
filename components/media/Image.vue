<template>
	<div class="flex flex-col gap-2">
		<div class="text-xl font-medium">
			{{ data.title }}
		</div>

		<img
			:src="data.url"
			alt=""
		/>
	</div>
</template>

<script setup>
	const props = defineProps(["media"]);

	const data = JSON.parse(props.media.data);
</script>

<style scoped></style>
