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
   "endpoint": 'https://fcm.googleapis.com/fcm/send/ewTtXVVkZys:APA91bGdTD5BxYUb3uBVbe2F2UDtFyaHvMtoD1sCYAMnB7GamyEpGPmbFprYH_WIKYRmbjoP-qHOAIQrZ8VppNWBy7aUle-o9AJ4tAP3mmIQPEFV6XT44yqYoexAlI-DOg93pnO_GWH6',
   "keys": {
       "p256dh": 'BJ5z8H9BMkBaeHssfiDWWqBJva/5yCtDkuapEVZcjUvYP9WjaGdE0oGG2WiPPnz2a5gxofJMqeVCh1GAvWmtcis=',
       "auth": 'EmRZUpX1z1ofp9f5EzhDag=='
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