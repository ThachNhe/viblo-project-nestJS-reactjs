import axios from "../axios";

const getUserNotifications = () => {
  return axios.get("/notifications/user");
};

const markAsRead = (notificationId) => {
  return axios.put(`/notifications/${notificationId}/mark-as-read`);
};

export { getUserNotifications, markAsRead };
