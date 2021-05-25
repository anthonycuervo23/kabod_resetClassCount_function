const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const database = admin.firestore().collection("users");

exports.updateTotalClasses = functions.pubsub.schedule('0 0 1 * *').onRun((context) => {
 
    database.get()
    .then(snap =>{
        const batch = admin.firestore().batch();
        snap.forEach(x => {
            const pathRef = database.doc(x.id);
            batch.update(pathRef, {"totalClasses": 0});
        });
        return batch.commit();
    });

    return console.log('TotalClasses where updated successfully!');;
  });