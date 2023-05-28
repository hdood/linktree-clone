<template>
	<TransitionRoot
		appear
		:show="props.show"
		as="template"
	>
		<Dialog
			as="div"
			@close="emits('close')"
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
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel
							class="w-52 h-52 flex justify-center items-center max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all"
						>
							<canvas :ref="mountQR"></canvas>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
	import {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogPanel,
		DialogTitle,
	} from "@headlessui/vue";
	import { useUserStore } from "~~/stores/user";
	import QRCode from "qrcode";
	const userStore = useUserStore();

	const props = defineProps(["show"]);
	const emits = defineEmits(["close"]);

	function mountQR(el) {
		if (!el) return;
		QRCode.toCanvas(
			el,
			`http://localhost:3000/${userStore.$state.name}`,
			function (error) {
				if (error) console.error(error);
				console.log("success!");
			}
		);
	}
</script>
