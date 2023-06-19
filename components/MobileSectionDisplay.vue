<template>
	<div
		class="md:block lg:flex hidden lg:w-[500px] w-[310px] h-[40rem] items-center justify-center"
	>
		<!-- :src="`http://localhost:3000/${userStore.$state.name}`" -->
		<iframe
			:src="`/${user.name}`"
			class="rounded-lg overflow-hidden fixed top-14 h-[40rem] scale-75"
			ref="frame"
		></iframe>
	</div>
</template>

<script setup>
	import { storeToRefs } from "pinia";
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();

	const { user } = storeToRefs(userStore);
	const frame = ref(null);

	onMounted(() => {
		if (frame) {
			userStore.$state.frame = frame.value;
		}
	});
</script>
