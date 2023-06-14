import { defineStore } from "pinia";

class Notifications {
	notifications = ref([]);

	notification = (notification, duration) => {
		this.notifications.value.unshift(notification);
		setTimeout(() => this.notifications.value.pop(), duration);
	};
}

export const useNotificationsStore = defineStore(
	"notifications",
	() => new Notifications()
);
