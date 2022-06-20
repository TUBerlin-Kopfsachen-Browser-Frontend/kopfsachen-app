
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
  Heading,
  Image,
} from "@chakra-ui/react"
// import { Logo } from "./Logo"
import Sidebar from "./components/Sidebar"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex>
      <Sidebar />

      <Flex
                    flexDirection='column'
                    position='absolute'
                    top='5vh'
                    left='50vw'
                    transform="translate(-50%, -10%)"
                    maxWidth='800px'
                >
        <Grid minH="50vh" p={200}>
          <VStack spacing={8}>
            {/* <Logo h="40vmin" pointerEvents="none" /> */}
            <Image src='/header.png' />
            <Text fontSize="20">Welcome to the Kopsachen Web App!</Text>
          </VStack>
        </Grid>
      </Flex>

    </Flex>
    
  </ChakraProvider>
)