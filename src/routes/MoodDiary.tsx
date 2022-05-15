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
import Sidebar from "../components/Sidebar"

export default function Wiki() {
    return (
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
                            <Text>
                            The Mood Diary will be here!
                            </Text>
                        </VStack>
                        </Grid>
                </Center>
            </Flex>  
        </ChakraProvider>
    );
}