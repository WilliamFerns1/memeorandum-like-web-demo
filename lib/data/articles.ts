"use server";
import admin from "firebase-admin";

const serviceAccount = require("@/serviceAccount.json");

// if it is already initalized, do not initialize again
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function getArticles() {
  const db = admin.firestore();
  const articlesRef = db.collection("articles");

  // Get a limit of 10 articles
  const snapshot = await articlesRef.limit(10).get();

  // Return the articles as json
  const allArticles = snapshot.docs.map(doc => doc.data());
  return allArticles
}

export {
  getArticles
}
