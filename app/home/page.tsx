import { Flex, Text, Box, Button, Link } from "@chakra-ui/react";

import { TopItems, TrendingTopics, TopWriters } from "@/ui/home";

export default function Page() {
  return (
    <Flex
      align="center"
      justify="center"
      gap={{base: "20px", md: "40px"}}
      w={"100vw"}
      h={"100vh"}
      p={{base: "15px", md: "25px"}}
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
        justify="center"
        direction="column"
        w={"full"}
        gap={"10px"}
      >
        <TrendingTopics />
        <TopWriters />
      </Flex>
    </Flex>
  )
}
