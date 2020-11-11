let webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BPoKfP-NsrBgYs_epjQRvW0iK5dnAvjEM0WNrDnZ4cVNp9XjVN0vTigOUxIzkbAdC2JsGG5HH7XoKPztGrMzjEM",
  privateKey: "UEdEz2m54U6iFDdhUpg8Yf04FjbOphKOFLVocxvRWvU",
};

webPush.setVapidDetails(
  "mailto:jamal.rumi@icloud.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/e8UI9oYbRMU:APA91bH00NMGuLL1kZm3CqnO77GMGYTBO6dQT8ETQOhPRktx_vbhSYeD8dhoM53TXDZPOlqKEmbk-rVmXMHNQcXDx6DPqgZEUOTfzwF6NsYndB8kNC981LOTVehbHmzY9K8gqGtpbOc5",
  keys: {
    p256dh:
      "BC4XrHBgsP+YresDYo/s6xvpgC3DQoPUR1meQa2f8ubkQFtynECoKw7E/8kjy9s6/HUVRKzZeLLz9B9ux2FcAkk=",
    auth: "VfbUBdj7bB77cnevMXCzLg==",
  },
};

let payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

let options = {
  gcmAPIKey: "198492893500",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
