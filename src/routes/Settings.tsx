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
    Button,
    Stack,
    Avatar,
    Heading,
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import { FiChevronRight, FiSettings, FiUser } from "react-icons/fi";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

export default function Settings() {
    return (
        <ChakraProvider theme={theme}>
            <Flex>
                <Sidebar />
                <Flex
                    flexDirection='column'
                    position='absolute'
                    top='10vh'
                    left='50vw'
                    transform="translate(-50%, -0%)"
                    maxWidth='800px'
                >
                    <Center>
                        <Heading> Settings </Heading>
                    </Center>
                    <Center>
                        <Avatar size='xl' margin={7} icon={<FiSettings/>}/>
                    </Center>
                    <Stack direction='column'spacing={3}>
                        <ColorModeSwitcher justifySelf="flex-end" />
                        {/* <Link>
                            <Button width={200} leftIcon={<FiUser/>} rightIcon={<FiChevronRight/>}> Account </Button>
                        </Link> */}
                    </Stack>
                </Flex>
            </Flex>  
        </ChakraProvider>
    );
}