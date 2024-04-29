import { Flex, Text, Box, Button, Link } from "@chakra-ui/react";

import { ArticlesAndStories } from "./dataComponents";

export default function TopItems() {
  return (
    <Flex align="center" justify="space-between" w="full" h="100%" gap="10px" direction="column">
      <Text w="full" fontWeight="bold" whiteSpace="nowrap" fontSize={{base: "xl", md: "2xl"}}>
        Top Items
      </Text>
      <ArticlesAndStories />
    </Flex>
  )
}
