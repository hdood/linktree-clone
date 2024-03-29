<template>
	<TransitionRoot
		appear
		:show="props.show"
		as="template"
	>
		<Dialog
			as="div"
			@close="close"
			class="relative z-10"
		>
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div
					class="flex min-h-full items-center justify-center p-4 text-center"
				>
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 translate-y-4"
						leave="duration-300 ease-in"
						leave-to="opacity-0 translate-y-4"
					>
						<DialogPanel
							class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
						>
							<DialogTitle
								as="h3"
								class="text-lg font-medium leading-6 text-gray-900"
							>
								{{ title }}
							</DialogTitle>
							<div class="mt-2">
								<p class="text-sm text-gray-500">
									{{ body }}
								</p>
							</div>

							<div class="mt-6 flex justify-end w-full space-x-5">
								<button
									type="button"
									@click="close"
								>
									{{ props.negative || "cancel" }}
								</button>
								<Button
									:type="props.type || 'primary'"
									class="px-2 h-10 text-center"
									@click="confirm"
								>
									{{ props.positive || "confirm" }}
								</Button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup lang="ts">
	import {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogPanel,
		DialogTitle,
	} from "@headlessui/vue";

	const props = defineProps<{
		show: boolean;
		title: string;
		body: string;
		positive?: string;
		negative?: string;
		type?: string;
	}>();

	const emits = defineEmits(["confirm", "close"]);

	function close() {
		emits("close");
	}

	function confirm() {
		emits("confirm");
		emits("close");
	}
</script>
