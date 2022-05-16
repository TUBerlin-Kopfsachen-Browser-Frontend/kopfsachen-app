import React, {useState} from "react";
import {Heading} from '@chakra-ui/react';
import Calendar from 'react-calendar';
import {render} from 'react-dom';

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
import { FiBox } from "react-icons/fi";


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
                            
                            <Box
                            minHeight="100nvh"
                            

                            >
                            <text
                                    fontSize={102}
                                    letterSpacing="8px"

                            > Mood Diary </text>
                            

                            </Box>
                            

                        </VStack>
                        </Grid>
                </Center>
            </Flex>  
            
        </ChakraProvider>
    );
}

const ReactCalendar = () => {
    const [date, setDate] = useState (new Date());
    const onChange = () => {
        setDate(date)
    };
    return (
        <div>
            <Calendar onChange={onChange} value = {date}/>
        </div>
    );
};
render (<ReactCalendar />, document.querySelector('#root'));


