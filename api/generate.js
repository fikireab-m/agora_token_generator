const express = require("express");
require('dotenv').config();
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-token')


router.get("/", asyncHandler(async (req, res) => {
    const appId = process.env.AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;
    const channel = req.query.channel;
    const uid = req.query.uid;
    const userAccount = req.user | 'test_user_id';
    const role = req.params.role | RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600

    const currentTimestamp = Math.floor(Date.now() / 1000)

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds


    console.log(`Channel name: ${channel}, ${uid}`)


    if (!channel || !uid) {
        res.status(404).send('Not found');
    } else {
        // Build token with uid
        const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channel, uid, role, privilegeExpiredTs);
        console.log("Token With Integer Number Uid: " + tokenA);

        // Build token with user account
        // const tokenB = RtcTokenBuilder.buildTokenWithAccount(appId, appCertificate, channel, userAccount, role, privilegeExpiredTs);
        // console.log("Token With UserAccount: " + tokenB);
        res.status(201).json({
            channel: channel,
            uid: uid,
            token: tokenA
        });
    }
}));


module.exports = router;
