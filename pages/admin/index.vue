<template>
	<Head>
		<title>Appearance</title>
	</Head>

	<div class="flex h-full min-h-[30rem]">
		<div class="p-3 lg:basis-3/4 bg-gray-50 md:basis-2/4 basis-full">
			<ProfileTop />
			<ProfileTabs />
		</div>
		<MobileSectionDisplay />
	</div>
</template>

<script setup>
	import { useUserStore } from "~/stores/user";
	definePageMeta({ middleware: "is-logged-out" });
	const userStore = useUserStore();

	onMounted(async () => {
		await userStore.getUser();
	});
</script>
