<template>
	<div
		@click="toggle"
		class="w-9 h-5 rounded-3xl flex items-center transition-all cursor-pointer relative"
		:class="[props.on && 'bg-purple-700', !props.on && 'bg-gray-300']"
	>
		<div
			class="rounded-full absolute w-4 h-4 top-1/2 -translate-y-1/2 transition-all duration-200 grid place-items-center"
			:class="[
				props.on && 'translate-x-full',
				!props.on && 'bg-purple-700 ml-1',
				props.on && 'bg-white',
			]"
		></div>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		on?: boolean;
	}>();

	const emits = defineEmits(["toggle"]);
	function toggle() {
		emits("toggle");
	}
</script>

<style scoped></style>
