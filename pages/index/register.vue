<template>
	<Head>
		<title>Register</title>
	</Head>

	<div class="grid place-items-center h-screen p-3 bg-gray-50">
		<div>
			<Logo class="w-20 h-20" />
		</div>
		<div class="bg-white flex rounded-xl shadow-md overflow-hidden">
			<div class="hidden md:block lg:block border">
				<img
					src="~/assets/register-side.png"
					class="lg:max-w-[39rem] md:max-w-[30rem]"
					alt=""
				/>
			</div>
			<div
				class="flex flex-col items-center justify-center w-full gap-6 py-3 px-7 lg:min-w-fit lg:w-[30rem]"
			>
				<div class="space-y-3">
					<div
						class="text-2xl font-medium text-center text-indigo-600"
					>
						Register
					</div>
				</div>
				<div class="space-y-4">
					<TextInput
						v-model:input="name"
						placeholder="Name eg: Jhon_Doe"
						:error="errors.name?.[0]"
					/>
					<TextInput
						v-model:input="email"
						placeholder="Email eg: test@test.com"
						:error="errors?.email?.[0]"
					/>
					<TextInput
						v-model:input="password"
						placeholder="Password"
						inputType="password"
						:error="errors.password"
					/>
					<TextInput
						v-model:input="confirmPassword"
						placeholder="Confirm Password"
						inputType="password"
						:error="errors?.confirmPassword"
					/>
					<div class="flex self-start">
						<div
							class="flex items-center font-normal gap-2 justify-self-start text-sm"
						>
							<input
								type="checkbox"
								name=""
								id=""
							/>
							Keep me signed in
						</div>
					</div>
				</div>

				<Button
					:type="valid ? 'primary' : 'disabled'"
					:loading="loading"
					class="block w-60 h-10"
					@click="register"
				>
					Sign Up
				</Button>

				<div class="text-sm">
					<RouterLink
						to="/login"
						class="underline text-indigo-600"
						>Login</RouterLink
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();

	const router = useRouter();

	definePageMeta({ middleware: "is-logged-in" });
	const name = ref("");
	const email = ref("");
	const password = ref("");
	const confirmPassword = ref("");
	const errors = ref({});
	const loading = ref(false);

	const valid = computed(() => {
		errors.value = {};

		if (
			name.value == "" ||
			email.value == "" ||
			password.value == "" ||
			confirmPassword.value == "" ||
			password.value !== confirmPassword.value
		) {
			return false;
		}

		return true;
	});

	const register = async () => {
		errors.value = {};
		loading.value = true;

		if (name.value.trim().includes(" ")) {
			errors.value = {
				name: ["Name must only contain letters and underscores"],
			};

			loading.value = false;

			return false;
		}

		if (password.value !== confirmPassword.value) {
			errors.value.confirmPassword =
				"password confirmation does not match the password";
			loading.value = false;

			return false;
		}

		try {
			await userStore.register(
				name.value,
				email.value,
				password.value,
				confirmPassword.value
			);
			await userStore.getUser();
			router.push("/admin");
		} catch (error) {
			console.log(error);
			errors.value = error.response.data.errors;
		}
		loading.value = false;
	};
</script>