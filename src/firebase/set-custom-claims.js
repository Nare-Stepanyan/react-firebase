var admin = require("firebase-admin");

var uid = process.argv[2];
var serviceAccount = require("./dashboard-13d11-firebase-adminsdk-fm559-27939f5eb3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("custom claims det for user", uid);
    process.exit();
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
