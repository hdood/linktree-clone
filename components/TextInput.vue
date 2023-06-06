<template>
	<div class="flex flex-col gap-1">
		<input
			:id="placeholder"
			:placeholder="placeholder"
			:maxlength="String(max)"
			class="rounded-lg min-w-max px-4 py-2 border border-indigo-200 focus:outline-none focus:border-indigo-600 focus:border-2 focus:bg-slate-200 bg-gray-50 dark:bg-slate-700 dark:border-none dark:text-white"
			@focus="isFocused = true"
			@blur="isFocused = false"
			:class="[
				isFocused && 'border-gray-900',
				props.rounded && 'rounded-xl',
				props.inputStyle,
			]"
			:type="inputType"
			v-model="inputComputed"
			autocomplete="off"
		/>
		<span
			v-if="error"
			class="text-red-500 text-sm italic"
		>
			{{ error }}
		</span>
	</div>
</template>

<script setup>
	const emit = defineEmits(["update:input"]);
	const props = defineProps([
		"input",
		"placeholder",
		"max",
		"inputType",
		"error",
		"rounded",
		"inputStyle",
	]);
	const { input, placeholder, max, inputType, error } = toRefs(props);

	let isFocused = ref(false);

	const inputComputed = computed({
		get: () => input.value,
		set: (val) => emit("update:input", val),
	});
</script>
