import Instagram from "~/components/media/Instagram.vue";

export default [
	{
		name: "pdf",
		icon: "bi:file-pdf-fill",
		input: "file",
		uiComponent: Instagram,
	},
	{
		name: "image",
		icon: "material-symbols:image",
		input: "file",
		uiComponent: Instagram,
	},
	{
		name: "video",
		icon: "mdi:video",
		input: "file",
		uiComponent: Instagram,
	},
	{
		name: "instagram",
		icon: "skill-icons:instagram",
		input: "embedding",
	},
	{
		name: "facebook",
		icon: "logos:facebook",
		input: "embedding",
	},
	{
		name: "youtube",
		icon: "logos:youtube-icon",
		input: "embedding",
	},
];
