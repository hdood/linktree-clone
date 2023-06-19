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
		class="text-2xl opacity-75 font-medium mt-5"
		v-if="medias.length != 0"
	>
		Your media
	</div>

	<draggable
		v-model="mediaStore.media"
		:item-key="'nothing'"
		handle=".handle"
		ghost-class="brightness-50"
		tag="div"
		:component-data="{ class: 'flex flex-col w-full gap-5 mt-10' }"
		@end="onEnd"
	>
		<template #item="{ element }">
			<component
				:is="getComponent(element.type)"
				:media="element"
			/>
		</template>
	</draggable>
</template>

<script setup>
	import draggable from "vuedraggable";

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

	async function onEnd() {
		await mediaStore.reorder();
	}

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

	const getComponent = (type) =>
		mediaTypes.find((media) => media.type == type).component;

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
