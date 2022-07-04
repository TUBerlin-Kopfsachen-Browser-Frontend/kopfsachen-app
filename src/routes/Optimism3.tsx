import * as React from "react"
import {
Icon,
ChakraProvider,
Input,
Box,
Image,
Text,
theme,
Flex,
Center,
Heading,
Stack,
RadioGroup,
HStack,
Radio,
Button, ButtonGroup,
SimpleGrid,
Container,
Modal,
ModalOverlay,
ModalContent,
ModalFooter,
ModalHeader,
ModalBody,
IconButton,
useDisclosure
} from "@chakra-ui/react"
import sun from "../sun.png"


import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, Suspense } from "react"
import Sidebar from "../components/Sidebar"
import Card from "../components/Cards"
import { FiFrown, FiMeh, FiSmile } from "react-icons/fi"

import { useForm, SubmitHandler } from "react-hook-form";
import { AspectRatio } from '@chakra-ui/react'
import axios from "axios"

import i18n, { t } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";


interface IResources {
    feedback: boolean;
     situations: string[];
}

export default function ReframingText(){

    const navigate = useNavigate();
   
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    

        const { register, handleSubmit, setValue } = useForm<IResources>();
        const onSubmit: SubmitHandler<IResources> = data => axios.post(`http://127.0.0.1:4010/safetyNet/1`, data)
        

    const { t } = useTranslation();
    const [isNavReady, setIsNavReady] = useState(false);

    return(
        <ChakraProvider theme={theme}>
            
        <Box >
          <Sidebar />
        </Box>



        <Box w='100%' h='600px'>
          <Box w='100%' h='200px' bg='#F5F500'>
            <Text fontSize='40px' align='center' pt='50px' color='white'>Optimism </Text>
            <Center>
              <Image src={sun} alt="sun" width='80px' />
            </Center>
        <Button  colorScheme='yellow' variant='ghost' pl='300px' onClick={() => navigate
                    ('/optimism2')}>
                        ← Back 
                </Button>
          </Box>
           <Container maxW="100rem" centerContent>
        <SimpleGrid>
               
                    
                     <Text fontSize={{ base: 'md', lg: '2xl' }} textAlign="center" color={'black'} pt={'20px'}>
                                        Write down the thought that came up in these 10 minutes.
                                    </Text>
                            <Stack spacing={8} pt={'80px'}>

                                <Input {...register(`situations.${0}`)} placeholder='---' size='lg' />
                                <Input {...register(`situations.${1}`)} placeholder='---' size='lg' />
                                <Input {...register(`situations.${2}`)} placeholder='---' size='lg' />
                                
 <Center>
                <Button onClick={onOpen} h={'50px'} w={'40%'}  display={'inline-block'} colorScheme='yellow' variant='solid' size='lg'>Done</Button>
                </Center>
                            </Stack>
                
               
                <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay>
                            
                            <ModalContent>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <ModalHeader fontSize='lg' fontWeight='bold'>
                                        
                                    </ModalHeader>

                                    <ModalBody>
                                        <Stack direction='row' spacing={3}>
                                            <IconButton
                                                onClick={() => {
                                                    setValue('feedback', true);
                                                    setIsSubmitDisabled(false);
                                                }}
                                                aria-label='positive'
                                                variant='ghost'
                                                icon={<FiSmile size={30} color='green' />}
                                            />
                                            <IconButton
                                                onClick={() => {
                                                    setValue('feedback', false);
                                                    setIsSubmitDisabled(false);
                                                }}
                                                aria-label='negative'
                                                variant='ghost'
                                                icon={<FiFrown size={30} color='red' />}
                                            />
                                            
                                        </Stack>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button isDisabled={isSubmitDisabled} type='submit' mr={3} 
                                        onClick={() => {
                                                    onClose();
                                                    // navigate('/Resources')
                                                    setIsNavReady(true);
                                                }}>
                                            {t('submit')}
                                        </Button>
                                        <Button onClick={() => {
                                            onClose();
                                            setIsSubmitDisabled(true);
                                        }}>
                                            {t('cancel')}
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalContent>
                        </ModalOverlay>
                    </Modal>
                                
                
            </SimpleGrid>
            </Container>

        </Box>
                      

           
        </ChakraProvider>
    );

}

   