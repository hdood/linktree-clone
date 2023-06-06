<template>
	<div
		@click="toggle"
		class="w-9 h-5 rounded-md flex items-center transition-all cursor-pointer relative"
		:class="[
			props.on && 'bg-gradient-to-r from-indigo-500 to-indigo-700',
			!props.on && 'bg-gray-300',
		]"
	>
		<div
			class="rounded absolute w-4 h-4 top-1/2 -translate-y-1/2 transition-all duration-200 grid place-items-center"
			:class="[
				props.on && 'translate-x-full',
				!props.on && 'bg-indigo-600 ml-1',
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
