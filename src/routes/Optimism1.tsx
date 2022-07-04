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
import thumbnail from "../thumbnail.png"
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
                        <Text fontSize='40px' align='center' pt='50px' color='white'>Optimism </Text>
                            <Center>
                                <Image src={sun} alt="sun" width='80px' /> 
                            </Center>
                            <Button  colorScheme='yellow' variant='ghost' pl='300px' onClick={() => navigate
                    ('/optimism')}>
                        ← Back 
                </Button>

                             <Text fontSize={{ base: 'md', lg: '3xl' }} textAlign="center" color={'black'} pt={'20px'}>
                                        Find out what's behind it!
                                    </Text>
                            
                           <Box w='100%' >
                            <Center>
                              <Image src={thumbnail} alt="thumbnail" width='400px' pt={'20px'} />
                             </Center>
                            </Box>

                            <Center >
            
        <Stack direction='row' spacing={20} pt={'40px'}>
  <Button colorScheme='yellow' variant='solid' size='lg'>
    Choose another strategy

  </Button>
  <Button colorScheme='#F5F500' variant='outline' size='lg'
            onClick={() => navigate('/optimism2')}>
    I want to practice that
  </Button>
        
      </Stack>
        </Center>


        
        
                            
                    </Box> 
    
                </Box>

            
        </ChakraProvider>
    );
}