import * as React from "react"
import { useState, useEffect } from 'react'
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
import { useNavigate } from "react-router-dom";
import Logo from "../../src/net.png";
import Logo1 from "../../src/situationskontrolle.png";

interface IEntry {
    id: string ;
    type: string;
    headline: string;
    description: string;
    textContents: string [];
    mediaContents: {
        format: "string",
        url: "string",
    } [] ;
    userInputForm: string;
    motivatorId: string;
    timestamp: string;
    results: string [];
    
}

interface IEntryPageProps {
    entry: IEntry;
}

interface IContent {
    format: string;
    url: string;
}



 function Motivator() {
    const [navSize, changeNavSize] = useState("large")
    const navigate = useNavigate();
    const [entryToDisplay, setEntryToDisplay] = useState<IEntry>();
    const [entries, setEntries] = useState<IEntry[]>([]);


    useEffect(() => {
        const baseUrl = "http://127.0.0.1:4010"; // localhost + port as base url
        const userId = 1; // random entry id
        const fetchEntriesWrapper = async () => {
            const fetchEntries = await fetch(`${baseUrl}/motivator/${userId}`);
            if (fetchEntries.ok) {
                const entriesData = await fetchEntries.json();
                if (entriesData.length > 0) {
                    setEntries(entriesData); // sort entries by title before storing
                }
            } else {
                console.log("Failed to fetch wiki entries.");
            }
        }
        fetchEntriesWrapper();

    }, []);



    return (
        <ChakraProvider theme={theme}>
            
            <Flex>
                <Sidebar />
                
                <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                    <Flex p={5} flex={1} align={'center'} justify={'center'}>
                        <Stack spacing={10} w={'full'} maxW={'lg'}>
                            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>           
                                <Text color={'green.400'} as={'span'}>
                                    My Resources
                                </Text>
                            </Heading>
                            
                                <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                                    You have already gatherd so many resources. If you want to work on your already existing ones, click on the button below.
                                </Text>
                        
                            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                                                    
                                <Button
                                    textAlign="center"
                                    rounded={'full'}
                                    bg={'green.400'}
                                    color={'white'}
                                    onClick={() => navigate('/newresources')}>
                                        Discover New Resources!
                                </Button>
                            
                            </Stack>


                            <Stack direction='row'  pt={'80px'}>

                                <Button  variant='ghost' size='lg'>
                                    Safety Net
                                        <Image width={20} height={16} alt={'Logo'} objectFit={'cover'} 
                                                src={Logo} />
                                </Button>


                                <Button  variant='ghost' size='lg' >
                                    Situtation control
                                        <Image alt={'Logo1'} objectFit={'cover'} src={Logo1} />
                                </Button>
        
                            </Stack>
                        </Stack>
                </Flex>
            
            <Flex flex={1}> <Image alt={'Login Image'}  objectFit={'cover'} src={meditation} /> </Flex>
                    
    </Stack>

    
                <Center textAlign="center" fontSize="xl"
                    height="40px"
                    width="40px"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translateY(-50%, -50%)" >
                    

                    <Grid minH="100vh" p={300}>
                        <VStack spacing={8}>
                        </VStack>
                    </Grid>
                </Center>
            </Flex>  
            
        </ChakraProvider>
    );
}


export default function Resources() {

    return(
    <ChakraProvider theme={theme}>
            <Motivator/>

        </ChakraProvider>
    );
}