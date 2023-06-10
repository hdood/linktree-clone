<template>
	<div>
		<video :src="data.url"></video>
	</div>
</template>

<script setup>
	const props = defineProps(["media"]);

	const data = JSON.parse(props.media.data);
</script>

<style scoped></style>
