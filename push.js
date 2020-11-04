let webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BH_kWze1XEjmHEY5xtrrcBQutS3NE48W-zz8t6zvv0EFXGoydC_Ztb5Fh8KVW5dLk8GBumk045Ci0lansP2v4Nk",
   "privateKey": "fCoal2JFXiQIIJiTgjTnhQzL0NOoWjHQoHSTMdBr16w"
};


webPush.setVapidDetails(
   'mailto:jamal.rumi@icloud.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cOf-YzdlOGk:APA91bHsuenJXD05OEz3goEn5eyze-M7jnpFlPsrwaP9nhJHKAZSenc3wtMTDrz8q9YrGlEUe6hO_cOfST0wMEW2Q--F8EwZzubyv_-7YJHvVgDKinoRa4sRfS9wf4NN6dt_GZI735Bq",
   "keys": {
       "p256dh": "BJsH6171Kcvt6tlZMMkQhir94VUstlRwTTn35Ih5gjW1YTpgtBa5ucET2yrsZABayO/Z7UfXVwt2XlwSXDFec1I=",
       "auth": "QDxozxg39emloq0skCgpRQ=="
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