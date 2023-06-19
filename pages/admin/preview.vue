<template>
	<iframe
		:src="`/${user.name}`"
		class="w-full min-h-screen"
		ref="frame"
	></iframe>
</template>

<script setup>
	import { storeToRefs } from "pinia";
	import AdminLayout from "~~/layouts/AdminLayout.vue";
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();
	const { user } = storeToRefs(userStore);
</script>
