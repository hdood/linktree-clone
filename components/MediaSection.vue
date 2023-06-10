<template>
	<MediaCombobox
		v-model="selectedMedia"
		class="mb-10"
	/>

	<component
		:is="mediaInputs?.[selectedMedia.input].component"
		:media="selectedMedia"
	/>

	<div class="mt-6">
		<div class="text-3xl mb-3">Images</div>

		<div class="grid grid-cols-2 justify-center w-full">
			<component
				v-for="media in imageMedia"
				:is="getMediaComponent(media.type)"
				:media="media"
			/>
		</div>
	</div>

	<div class="mt-6">
		<div class="text-3xl mb-3">Instagram</div>

		<div class="grid grid-cols-2 justify-center w-full">
			<component
				v-for="media in instagramMedia"
				:is="getMediaComponent(media.type)"
				:media="media"
			/>
		</div>
	</div>
	<div class="mt-6">
		<div class="text-3xl mb-3">Facebook</div>

		<div class="grid grid-cols-2 justify-center w-full">
			<component
				v-for="media in facebookMedia"
				:is="getMediaComponent(media.type)"
				:media="media"
			/>
		</div>
	</div>
	<div class="mt-6">
		<div class="text-3xl mb-3">Youtube</div>

		<div class="flex flex-col gap-6 w-full">
			<component
				v-for="media in youtubeMedia"
				:is="getMediaComponent(media.type)"
				:media="media"
			/>
		</div>
	</div>
</template>

<script setup>
	import Embedding from "./mediaInput/Embedding.vue";
	import mediaTypes from "~/data/media";
	import { useMediaStore } from "~/stores/media";
	import { useUserStore } from "~~/stores/user";
	import File from "~/components/mediaInput/File.vue";
	import { storeToRefs } from "pinia";

	const userStore = useUserStore();
	const mediaStore = useMediaStore();

	const { media: medias } = storeToRefs(mediaStore);

	const selectedMedia = ref(mediaTypes[0]);

	onMounted(async () => {
		await mediaStore.fetchMedia(userStore.$state.id);
		console.log(medias);
	});

	const imageMedia = computed(() =>
		medias?.value?.filter?.((media) => media.type == "image")
	);

	const instagramMedia = computed(() =>
		medias?.value?.filter?.((media) => media.type == "instagram")
	);
	const facebookMedia = computed(() =>
		medias?.value?.filter?.((media) => media.type == "facebook")
	);

	const youtubeMedia = computed(() =>
		medias?.value?.filter?.((media) => media.type == "youtube")
	);

	function getMediaComponent(_name) {
		const name = _name.charAt(0).toUpperCase() + _name.slice(1);

		try {
			const component = defineAsyncComponent(() =>
				import(`~/components/media/${name}.vue`)
			);
			return component;
		} catch (error) {
			return {
				template: `could not resolve ${name}.vue are you sure this component exists`,
			};
		}
	}

	const mediaInputs = {
		file: {
			name: "file",
			component: File,
		},
		embedding: {
			name: "embedding",
			component: Embedding,
		},
	};
</script>

<style scoped></style>
