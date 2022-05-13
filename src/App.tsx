import * as React from "react"
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
} from "@chakra-ui/react"
import { Logo } from "./Logo"
import Sidebar from "./components/Sidebar"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex>
      <Sidebar />

      <Center textAlign="center" fontSize="xl"
        height="40px"
        width="40px"
        position="absolute"
        top="50%"
        left="50%"
        transform="translateY(-50%, -50%)"
      >
        <Grid minH="100vh" p={300}>
          
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Center>

    </Flex>
    
  </ChakraProvider>
)
