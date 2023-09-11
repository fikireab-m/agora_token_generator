const express = require("express");
const cors = require("cors");
require('dotenv').config();
const asyncHandler = require("express-async-handler");
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-token')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', function (req, res) {
    res.status(201).send('Agora Token generator');
});

app.get("/api", asyncHandler(async (req, res) => {
    const appId = process.env.AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;
    const channel = req.query.channel;
    const uid = req.query.uid;
    const userAccount = req.user || 'test_user_id';
    const role = req.params.role || RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600

    const currentTimestamp = Math.floor(Date.now() / 1000)

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds


    if (!channel || !uid) {
        res.status(404).send('Not found');
    } else {
        // Build token with uid
        const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channel, uid, role, privilegeExpiredTs);

        res.status(201).json({
            channel: channel,
            uid: uid,
            token: tokenA
        });
    }
}));


// Start the server
app.listen(5000, () => {
    console.log("Server is running on port: 5000");
});

module.exports = app