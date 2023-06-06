<template>
	<div
		class="h-14 bg-white border-t-2 w-full flex justify-center gap-6 px-2 items-center"
	>
		<routerLink to="/admin/nfc">
			<BottomNavigationItem active="admin-NFC">
				<icon
					name="mdi:nfc"
					size="30"
				/>
			</BottomNavigationItem>
		</routerLink>
		<routerLink to="/admin/space">
			<BottomNavigationItem active="admin-space">
				<icon
					name="cib:myspace"
					size="30"
				/>
			</BottomNavigationItem>
		</routerLink>
		<routerLink to="/admin">
			<BottomNavigationItem active="admin">
				<icon
					name="fluent:card-ui-24-filled"
					size="30"
				/>
			</BottomNavigationItem>
		</routerLink>
		<routerLink to="/admin/preview">
			<BottomNavigationItem active="admin-preview">
				<icon
					name="material-symbols:preview"
					size="30"
				/>
			</BottomNavigationItem>
		</routerLink>
		<routerLink to="/admin/analytics">
			<BottomNavigationItem active="admin-analytics">
				<icon
					name="majesticons:analytics"
					size="30"
				/>
				<span
					class="dark:text-white item overflow-hidden hidden transition-all duration-300"
					>Analytics</span
				>
			</BottomNavigationItem>
		</routerLink>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
