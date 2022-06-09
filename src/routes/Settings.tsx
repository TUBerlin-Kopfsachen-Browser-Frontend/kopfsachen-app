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
                <Flex
                    flexDirection='column'
                    position='absolute'
                    top='5vh'
                    left='50vw'
                    transform="translate(-50%, -10%)"
                    maxWidth='800px'
                >
                    <Grid minH="50vh" p={300}>
                        <VStack spacing={8}>
                            <Text>
                                The Settings will be here!
                            </Text>
                        </VStack>
                    </Grid>
                
                </Flex>  
            </Flex>
        </ChakraProvider>
    );
}