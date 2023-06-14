<template>
	<Head>
		<title>Login</title>
	</Head>

	<div class="grid place-items-center h-screen p-3 bg-gray-50">
		<div>
			<Logo class="w-20 h-20" />
		</div>
		<div class="bg-white flex rounded-xl shadow-md overflow-hidden">
			<div class="hidden md:block lg:block border">
				<img
					src="~/assets/login-side.png"
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
						Login
					</div>
					<div class="text-xs opacity-50 text-center w-72 leading-5">
						Welcome back! We're delighted to have you here. Feel
						free to explore and personalize your card to make it
						truly special.
					</div>
				</div>
				<div class="space-y-4">
					<TextInput
						v-model:input="email"
						placeholder="Email eg: test@test.com"
					/>
					<TextInput
						v-model:input="password"
						placeholder="Password"
						inputType="password"
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
					@click="login"
					>Log in</Button
				>

				<div class="text-sm">
					<RouterLink
						to="/register"
						class="underline text-indigo-600"
						>Create account</RouterLink
					>
				</div>

				<div
					id="buttonEL"
					ref="buttonEl"
				></div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { googleProvider } from "~/services/googleProvider";
	import { useUserStore } from "~~/stores/user";
	import { useSocialStore } from "~~/stores/social";
	import { useAuthStore } from "~/stores/auth";
	import { useLinksStore } from "~/stores/links";
	definePageMeta({ middleware: "is-logged-in" });
	const userStore = useUserStore();
	const socialStore = useSocialStore();
	const authStore = useAuthStore();
	const linksStore = useLinksStore();

	const buttonEl = ref(null);

	onMounted(() => {
		console.log(buttonEl.value.children);

		const renderButton = googleProvider.useRenderButton({
			useOneTap: true,
			element: buttonEl.value,
			onError: () => console.error("Failed to render button"),
			onSuccess: async (res) => {
				if (await socialStore.googleLogin(res)) {
					return useRouter().push("/admin");
				}
				return false;
			},
		});

		renderButton();
	});

	const router = useRouter();

	const email = ref("");
	const password = ref("");
	const errors = ref(null);
	const loading = ref(false);

	const valid = computed(() => {
		return email.value != "" && password.value != "";
	});

	const login = async () => {
		loading.value = true;
		errors.value = null;

		try {
			await authStore.login(email.value, password.value);
			await userStore.getUser();
			await linksStore.getAllLinks();

			router.push("/admin");
		} catch (error) {
			console.log(error);
			errors.value = error.response.data.errors;
		}

		loading.value = false;
	};
</script>
