<template>
	<Combobox
		v-model="selected"
		class="z-[9999]"
	>
		<div class="relative">
			<div
				class="relative rounded-xl w-32 cursor-default border border-indigo-600 overflow-hidden bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
			>
				<ComboboxInput
					class="w-full border-none h-full py-3 pl-3 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-0"
					:displayValue="
						(country) =>
							getFlagEmoji(getCountryByCode(country)?.code) +
							' ' +
							`+(${getCountryByCode(country)?.value})`
					"
					@change="query = $event.target.value"
				/>
				<ComboboxButton
					class="absolute inset-y-0 right-0 flex items-center pr-2"
				>
					<Icon name="bxs:down-arrow" />
				</ComboboxButton>
			</div>
			<transition
				enter-active-class="transition duration-100 ease-out"
				enter-from-class="transform scale-95 opacity-0"
				enter-to-class="transform scale-100 opacity-100"
				leave-active-class="transition duration-75 ease-out"
				leave-from-class="transform scale-100 opacity-100"
				leave-to-class="transform scale-95 opacity-0"
			>
				<ComboboxOptions
					class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				>
					<div
						v-if="filteredCountries.length === 0 && query !== ''"
						class="relative cursor-default select-none py-2 px-4 text-gray-700"
					>
						Nothing found.
					</div>

					<ComboboxOption
						v-for="country in filteredCountries"
						as="template"
						:key="country.name"
						:value="country.value"
						v-slot="{ selected, active }"
					>
						<li
							class="relative select-none py-2 px-2 cursor-pointer"
							:class="{
								'bg-teal-600 text-white': active,
								'text-gray-900': !active,
							}"
						>
							<span
								class="block truncate"
								:class="{
									'font-medium': selected,
									'font-normal': !selected,
								}"
							>
								{{
									getFlagEmoji(country.code) +
									" " +
									country.name
								}}
							</span>
							<span
								v-if="selected"
								class="absolute inset-y-0 left-0 flex items-center pl-3"
								:class="{
									'text-white': active,
									'text-teal-600': !active,
								}"
							>
								<!-- <CheckIcon
										class="h-5 w-5"
										aria-hidden="true"
									/> -->
							</span>
						</li>
					</ComboboxOption>
				</ComboboxOptions>
			</transition>
		</div>
	</Combobox>
</template>

<script setup>
	import { ref, computed, watch } from "vue";
	import countries from "./countries";

	import {
		Combobox,
		ComboboxInput,
		ComboboxButton,
		ComboboxOptions,
		ComboboxOption,
	} from "@headlessui/vue";

	const props = defineProps(["modelValue"]);
	const selected = ref(props.modelValue);
	const query = ref("");
	const emits = defineEmits(["update:modelValue"]);
	watch(selected, (value) => {
		emits("update:modelValue", value);
	});

	function getCountryByCode(code) {
		return countries.find((country) => country.value == code);
	}

	function getFlagEmoji(countryCode) {
		if (!countryCode) return "none";
		const codePoints = countryCode
			.toUpperCase()
			.split("")
			.map((char) => 127397 + char.charCodeAt());
		return String.fromCodePoint(...codePoints);
	}

	let filteredCountries = computed(() =>
		query.value === ""
			? countries
			: countries.filter((country) =>
					country.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.value.toLowerCase().replace(/\s+/g, ""))
			  )
	);
</script>
