"use client";

import { DocumentData } from "firebase-admin/firestore";
import { Flex, Text, Box, Button, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getArticles } from "@/lib/data";

export default function ArticlesAndStories() {
  const [articles, setArticles] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (articles.length === 0) {
      const fetchArticles = async () => {
        const articlesData: DocumentData[] = await getArticles();
        setArticles(articlesData)
      };

      fetchArticles();
    }
  }, [])
 
  return (
    <Flex>ArticlesAndStories</Flex>
  )
}
