import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Center,
  Heading,
  Image,
  Button,
  Stack,
} from "@chakra-ui/react";
// import { Logo } from "./Logo"
import Sidebar from "./components/Sidebar";
import { useStore } from "../src/store/isLoggedIn";
import { useEffect, useState } from "react";
import { ContentWrapper, useMobile } from "./components/utils";


export default function App() {
  const mobile = useMobile();
  return <ContentWrapper headerProps={{ text: 'Home' }}>
    <Flex flexDirection='column' alignItems='center' mt='150px'>
      <Image src="/header.png" width={["200px", "400px"]} />
      <Text fontSize={["16", "20"]}>Welcome to the Kopfsachen Web App!</Text>
      <Stack spacing={4} direction="row" align="center">
        <a href="/login">
          <Button
            display={useStore((state) => state.isLoggedIn) ? "none" : ""}
            colorScheme="success"
            mt={3}
          >
            Login
          </Button>
        </a>
        <a href="/register">
          <Button
            display={useStore((state) => state.isLoggedIn) ? "none" : ""}
            colorScheme="primary"
            mt={3}
          >
            Register
          </Button>
        </a>
      </Stack>
    </Flex>
  </ContentWrapper>
}
