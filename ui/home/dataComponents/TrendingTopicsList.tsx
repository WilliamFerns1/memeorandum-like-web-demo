"use client";

import { Link } from "@chakra-ui/next-js";

import { Flex, Text, Box, Button } from "@chakra-ui/react";
import { getTrendingTopics } from "@/lib/data";
import { useEffect, useState } from "react";

export default function TrendingTopicsList() {
  const [trendingTopics, setTrendingTopics] = useState<string[]>([])
  useEffect(() => {
    if (trendingTopics.length === 0) {
      const fetchTrendingTopics = () => {
      const trendingTopicsData: string[] = getTrendingTopics();
      setTrendingTopics(trendingTopicsData)
      };
      fetchTrendingTopics();
    }
  }, [])

  return (
    <Flex
      direction="column"
      w="100%"
      px="15px"
    >
      {
        trendingTopics.map((topic: string, index: number) => (
          <Link key={index} href="" fontSize="1rem">
            {topic}
          </Link>
        ))
      }
    </Flex>
  )
}


