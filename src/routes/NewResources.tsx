import { useEffect, useState } from "react"
import * as React from "react"

import {
Icon,
ChakraProvider,
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
import {
FormControl,
FormLabel,
FormErrorMessage,
FormHelperText,
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"



export default function Motivatiors() {

    const navigate = useNavigate();

    return (
        <ChakraProvider theme={theme}>
            <Flex>
                <Sidebar />
                        <Stack>
                            <Box >
                                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}  >
                                    <Text color={'green.400'}  align="center"pt={'80px'}  >
                                
                                        My Resources
                                
                                    </Text>
                                </Heading>
                            
                                    <Text fontSize={{ base: 'md', lg: '2xl' }} color={'gray.500'} pt={'60px'} align="center">
                                        Which one of the new resources do you want to try today? 
                                    </Text>
                            </Box>

                                
                            <Box  width="100%" height={12}>
                                <FormControl as='fieldset'    >
                                    <RadioGroup defaultValue='Itachi'pt={'40px'} pl={'150px'} >
                                        < HStack spacing='200px'>

                                            <Radio value='Sasuke'> 
                                                <Text fontSize={100}> 😄</Text>
                                            </Radio>

                                            < Radio value='Nagato'> 
                                                <Text fontSize={100}> 😐</Text>
                                            </Radio>

                                            <Radio value='Itachi'>
                                                <Text fontSize={100}> 😞</Text> 
                                            </Radio>
                                        </HStack>
                                    </RadioGroup>
                                </FormControl>
                            </Box>
        
        <Text pt={'180px'} fontSize={{ base: 'md', lg: '2xl' }} color={'gray.300'} align="center"  >
            Reframing is about checking your own assessment of the situation and, if necessary, coming to a different interpretation.
        </Text>
        
        <Center >
            
        <Button height='48px'
                width='300px'    
                textAlign="right" 
                size='lg' 
                bg={'green.400'}
                top={8} 
                onClick={() => navigate('/reframing')}
                >
                Let's go!
        </Button>
        </Center>

</Stack>

            
            </Flex>  
            
        </ChakraProvider>
    );




    
}
