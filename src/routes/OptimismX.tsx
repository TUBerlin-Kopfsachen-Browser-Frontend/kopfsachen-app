import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Stack,
  Tabs, 
  TabList,
  TabPanels, 
  Tab, 
  TabPanel,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Code,
  Grid,
  Image,
  theme,
  Flex,
  Center,
  Heading,
  Button,
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import optimism from "../optimism.png"
import sun from "../sun.png"


import { MdCheckCircle } from "react-icons/md";
import { ChatIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom";


export default function Wiki() {
     const navigate = useNavigate();

    return (
        <ChakraProvider theme={theme}>
            
                    <Box >
                        <Sidebar />
                    </Box>

                <Box w='100%' h='600px'>
                    <Box w='100%' h='200px'  bg='#F5F500'>
                        <Text fontSize='40px' align='center' pt='50px' color='white'>Resources </Text>
                            <Center>
                                <Image src={optimism} alt="optimism" width='80px' /> 
                            </Center>

                            <Text fontSize={20} align='center' pt='50px' color={'gray.600'}> 
                                Which one of the new resources do you want to try today? 
                            </Text>
                            
                           <Box  width="100%" height={12}>
                            <Center>
                              <Image src={sun} alt="sun" pt='50px' />
                             </Center>
                            </Box>

                            <Text pt={'160px'} fontSize={{ base: 'md', lg: '2xl' }} color={'gray.600'} align="center"  >
                             Optimism means seeing the good in life, even if i t doesn't appeear that easy.
                           </Text>
                           <Center >
            
        <Button height='48px'
                width='300px'    
                textAlign="right" 
                size='lg' 
                bg={'#F5F500'}
                top={8} 
                onClick={() => navigate('/resources/optimism1')}
                >
                Let's go!
        </Button>
        </Center>
                            
                    </Box> 
                    
                    



                </Box>




                   
            
        </ChakraProvider>
    );
}