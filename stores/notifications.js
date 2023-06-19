import { defineStore } from "pinia";

class Notifications {
	notifications = ref([]);

	notification = (notification, duration) => {
		this.notifications.value.unshift(notification);
		setTimeout(() => this.notifications.value.pop(), duration);
	};

	errorNotification = (content, duration = 2000) => {
		this.notifications.value.unshift({
			type: "danger",
			content,
		});
		setTimeout(() => this.notifications.value.pop(), duration);
	};
	successNotification = (content, duration = 2000) => {
		this.notifications.value.unshift({
			type: "success",
			title: "Success",
			content,
			icon: "fluent:checkmark-12-filled",
		});
		setTimeout(() => this.notifications.value.pop(), duration);
	};
}

export const useNotificationsStore = defineStore(
	"notifications",
	() => new Notifications()
);
