import { Flex, Text, Box, Button, Link } from "@chakra-ui/react";
import { TopWritersList } from "./dataComponents";

export default function TopWriters() {
  return (
    <Flex align="center" h="full" p="15px" gap="5px" w="full" direction="column">
      <Text w="full" fontWeight="bold" whiteSpace="nowrap" fontSize={{base: "l", md: "xl"}}>
        Top Writers
      </Text>
      <TopWritersList />
    </Flex>
  )
}


