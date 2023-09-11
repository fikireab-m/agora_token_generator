const express = require("express");
require('dotenv').config();
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-token')


router.get("/", asyncHandler(async (req, res) => {
    const appId = process.env.AGORA_APP_ID || 'bfbe4ba995b54b1885f3a36881a30f66';
    const appCertificate = process.env.AGORA_APP_CERTIFICATE || '1acdd37a31a246698197f749b9ecef2a';
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


module.exports = router;
