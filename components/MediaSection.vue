<template>
	<div class="flex items-center gap-3 flex-wrap mb-5">
		<span> Choose media type </span>
		<MediaCombobox v-model="selectedMedia" />
	</div>

	<component
		:is="mediaInputs?.[selectedMedia.input].component"
		:media="selectedMedia"
	/>

	<div
		class="mt-6 w-full"
		v-if="imageMedia"
	>
		<div class="text-3xl mb-3">Images</div>

		<div class="flex flex-col items-center w-full gap-5">
			<component
				v-for="media in imageMedia"
				:is="getMediaComponent(media.type)"
				:media="media"
			/>
		</div>
	</div>
	<div
		class="mt-6 w-full"
		v-if="videoMedia"
	>
		<div class="text-3xl mb-3">Videos</div>

		<div class="flex flex-col items-center w-full gap-5">
			<component
				v-for="media in videoMedia"
				:is="getMediaComponent(media.type)"
				:media="media"
			/>
		</div>
	</div>
	<div
		class="mt-6 w-full"
		v-if="pdfMedia"
	>
		<div class="text-3xl mb-3">PDFs</div>

		<div class="grid grid-cols-2 items-center gap-3 justify-center w-full">
			<component
				v-for="media in pdfMedia"
				:is="getMediaComponent(media.type)"
				:media="media"
			/>
		</div>
	</div>

	<div
		class="mt-6 w-full"
		v-if="instagramMedia"
	>
		<div class="text-3xl mb-3">Instagram</div>

		<div class="flex flex-col items-center w-full gap-5">
			<component
				v-for="media in instagramMedia"
				:is="getMediaComponent(media.type)"
				:media="media"
			/>
		</div>
	</div>
	<div
		class="mt-6 w-full"
		v-if="facebookMedia"
	>
		<div class="text-3xl mb-3">Facebook</div>

		<div class="flex flex-col items-center w-full gap-5">
			<component
				v-for="media in facebookMedia"
				:is="getMediaComponent(media.type)"
				:media="media"
			/>
		</div>
	</div>
	<div
		class="mt-6 w-full"
		v-if="youtubeMedia"
	>
		<div class="text-3xl mb-3">Youtube</div>

		<div class="flex flex-col justify-center gap-6 w-full">
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

	const { user } = storeToRefs(userStore);

	const { media: medias } = storeToRefs(mediaStore);

	const selectedMedia = ref(mediaTypes[0]);

	onMounted(async () => {
		await mediaStore.fetchMedia(user.value.id);
	});

	const imageMedia = computed(() =>
		medias?.value?.filter?.((media) => media.type == "image")?.length == 0
			? false
			: medias?.value?.filter?.((media) => media.type == "image")
	);

	const instagramMedia = computed(() =>
		medias?.value?.filter?.((media) => media.type == "instagram")?.length ==
		0
			? false
			: medias?.value?.filter?.((media) => media.type == "instagram")
	);

	const facebookMedia = computed(() =>
		medias?.value?.filter?.((media) => media.type == "facebook")?.length ==
		0
			? false
			: medias?.value?.filter?.((media) => media.type == "facebook")
	);

	const youtubeMedia = computed(() =>
		medias?.value?.filter?.((media) => media.type == "youtube")?.length == 0
			? false
			: medias?.value?.filter?.((media) => media.type == "youtube")
	);
	const pdfMedia = computed(() =>
		medias?.value?.filter?.((media) => media.type == "pdf")?.length == 0
			? false
			: medias?.value?.filter?.((media) => media.type == "pdf")
	);
	const videoMedia = computed(() =>
		medias?.value?.filter?.((media) => media.type == "video")?.length == 0
			? false
			: medias?.value?.filter?.((media) => media.type == "video")
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
