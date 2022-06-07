import * as React from "react"
import {
Icon,
ChakraProvider,
Input,
Box,
Text,
theme,
Flex,
Center,
Heading,
Stack,
RadioGroup,
HStack,
Radio,
Button, ButtonGroup
} from "@chakra-ui/react"

import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"
import { AspectRatio } from '@chakra-ui/react'




export default function New() {
        const navigate = useNavigate();

    return (
        <ChakraProvider theme={theme}>
            <Flex>
                <Sidebar />
                <Button colorScheme='teal' variant='ghost' onClick={() => navigate('/reframing')}>
                    ← Back
                    </Button>
                        <Stack>
                           <Center>
                                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}  >
                                    <Text color={'green.400'} pt={'50px'}  >
                                
                                        Reframing
                                
                                    </Text>
                                </Heading>
                                </Center>
                            <Stack>
                             <Center>
                                    <Text fontSize={{ base: 'md', lg: '2xl' }} color={'white'} pt={'90px'} >
                                        Which Situation is bothering you at the moment? {'\n'}
                                        Maybe there is more than one, we are going to go through each situaion step by step.
                                    </Text>
                                    </Center>
                             </Stack>
                           

                            <Stack
                             spacing={3} pt={'30px'}>
  <Input placeholder='Situation 1' size='lg' />
  <Input placeholder='Situation 2' size='lg' />
  <Input placeholder='Situation 3' size='lg' />
  <Input placeholder='Situation 4' size='lg' />

      </Stack>
        
        <Center >
            
        <Stack direction='row' spacing={20}  pt={'50px'}>
  <Button colorScheme='teal' variant='solid' size='lg'>
    These are all the situation that are bothering me at the moment

  </Button>
  
        
      </Stack>
        </Center>

</Stack>

            
            </Flex>  
            
        </ChakraProvider>
    );
    }