import * as React from "react"
import { useState } from 'react'
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
import {
    FiMenu,
    FiCheck,
    FiHome,
    FiCalendar,
    FiBookOpen,
    FiArrowUpCircle,
    FiShield,
    FiSettings
} from 'react-icons/fi'
import Sidebar from "../components/Sidebar"
import meditation from '../../src/meditation.jpg'
import { useNavigate } from "react-router-dom";




export default function Wiki() {
    const [navSize, changeNavSize] = useState("large")
    const navigate = useNavigate();



    return (
        <ChakraProvider theme={theme}>
            
            <Flex>
                <Sidebar />
                
                <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                    <Flex p={5} flex={1} align={'center'} justify={'center'}>
                        <Stack spacing={10} w={'full'} maxW={'lg'}>
                            <Center>
                                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
    
            
                                    <Text color={'green.400'} as={'span'}>
                                    My Resources
                                    </Text>
                                </Heading>
                            </Center>
        
                                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                                    You have already gatherd so many resources. If you want to work on your already existing ones, click on the button below.
                                    </Text>

                        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                            
                           
                            
                            <Button
                            isFullWidth textAlign="left"
                            rounded={'full'}
                            bg={'green.400'}
                            color={'white'}
                            
                            onClick={() => navigate('/newresources')}>

                            Discover New Resources!

                            </Button>
                            
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