<template>
	<div
		v-if="userStore.theme"
		class="md:block lg:flex hidden lg:w-[500px] w-[310px] h-[40rem] border items-center justify-center"
	>
		<iframe
			:src="`http://localhost:3000/${userStore.$state.name}`"
			class="rounded-lg overflow-hidden fixed top-24 h-[40rem] scale-75"
			ref="frame"
		></iframe>
	</div>
</template>

<script setup>
	import { useUserStore } from "~~/stores/user";
	import useMakeCard from "~~/composabales/makeCard";
	const userStore = useUserStore();
	const frame = ref(null);

	onMounted(() => {
		if (frame) {
			userStore.$state.frame = frame.value;
		}
	});
</script>
