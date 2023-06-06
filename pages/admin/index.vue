<template>
	<Head>
		<title>Appearance</title>
	</Head>

	<div class="flex h-full">
		<div
			class="p-3 bg-white lg:basis-3/4 md:basis-2/4 basis-full min-h-fit"
		>
			<ProfileTop />
			<ProfileTabs />
		</div>
		<MobileSectionDisplay />
	</div>
</template>

<script setup>
	definePageMeta({ middleware: "is-logged-out" });
</script>
