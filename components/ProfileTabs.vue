<template>
	<TabGroup
		as="div"
		class="flex flex-col min-h-[30rem] items-center"
	>
		<TabList
			as="div"
			class="gap-3 lg:gap-5 lg:mt-3 md:mt-3 max-w-fit flex justify-center rounded-xl bg-gray-300 p-1 flex-wrap self-center"
		>
			<Tab
				as="div"
				:key="tab.id"
				v-for="tab in tabs"
				class="focus:outline-none"
				v-slot="{ selected }"
			>
				<button
					:class="[
						'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ',
						selected
							? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white  shadow'
							: 'text-indigo-500 bg-white',
					]"
					class="rounded-lg px-2 w-20 text-sm lg:text-base lg:w-32 flex items-center justify-center gap-2 py-2.5 font-medium leading-5 cursor-pointer"
				>
					<span class="hidden lg:block">
						<icon
							:name="tab.icon"
							size="25"
							class="hidden lg:block md:block"
						/>
					</span>
					<span>{{ tab.name }}</span>
				</button>
			</Tab>
		</TabList>

		<TabPanels class="mt-2 min-h-[100%] basis-full lg:w-[45rem] p-2">
			<transition
				v-for="tab in tabs"
				:key="tab.id"
				enter-active-class="transition-all duration-300"
				enter-from-class="opacity-0 "
				leave-active-class="transition-all duration-300 "
				leave-to-class="opacity-0  "
				mode="out-in"
			>
				<TabPanel :class="['rounded-xl  basis-full', 'ring-white']">
					<component :is="tab.component" />
				</TabPanel>
			</transition>
		</TabPanels>
	</TabGroup>
</template>

<script setup>
	import {
		TabGroup,
		TabList,
		Tab,
		TabPanels,
		TabPanel,
	} from "@headlessui/vue";

	import BioSection from "./BioSection.vue";
	import ContactSectionVue from "./ContactSection.vue";
	import ThemesSection from "./ThemesSection.vue";
	import LinksSection from "./LinksSection.vue";
	import MediaSection from "./MediaSection.vue";

	const tabs = [
		{
			id: 1,
			name: "Bio",
			icon: "mdi:user",
			component: BioSection,
		},
		{
			id: 2,
			name: "Contact",
			icon: "teenyicons:contact-solid",
			component: ContactSectionVue,
		},
		{
			id: 3,
			name: "Links",
			icon: "tabler:link",
			component: LinksSection,
		},
		{
			id: 5,
			name: "Media",
			icon: "material-symbols:media-link",
			component: MediaSection,
		},
		{
			id: 4,
			name: "themes",
			icon: "material-symbols:draw",
			component: ThemesSection,
		},
	];
</script>
