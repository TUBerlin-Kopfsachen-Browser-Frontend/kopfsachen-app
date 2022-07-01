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

export const App = () => (
  <Flex>
    <Sidebar />

    <Center minH="100vh" width="100%" gap="16px" flexDirection="column">
      {/* <Logo h="40vmin" pointerEvents="none" /> */}
      <Image src="/header.png" width={["200px", "400px"]} />
      <Text fontSize={["16", "24"]}>Welcome to the Kopsachen Web App!</Text>
      <Stack spacing={4} direction="row" align="center">
        <a href="/login">
          <Button
            display={useStore((state) => state.isLoggedIn) ? "none" : ""}
            colorScheme="teal"
          >
            Login
          </Button>
        </a>
        <a href="/register">
          <Button
            display={useStore((state) => state.isLoggedIn) ? "none" : ""}
            colorScheme="teal"
          >
            Register
          </Button>
        </a>
      </Stack>
    </Center>
  </Flex>
);
