"use server";

import OpenAI from "openai";
import * as admin from "firebase-admin";
const openaiAPIKey = process.env.OPENAI_API_KEY;
const openaiModel = process.env.OPENAI_MODEL;

console.log(openaiAPIKey)
console.log(openaiModel)

const client = new OpenAI({apiKey: openaiAPIKey});

// Initialize Firebase Admin SDK only if it's not already initialized
if (!admin.apps.length) {
    const serviceAccount = require('@/serviceAccount.json'); // Replace with your service account key path
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // Replace with your Firestore database URL
      databaseURL: "https://memeorandum-demo.firebaseio.com"
    });
}
const db = admin.firestore();

export async function populateDatabaseWithArticles() {

  const allCategories = [
    "trending",
    "trending - current events",
    "trending - popular culture",
    "trending - viral content",
    "trending - internet trends",
    "food",
    "food - recipes",
    "food - restaurant reviews",
    "food - cooking tips",
    "food - food trends",
    "wellness",
    "wellness - mental health",
    "wellness - physical fitness",
    "wellness - healthy eating",
    "wellness - self-care practices",
    "travel",
    "travel - destinations",
    "travel - travel tips",
    "travel - adventure travel",
    "travel - budget travel",
    "sports",
    "sports - football",
    "sports - basketball",
    "sports - soccer",
    "sports - tennis",
    "science",
    "science - biology",
    "science - physics",
    "science - chemistry",
    "science - astronomy",
    "celebrity",
    "celebrity - celebrity gossip",
    "celebrity - red carpet events",
    "celebrity - celebrity interviews",
    "art",
    "art - painting",
    "art - sculpture",
    "art - photography",
    "art - performing arts",
    "nature",
    "nature - wildlife",
    "nature - environment",
    "nature - natural phenomena",
    "nature - conservation"
  ];

  const titles = await generateAllArticleTitles(allCategories, 3)

  console.log(titles)
  console.log(`Generated titles for ${titles.length} categories.`)

  const articles = await generateAllArticles(titles)
  console.log(`Generated articles for ${articles.length} categories.`)

  return articles;
}

async function generateAllArticleTitles(allCategories: string[], totalTitlesPerCategory: number)  {
  console.log(`Total number of categories: ${allCategories.length}`)
  console.log(`Total number of titles per category: ${totalTitlesPerCategory}`)

  const prompt = `You are a professional article/story title generator. For each category provided to you, you will generate a total of ${totalTitlesPerCategory} title/s that meets the following criteria: entertaining, fun, happy an positive. No blood or violence. Your response is in json format. The format of your return must be in the following format, nothing else (ignore the amount of titles, the amount of title/s you need to generate for each category is ${totalTitlesPerCategory}): {"titles": {"category": "trending", "titles": ["title1", "title2", "title3", "title4", "title5"]}, {"category": "food", "titles": ["title1", "title2", "title3", "title4", "title5"]}, ...}`

  const userMessage = `Here is all the categories, generate titles for each category in the right format: ${allCategories.join(", ")}`
  console.log(`Prompt: ${prompt}`)
  console.log(`User Message: ${userMessage}`)

  const completion = await client.chat.completions.create({
    messages: [
      {"role": "system", "content": prompt},
      {"role": "user", "content": userMessage},
    ],
    max_tokens: 4095,
    model: openaiModel || "gpt-3.5-turbo",
    response_format: { type: "json_object"}
  });

  const response = completion.choices[0].message.content;
  console.log(completion.choices)
  console.log(response)
  console.log(response)
  if (response) {
    const responseJSON = JSON.parse(response);
    console.log(responseJSON)
    return responseJSON["titles"]
  }
  else {
    return {"message": "Error: No response from OpenAI"}
  }
}

interface CategoryTitlesObj {
  "category": string,
  "titles": string[]
}

async function generateAllArticles(titles: CategoryTitlesObj[]) {
  const allArticles = []
  for (let i = 0; i < titles.length; i++) {
    const category: CategoryTitlesObj = titles[i];

    const articles : any[] = []
    const categoryObject = {
      "category": category.category,
      "articles": articles,
    };

    for (let j = 0; j < category.titles.length; j++) {
      const title = category.titles[j];

      const completion = await client.chat.completions.create({
        messages: [
          {"role": "system", "content": `You generate a fun and happy long form news article or story for the category ${category.category} with the title: ${title}. You do not use markdown at all. You generate associated tags for the topic, keywords aswell. Your response format in json, it must be in th format like this: {"content": "the article or story here", "tags": [tag1, tag2, tag3, tag4] }. Format the content well, use newline characters (backslash+n).`},
          {"role": "user", "content": `Here is the title: ${title}`},
        ],
        model: openaiModel || "gpt-3.5-turbo",
        response_format: { type: "json_object"},
        max_tokens: 4095,
      });

      const response = completion.choices[0].message.content;

      interface ArticleObj {
        "content": string,
        "tags": string[],
        "title": string,
        "category": string,
      }

      if (response) {
        const responseJSON : any = JSON.parse(response);
        console.log(`"${title}" has a length of ${responseJSON["content"].length}`)
        responseJSON["title"] = title;
        responseJSON["category"] = category.category;

        const newArticle : ArticleObj = responseJSON;
        categoryObject.articles.push(newArticle);
        console.log(responseJSON)
        await saveArticleToFirebase(newArticle, db, "articles")
      }
      else {
        console.log({"message": "Error: No response from OpenAI"})
      }
    }
    allArticles.push(categoryObject);
  }
  return allArticles;
}

async function saveArticleToFirebase(article: any, db: any, collectionName: string) {
  try {
    // Add a new document to the collection with the key-value pairs from the JSON object
    await db.collection(collectionName).add(article);
    console.log(`Article with title ${article.title} saved to Firestore`);
    return {"message": "success"};
  }
  catch (e) {
    console.log(e)
    return {"message": "Error: Unable to save articles to Firebase"}
  }
}

