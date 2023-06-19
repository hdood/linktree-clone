<template>
	<div
		class="flex flex-col gap-3 focus-within:-translate-y-1 transition-all w-64 lg:w-96"
	>
		<label
			:for="props.label"
			class="text-sm font-medium flex gap-2 items-center w-full"
		>
			<span
				v-if="props.label"
				class="min-w-fit block"
				>{{ props.label }}:</span
			>
			<input
				:id="placeholder"
				:placeholder="placeholder"
				:maxlength="String(max)"
				class="rounded-lg w-full px-4 py-2 border border-indigo-200 focus:outline-none focus:border-indigo-600 focus:border-2 focus:bg-gray-100 dark:bg-slate-700 dark:border-none dark:text-white"
				@focus="isFocused = true"
				@blur="isFocused = false"
				:class="[
					isFocused && 'border-gray-900',
					props.rounded && 'rounded-xl',
					props.inputStyle,
					props.error && 'border-red-600 focus:border-red-600 ',
				]"
				:type="inputType"
				v-model="inputComputed"
				autocomplete="off"
			/>
		</label>

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
		"label",
	]);
	const { input, placeholder, max, inputType, error } = toRefs(props);

	let isFocused = ref(false);

	const inputComputed = computed({
		get: () => input.value,
		set: (val) => emit("update:input", val),
	});
</script>
