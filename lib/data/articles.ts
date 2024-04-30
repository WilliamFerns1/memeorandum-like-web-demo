"use server";
import { instantiateFirestore } from "../helpers";

async function getArticles() {
  const admin = await instantiateFirestore();
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
