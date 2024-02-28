
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

require('dotenv').config();

const PushNotifications = require('@pusher/push-notifications-server');

app.get('/sync', (request, response) => {

    let beamsClient = new PushNotifications({
        instanceId: process.env.PUSHER_INSTANCE_ID,
        secretKey: process.env.PUSHER_SECRET_KEY,
    });

    beamsClient
        .publishToInterests(["hello"], {
            web: {
                notification: {
                    title: "Synchronisation réussi",
                    body: "La base de données local a été synchronisé avec la base de données distante",
                    deep_link: "https://www.pusher.com",
                },
            },
        })
        .then((publishResponse) => {
            console.log("Just published:", publishResponse.publishId);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    response.send("synced");
});



app.listen(3000);