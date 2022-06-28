import { useEffect, useRef, useState, Suspense } from "react"
import {
   Image, Center, ChakraProvider, Text, theme, Flex, Heading, Input, Stack, HStack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Box, Select
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"

import {translationsEn, translationsTr, translationsDe, translationsAl} from "../components/translationText"


import { useForm, SubmitHandler } from "react-hook-form";
import { stringify } from "querystring"
import { networkInterfaces } from "os"
import axios from "axios"
import { Button, IconButton } from "@chakra-ui/button"
import { AddIcon } from "@chakra-ui/icons"
import { RadioGroup } from "@chakra-ui/react"
import { Radio } from "@chakra-ui/react"
import { FiFrown, FiMeh, FiSmile } from "react-icons/fi"
import React from "react"

import i18n, { t } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import "./../assets/css/neutral.css";

import Circle from "../../src/neutralCircle.png";
import socialsupport from "../socialsupport.png";


interface ISafteyNetItem {
  name: string;
  type: string;
  strategies: string[];
  feedback?: {
      timestamp: string;
      itHelped: boolean;
      comment: string;
  }[];
}

export default function Neutral1(){

    const [isText, setIsText] = useState(false);

    const [show, setShow] = useState(false);

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const { register, handleSubmit, setValue } = useForm<ISafteyNetItem>();
    const onSubmit: SubmitHandler<ISafteyNetItem> = data => axios.post(`http://127.0.0.1:4010/safetyNet/1`, data)
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [nameInput, setNameInput] = useState<string>('');
    const [strategyInput1, setStrategyInput1] = useState<string>('');
    const handleItemInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNameInput(e.target.value);
  };

    return(
      <Flex direction="column">
        <Box>
        <Sidebar />
        </Box>
        <Box w="100%" h="600px">
        <Box w="100%" h="200px" bg="#F3803E">
        <Text fontSize="40px" align="center" pt="50px" color="white">
            Social Support{" "}
          </Text>
          <Center>
            <Image src={socialsupport} alt="socialsupport" />
          </Center>
          <Text paddingLeft={"20%"} maxW={"90%"}>Um dir diesen Starkmacher genauer anzuschauen, überlege dir erst einmal welche Menschen es überhaupt alles in deinem Umfeld gibt – immerhin, wer weiß, wer von ihnen dir in Zukunft vielleicht einmal in irgendeiner Form unterstützend zur Seite stehen kann? Skizziere dazu dein persönliches Netzwerk in folgendem Schema mit dir selbst als gedachtem Mittelpunkt:</Text>
          <br></br>
        <Text paddingLeft={"20%"} maxW={"90%"}>Der innere Kreis – Trage hier die wichtigsten Menschen in deinem Leben ein. Der mittlere Kreis – Trage hier Personen ein, die dir noch nahe stehen und/oder mit denen du regelmäßig Zeit verbringst. Der äußere Kreis – Trage hier Bekannte und eher entferntere Personen ein, mit denen du aber auch ab und zu zu tun hast. Klicke einfach auf das plus-Symbol, um Personen dem jeweiligen Kreis hinzuzufügen.</Text>
        <br></br>
          
        <Box className="container" paddingLeft={"40%"}>
           <Image src={Circle}></Image>
           <Button onClick={() => setShow(prev => !prev)} className="button1" border-radius="50%" >+</Button>
           {/* {show && <Box>This is your component</Box>} */}
           <Button onClick={onOpen} className="button2" border-radius="50%" >+</Button>
           <Button onClick={onOpen} className="button3" border-radius="50%" >+</Button>

           <Text className="ich">ICH</Text>
           <Text className="text">{strategyInput1}</Text>

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
                                            <Input onChange={(e: any) => {setStrategyInput1(e.target.value); setIsSubmitDisabled(false); setIsText(true)}}></Input>
                                        </Stack>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button onClick={onClose} type='submit' isDisabled={isSubmitDisabled} mr={3} >
                                            
                                        </Button>
                                        <Button onClick={() => {
                                            onClose();
                                            setIsSubmitDisabled(true);
                                        }}>
                                            
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalContent>
                        </ModalOverlay>
                    </Modal>
        </Box>      
        </Box>
        </Box>
        </Flex>
      
    )
 }

