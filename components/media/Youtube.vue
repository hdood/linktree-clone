<template>
	<iframe
		class="w-full"
		height="315"
		:src="`https://www.youtube.com/embed/${extractYouTubeVideoId}`"
	>
	</iframe>
</template>

<script setup>
	const props = defineProps(["media"]);
	const data = JSON.parse(props.media.data);

	const extractYouTubeVideoId = computed(() => {
		const regExp = /v=(.*)/;
		const match = data.url.match(regExp);
		if (match && match[1]) {
			return match[1];
		} else {
			return null;
		}
	});
</script>

<style scoped></style>
