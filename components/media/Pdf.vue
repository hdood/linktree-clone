<template>
	<Media @delete="mediaStore.deleteFileMedia(props.media.id)">
		<a
			:href="data?.url"
			target="_blank"
			class="flex items-center gap-4"
		>
			<icon
				name="bi:file-pdf-fill"
				color="red"
				size="30"
			/>
			<span>
				{{ data?.title }}
			</span>
		</a>
	</Media>
</template>

<script setup>
	import { useMediaStore } from "~/stores/media";
	const mediaStore = useMediaStore();

	const props = defineProps(["media"]);

	const data = JSON.parse(props.media.data);
</script>
