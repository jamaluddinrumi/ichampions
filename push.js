let webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BPoKfP-NsrBgYs_epjQRvW0iK5dnAvjEM0WNrDnZ4cVNp9XjVN0vTigOUxIzkbAdC2JsGG5HH7XoKPztGrMzjEM",
   "privateKey": "UEdEz2m54U6iFDdhUpg8Yf04FjbOphKOFLVocxvRWvU"
};


webPush.setVapidDetails(
   'mailto:jamal.rumi@icloud.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": 'https://fcm.googleapis.com/fcm/send/fdacIP_LdxU:APA91bGhVDe8yVsQ9RA6rZSlfruKYytIX_pao1Gxb4EmiMx13v0iL6z7V4IRT2dg-PFHkNjusCkhL5ubQBNXvjTckUQ1AVW8VgPMZfuVEERbk1fq5u-wkwc71IILiWOzmkoR5FqviHGR',
   "keys": {
       "p256dh": 'BDUWPFC9cl/Q1rOAQ9Okod5GAbySxIghO1FQICjPBzZZ37eHCbZK9wmaOeDv4PVMeeCjK+O3NqXcdHt+bozAQEI=',
       "auth": 'YT2KO2A4ao1V39g2r3yERw=='
   }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

let options = {
   gcmAPIKey: '198492893500',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);