import admin from "firebase-admin";
const serviceAccount = require("@/serviceAccount.json");

export async function instantiateFirestore() {

  // if it is already initalized, do not initialize again
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  return admin;
}
