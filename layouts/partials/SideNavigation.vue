<template>
	<aside
		class="flex flex-col h-[100%] items-center justify-between py-6 bg-white"
	>
		<div class="flex flex-col items-center space-y-20 w-full h-full">
			<span class="dark:text-white font-semibold text-2xl">
				<Logo class="h-96 w-96" />
				<!-- <img src="~/assets/logo2.jpg" class="h-14 w-14" alt=""> -->
			</span>
			<div class="space-y-8 flex flex-col justify-between w-full h-full">
				<div class="flex flex-col items-center gap-6">
					<routerLink to="/admin">
						<SideNavigationItem active="admin">
							<icon
								name="fluent:card-ui-24-filled"
								size="30"
							/>
							<span
								class="dark:text-white item overflow-hidden hidden transition-all duration-300"
								>Bio</span
							>
						</SideNavigationItem>
					</routerLink>
					<routerLink to="/admin/nfc">
						<SideNavigationItem active="admin-NFC">
							<icon
								name="mdi:nfc"
								size="30"
							/>
							<span
								class="dark:text-white item overflow-hidden hidden transition-all duration-300"
								>NFC card</span
							>
						</SideNavigationItem>
					</routerLink>
					<routerLink to="/admin/analytics">
						<SideNavigationItem active="admin-analytics">
							<icon
								name="majesticons:analytics"
								size="30"
							/>
							<span
								class="dark:text-white item overflow-hidden hidden transition-all duration-300"
								>Analytics</span
							>
						</SideNavigationItem>
					</routerLink>
					<routerLink to="/admin/space">
						<SideNavigationItem active="admin-space">
							<icon
								name="cib:myspace"
								size="30"
							/>
							<span
								class="dark:text-white item overflow-hidden hidden transition-all duration-300"
								>Myspace</span
							>
						</SideNavigationItem>
					</routerLink>
				</div>
				<Button
					type="danger"
					class="min-w-[2.5rem] px-2 h-10 self-center"
					@click="deleteConfirm = true"
				>
					<div class="flex items-center justify-center gap-2">
						<icon
							class="block"
							name="oi:power-standby"
						/>
						<span class="dark:text-white item hidden transition-all"
							>Logout</span
						>
					</div>
				</Button>
			</div>

			<ConfirmModal
				:show="deleteConfirm"
				title="Logout"
				body="Are you sure you want to logout"
				type="danger"
				@close="deleteConfirm = false"
				@confirm="logout()"
				positive="Logout"
			/>
		</div>
	</aside>
</template>

<script setup lang="ts">
	import { useUserStore } from "~~/stores/user";
	import SideNavigationItem from "./SideNavigationItem.vue";
	const userStore = useUserStore();

	const deleteConfirm = ref(false);

	async function logout() {
		await userStore.logout();
		useRouter().push("/login");
	}
</script>

<style scoped></style>
