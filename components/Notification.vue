<template>
	<div :class="wrapper({ type: props.type })">
		<div :class="iconClass({ type: props.type })">
			<icon
				:name="props.icon"
				size="30"
			/>
		</div>
		<div>
			<div class="text-sm">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { cva, type VariantProps } from "class-variance-authority";

	const wrapper = cva(
		["min-w-fit h-7 rounded-lg shadow flex py-6 px-2 items-center gap-4"],
		{
			variants: {
				type: {
					success: ["text-emerald-700", " bg-emerald-200 "],
					danger: ["bg-white", "text-red-700"],
				},
			},
			defaultVariants: {
				type: "success",
			},
		}
	);

	const iconClass = cva([""], {
		variants: {
			type: {
				success: ["text-green-700"],
				danger: ["text-red-700"],
			},
		},
	});

	type Props = Required<VariantProps<typeof wrapper>>;

	const props = defineProps<{
		type: Props["type"];
		title: string;
		icon: string;
	}>();
</script>

<style scoped></style>
