"use client";

import { Link } from "@chakra-ui/next-js";

import { Flex, Text, Box, Button } from "@chakra-ui/react";
import { getTopWriters } from "@/lib/data";
import { useEffect, useState } from "react";

export default function TopWritersList() {
  const [topWriters, setTopWriters] = useState<string[]>([])

  useEffect(() => {
    if (topWriters.length === 0) {
      const fetchTopWriters = () => {
      const topWritersData: string[] = getTopWriters();
      setTopWriters(topWritersData)
      };
      fetchTopWriters();
    }
  }, [])

  return (
    <Flex
      direction="column"
      w="100%"
      px="15px"
    >
      {
        topWriters.map((topic: string, index: number) => (
          <Link key={index} href="" fontSize="1rem">
            {topic}
          </Link>
        ))
      }
    </Flex>
  )
}



