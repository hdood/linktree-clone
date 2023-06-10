<template>
	<div
		@click="toggle"
		class="h-6 px-1 rounded-md flex items-center transition-all cursor-pointer relative"
		:class="[
			props.on &&
				'bg-gradient-to-r from-indigo-500 to-indigo-700 justify-end transition-all',
			!props.on && 'bg-gray-300',
		]"
	>
		<div
			class="rounded absolute w-4 h-4 top-1/2 -translate-y-1/2 transition-all duration-200 grid place-items-center"
			:class="[
				props.on && '',
				!props.on && 'bg-indigo-600 ',
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
