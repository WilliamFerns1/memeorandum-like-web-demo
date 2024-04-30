import { Flex, Text, Box, Button, Link } from "@chakra-ui/react";

import { TopItems, TrendingTopics, TopWriters } from "@/ui/home";

export default function Page() {
  return (
    <Flex
      justify="center"
      gap="20px"
      w={"full"}
      h="fit-content"
      p={{base: "15px", md: "25px 35px", lg: "35px 45px"}}
    >
      <Flex
        align="center"
        justify="center"
        direction="column"
        w={"full"}
        gap={"10px"}
        h="100%"
      >
        <TopItems />
      </Flex>
      <Flex
        align="center"
        direction="column"
        w={{base: "100%", md: "50%"}}
        gap={"10px"}
        h="100%" 
      >
        <TrendingTopics />
        <TopWriters />
      </Flex>
    </Flex>
  )
}
