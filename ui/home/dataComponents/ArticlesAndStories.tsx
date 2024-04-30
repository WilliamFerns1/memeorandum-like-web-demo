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

  function randomColor() {
    const colors = ["red", "blue", "green", "brown", "purple", "orange", "black"]
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];

    return randomColor
  }

  return (
    <Flex direction="column" gap="15px" px="10px" align="center" justify="center">
      {articles.map((article) => (
        <Box key={article.id}>
          <Text fontWeight="600" fontSize="1rem">
            {article.title}
          </Text>
          <Text
            marginLeft="20px"
            textOverflow="ellipsis"
            w="full" maxHeight={"50px"}
            overflowY={"hidden"}
          >
            {article.content}
          </Text>
          <Flex gap="25px" px="15px">
            <Text fontSize="0.9em" fontWeight={"500"}>Tags: </Text>
            <Flex gap="15px" align="center" justify="center">
              {
                article.tags.map((tag: string) => {
                  const color = randomColor();
                  return (
                    <Text key={tag} color={color} fontSize="10px">{tag}</Text>
                  )
                })
              }
            </Flex>
          </Flex>
          <Button colorScheme="blue" size="sm" margin="5px">Read More</Button>
          <Button colorScheme="gray" size="sm" margin="5px">{article.category}</Button>
        </Box>
      ))}
    </Flex>
  )
}
