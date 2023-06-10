<template>
	<MultiStepForm class="p-4 flex flex-col rounded-lg min-w-[20rem]">
		<Header class="flex gap-5 justify-around">
			<HeaderItem
				class="flex items-center"
				v-slot="{ active, passed }"
			>
				<div>
					<div class="text-xs">Personal</div>
					<div
						class="w-12 h-12 grid place-items-center rounded-lg transition-colors bg-indigo-400"
						:class="[
							active | passed && [
								'text-white bg-gradient-to-r  from-indigo-500 to-indigo-600  transition-all delay-100',
							],
						]"
					>
						<icon
							name="mdi:user"
							size="30"
						/>
					</div>
				</div>
			</HeaderItem>

			<HeaderItem
				v-slot="{ active, passed }"
				class="flex items-center"
			>
				<div>
					<div class="text-xs text-center">Contact</div>
					<div
						class="w-12 h-12 grid place-items-center rounded-lg"
						:class="[
							active | passed
								? 'bg-gradient-to-r  from-indigo-500 to-indigo-600 text-white transition-all delay-100'
								: 'bg-gray-200',
						]"
					>
						<icon
							name="fluent:contact-card-16-filled"
							size="30"
						/>
					</div>
				</div>
			</HeaderItem>

			<HeaderItem
				v-slot="{ active, passed }"
				class="flex items-center"
			>
				<div>
					<div class="text-xs text-center">Security</div>
					<div
						class="w-12 h-12 grid place-items-center rounded-lg"
						:class="[
							active | passed
								? 'bg-gradient-to-r  from-indigo-500 to-indigo-600 text-white transition-all delay-100'
								: 'bg-gray-200',
						]"
					>
						<icon
							name="material-symbols:key"
							size="30"
						/>
					</div>
				</div>
			</HeaderItem>
		</Header>
		<Steps class="h-40 w-full relative mt-10">
			<transition
				enterActiveClass="transition-all absolute duration-300 delay-300"
				leaveActiveClass="transition-all absolute"
				leaveToClass="translate-y-4 opacity-0"
				enterFromClass="translate-y-4 opacity-0"
			>
				<Step
					class="w-full"
					:validation="validateFirstStep"
				>
					<form class="flex flex-col gap-5">
						<TextInput
							v-model:input="name"
							placeholder="Name eg: Jhon_Doe"
							:error="errors.name"
						/>
						<TextInput
							v-model:input="email"
							placeholder="Email eg: test@test.com"
							:error="errors.email"
						/>
					</form>
				</Step>
			</transition>

			<transition
				enterActiveClass="transition-all absolute duration-300 delay-300"
				leaveActiveClass="transition-all absolute"
				leaveToClass="translate-y-4 opacity-0"
				enterFromClass="translate-y-4 opacity-0"
			>
				<Step
					class="w-full"
					:validation="validateSecondStep"
				>
					<form class="flex flex-col gap-5">
						<div>
							<TextInput
								v-model:input="phone"
								placeholder="Phone eg: +213 696459323"
							/>
							<div class="text-xs opacity-60">(optional)</div>
						</div>
						<div>
							<TextInput
								v-model:input="address"
								placeholder="Address eg: some place 19000"
							/>
							<div class="text-xs opacity-60">(optional)</div>
						</div>
					</form>
				</Step>
			</transition>

			<transition
				enterActiveClass="transition-all absolute duration-300 delay-300"
				leaveActiveClass="transition-all absolute"
				leaveToClass="translate-y-4 opacity-0"
				enterFromClass="translate-y-4 opacity-0"
			>
				<Step
					class="w-full"
					:validation="validateThirdStep"
					:submit="register"
				>
					<form class="flex flex-col gap-5">
						<TextInput
							v-model:input="password"
							placeholder="Password"
							:error="errors.password"
							inputType="password"
						/>
						<TextInput
							v-model:input="confirmPassword"
							placeholder="Confirm Password"
							:error="errors.confirmPassword"
							inputType="password"
						/>
					</form>
				</Step>
			</transition>
		</Steps>
		<Footer
			class=""
			v-slot="{ nextStep, previousStep, end, start, valid }"
		>
			<div class="flex gap-6 justify-end">
				<button
					@click="previousStep"
					v-if="!start"
					class="dark:text-white"
				>
					Previous
				</button>
				<Button
					class="w-20 h-10"
					:type="
						!valid.value ? 'disabled' : end ? 'success' : 'primary'
					"
					@click="nextStep"
				>
					{{ end ? "Submit" : "Next" }}
				</Button>
			</div>
		</Footer>
	</MultiStepForm>
</template>

<script setup lang="ts">
	import {
		MultiStepForm,
		Header,
		HeaderItem,
		Steps,
		Step,
		Footer,
	} from "@/headless/main";
	import Button from "./Button.vue";
	import TextInput from "./TextInput.vue";
	import axios from "~~/plugins/axios";
	import { useUserStore } from "~~/stores/user";
	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;

	const userStore = useUserStore();

	const router = useRouter();

	definePageMeta({ middleware: "is-logged-in" });

	const name = ref("");
	const email = ref("");
	const password = ref("");
	const confirmPassword = ref("");
	const errors = ref<{ email: string; name: string }>({
		email: "",
		name: "",
	});
	const address = ref("");
	const phone = ref("");

	function validateEmail(email: string): boolean {
		var validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (email.trim().match(validRegex)) return true;
		return false;
	}

	function validateFirstStep() {
		errors.value = { email: "", name: "" };

		if (name.value == "") {
			errors.value.name = "the name field is required";
			return false;
		}
		if (email.value == "") {
			errors.value.email = "the email field is required";
			return false;
		}

		if (name.value.includes(" ")) {
			errors.value.name = "username must contain only letters and _";
			return false;
		}
		if (!checkName()) {
			errors.value.name = "username is taken please choose another one";
			return false;
		}
		if (!validateEmail(email.value)) {
			errors.value.email = "this field must be a valid email";
			return false;
		}
		return true;
	}

	const checkName = useDebounce(async () => {
		const response = await $axios.get(
			`/api/users/check-name/${name.value.trim()}`
		);

		if (response.data == "true") {
			return true;
		}
		return false;
	});
	function validateSecondStep() {
		return true;
	}

	function validateThirdStep() {
		return true;
	}

	function validateLastStep() {
		return true;
	}
</script>

<style lang="scss" scoped></style>
