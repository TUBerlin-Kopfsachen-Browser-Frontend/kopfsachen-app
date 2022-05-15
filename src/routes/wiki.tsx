import { useEffect } from "react"
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
    useEffect(() => {
        console.log('Effect got called');
    }, []);
    
    return (
        <ChakraProvider theme={theme}>
            <Flex>
                <Sidebar />
                <Center textAlign="center" fontSize="xl"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translateY(-50%, -50%)"
                >
                    The wiki will be here!
                </Center>
            </Flex>  
        </ChakraProvider>
    );
}