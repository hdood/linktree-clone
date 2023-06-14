<template>
	<AdminLayout>
		<iframe
			:src="`/${userStore.$state.name}`"
			class="w-full h-full"
			ref="frame"
		></iframe>
	</AdminLayout>
</template>

<script setup>
	import AdminLayout from "~~/layouts/AdminLayout.vue";
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();
</script>
