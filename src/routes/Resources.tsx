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
  Heading,
  Image,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import meditation from '../../src/meditation.jpg'

export default function Wiki() {
    return (
        <ChakraProvider theme={theme}>
            
            <Flex>
                <Sidebar />
                <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
            as={'span'}
            position={'relative'}
            _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'green.400',
                zIndex: -1,
            }}>
            Kopfsachen
            </Text>
            <br />{' '}
            <Text color={'green.400'} as={'span'}>
            Resources
            </Text>{' '}
        </Heading>
        <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            You have already gatherd so many resources. If you want to work on your already existing ones, click on the button below.
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
            rounded={'full'}
            bg={'green.400'}
            color={'white'}
            _hover={{
                bg: 'green.500',
            }}>
            Security Net
            </Button>
            <Button rounded={'full'}>Situational Control</Button>
        </Stack>
        </Stack>
    </Flex>
    <Flex flex={1}>
        <Image
        alt={'Login Image'}
        objectFit={'cover'}
        src={meditation} />
    </Flex>
    </Stack>
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
                            
                        </VStack>
                        </Grid>
                </Center>
            </Flex>  
            
        </ChakraProvider>
    );
}