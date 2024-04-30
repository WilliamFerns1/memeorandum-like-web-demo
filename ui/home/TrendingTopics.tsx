import { Flex, Text, Box, Button, Link } from "@chakra-ui/react";
import { TrendingTopicsList } from "./dataComponents";

export default function TrendingTopics() {
  return (
    <Flex align="center" p="15px" gap="5px" w="full" direction="column">
      <Text w="full" fontWeight="bold" whiteSpace="nowrap" fontSize={{base: "l", md: "xl"}}>
        Trending Topics 
      </Text>
      <TrendingTopicsList />
    </Flex>
  )
}

