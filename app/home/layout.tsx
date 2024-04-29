import { Inter } from "next/font/google";
import { Flex, Text, Box, Button, Link } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex>
      {children}
    </Flex>
  );
}

