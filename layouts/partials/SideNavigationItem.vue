<template>
	<div
		class="w-12 flex items-center item-wrapper duration-300 justify-center"
		:class="[
			active && ' border-indigo-500 fill-white',
			!active && 'fill-black/50 dark:text-slate-400',
		]"
	>
		<div
			class="p-2 w-full rounded-lg flex items-center gap-3"
			:class="[
				active
					? 'bg-gradient-to-r from-indigo-600 to-indigo-700  text-white font-medium  dark:bg-indigo-500/30'
					: '',
			]"
		>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	const props = defineProps<{
		active: String;
	}>();
	const active = computed(() => useRoute().name == props.active);
</script>

<style scoped></style>
