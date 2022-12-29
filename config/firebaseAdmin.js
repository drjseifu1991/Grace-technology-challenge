const admin = require("firebase-admin");
const serviceAccount = require("../config/grace-technology-challenge-firebase-adminsdk-ie47e-992eb484de.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin