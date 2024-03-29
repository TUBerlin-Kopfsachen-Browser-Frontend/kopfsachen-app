import { useEffect, useRef, useState, Suspense } from "react";
import {
  Image,
  Center,
  ChakraProvider,
  Text,
  theme,
  Flex,
  Heading,
  Input,
  Stack,
  HStack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  Select,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

import {
  translationsEn,
  translationsTr,
  translationsDe,
  translationsAl,
} from "../components/translationText";
import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import { stringify } from "querystring";
import { networkInterfaces } from "os";
import axios from "axios";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { RadioGroup } from "@chakra-ui/react";
import { Radio } from "@chakra-ui/react";
import { FiFrown, FiMeh, FiSmile } from "react-icons/fi";
import React from "react";

import i18n, { t } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import "./../assets/css/neutral.css";

import { ContentWrapper } from "../components/utils";

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

export default function SocialSupport1() {
  const [isText, setIsText] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [isFertigButton, setIsFertigButton] = useState(false);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { register, handleSubmit, setValue } = useForm<ISafteyNetItem>();
  const onSubmit: SubmitHandler<ISafteyNetItem> = (data) =>
    axios.post(`http://127.0.0.1:4010/safetyNet/1`, data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpenFeedback,
    onOpen: onOpenFeedback,
    onClose: onCloseFeedback,
  } = useDisclosure();
  const onModalClose = () => {
    onCloseFeedback();
  };

  const [nameInput1, setNameInput1] = useState<string[]>([]);
  const [nameInput2, setNameInput2] = useState<string>("");
  const [nameInput3, setNameInput3] = useState<string>("");
  const [strategyInput1, setStrategyInput1] = useState<string>("");
  const [strategyInput2, setStrategyInput2] = useState<string>("");
  const [strategyInput3, setStrategyInput3] = useState<string>("");
  const { t } = useTranslation();
  //   const handleItemInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setNameInput(e.target.value);
  // };

  return (
    <ContentWrapper
      headerProps={{ text: "Social Support 🫂", }}
    >
      <Flex direction="column">
        {/* <Box>
        <Sidebar />
        </Box>
        <Box w="100%" h="600px">
        <Box w="100%" h="200px" bg="#F3803E">
        <Text fontSize="40px" align="center" pt="50px" color="white">
            Social Support{" "}
        </Text>
        <Center>
        <Image src={"/socialsupport.png"} alt="socialsupport" />
        </Center> */}
        <Text maxW={"90%"}>
        In order to take a closer look at this strong-maker, first think about all
        the people in your environment - after all, who knows who of them might be
        able to support you in some way in the future? To do this, sketch out your
        personal network in the following diagram with yourself as the imaginary center:
        </Text>
        <br></br>
        <Text maxW={"90%"}>
          <span className="innereText">
            <b>The inner circle</b>
          </span>{" "}
          – Enter the most important people in your life here.{" "}
          <span className="mittlereText">
            <b>The middle circle</b>
          </span>{" "}
          – Enter people who are still close to you and/or with whom you regularly
          spend time. {" "}
          <span className="ausereText">
            <b>The outer circle</b>
          </span>{" "}
          – Enter here acquaintances and more distant people, with whom you also 
          have to do from time to time. Simply click on the plus symbol to add 
          people to the respective circle.
        </Text>
        <br></br>

        <Box className="container" paddingLeft={"29%"} mt={3}>
          <Image src={"/neutralCircle.png"}></Image>
          <Button onClick={onOpen2} className="button1" border-radius="50%">
            +
          </Button>
          {/* {show && <Box>This is your component</Box>} */}
          <Button onClick={onOpen} className="button2" border-radius="50%">
            +
          </Button>
          <Button onClick={onOpen1} className="button3" border-radius="50%">
            +
          </Button>

          <Text className="ich">ME</Text>

          <Text className="text10">{nameInput1[0]}</Text>
          <Text className="text11">{nameInput1[1]}</Text>
          <Text className="text12">{nameInput1[2]}</Text>
          <Text className="text13">{nameInput1[3]}</Text>
          <Text className="text14">{nameInput1[4]}</Text>
          <Text className="text15">{nameInput1[5]}</Text>

          <Text className="text2">{nameInput2}</Text>
          <Text className="text3">{nameInput3}</Text>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
              <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalHeader fontSize="lg" fontWeight="bold"></ModalHeader>

                  <ModalBody>
                  <Text>{t("socialSupport1")}</Text>
                  <br></br>
                    <Stack direction="row" spacing={3}>
                      <Input
                        onChange={(e: any) => {
                          setStrategyInput1(e.target.value);
                          setIsSubmitDisabled(false);
                          setIsText(true);
                        }}
                      ></Input>
                    </Stack>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                    colorScheme='success'
                      onClick={() => {
                        onClose();
                        // setNameInput1(strategyInput1);
                        nameInput1.push(strategyInput1);
                        setIsFertigButton(true);
                      }}
                      type="submit"
                      isDisabled={isSubmitDisabled}
                      mr={3}
                    >
                      Submit
                    </Button>
                    <Button
                    colorScheme='warning'
                      onClick={() => {
                        onClose();
                        setIsSubmitDisabled(true);
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </ModalOverlay>
          </Modal>
          {/* SECOND LAYER MODAL -----------------------------*/}
          <Modal isOpen={isOpen1} onClose={onClose1}>
            <ModalOverlay>
              <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalHeader fontSize="lg" fontWeight="bold"></ModalHeader>

                  <ModalBody>
                    <Stack direction="row" spacing={3}>
                      <Input
                        onChange={(e: any) => {
                          setStrategyInput2(e.target.value);
                          setIsSubmitDisabled(false);
                          setIsText(true);
                        }}
                      ></Input>
                    </Stack>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                    colorScheme='success'
                      onClick={() => {
                        onClose1();
                        setNameInput2(strategyInput2);
                        setIsFertigButton(true);
                      }}
                      type="submit"
                      isDisabled={isSubmitDisabled}
                      mr={3}
                    >
                      Submit
                    </Button>
                    <Button
                    colorScheme='warning'
                      onClick={() => {
                        onClose1();
                        setIsSubmitDisabled(true);
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </ModalOverlay>
          </Modal>
          {/* 3rd Layer Modal--------------------------- */}

          <Modal isOpen={isOpen2} onClose={onClose2}>
            <ModalOverlay>
              <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalHeader fontSize="lg" fontWeight="bold"></ModalHeader>

                  <ModalBody>
                    <Stack direction="row" spacing={3}>
                      <Input
                        onChange={(e: any) => {
                          setStrategyInput3(e.target.value);
                          setIsSubmitDisabled(false);
                          setIsText(true);
                        }}
                      ></Input>
                    </Stack>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                    colorScheme='success'
                      onClick={() => {
                        onClose2();
                        setNameInput3(strategyInput3);
                        setIsFertigButton(true);
                      }}
                      type="submit"
                      isDisabled={isSubmitDisabled}
                      mr={3}
                    >
                      Submit
                    </Button>
                    <Button
                    colorScheme='warning'
                      onClick={() => {
                        onClose2();
                        setIsSubmitDisabled(true);
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </Box>

        {isFertigButton && (
          <Button
            width={"140px"}
            // backgroundColor={"#F3803E"}
            colorScheme='success'
            marginTop={"20px"}
            marginLeft={"38%"}
            onClick={onOpenFeedback}
            rightIcon={<CheckIcon/>}
          >
            Done
          </Button>
        )}
        <Modal isOpen={isOpenFeedback} onClose={onModalClose}>
          <ModalOverlay>
            <ModalContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader fontSize="lg" fontWeight="bold">
                  How did you like this exercise?
                </ModalHeader>

                <ModalBody>
                  <Stack direction="row" spacing={3}>
                    <IconButton
                      onClick={() => {
                        //   setValue(`feedback.${0}.itHelped`, true);
                        //   setItHelped(true);
                      }}
                      aria-label="positive"
                      // variant={itHelped === true ? "solid" : "ghost"}
                      icon={<FiSmile size={30} color="green" />}
                    />
                    <IconButton
                      onClick={() => {
                        //   setValue(`feedback.${0}.itHelped`, false);
                        //   setItHelped(false);
                      }}
                      aria-label="negative"
                      // variant={itHelped === false ? "solid" : "ghost"}
                      icon={<FiFrown size={30} color="red" />}
                    />
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button
                  colorScheme='success'
                    onClick={() => {
                      onModalClose();
                      // prevent react from clearing the inputs before the form submit is handled
                      setTimeout(() => {
                        //   clearInputs();
                        navigate("/mooddiary");
                      }, 0);
                    }}
                    type="submit"
                    //   isDisabled={typeof itHelped === "undefined"}
                    mr={3}
                  >
                    Submit
                  </Button>
                  <Button colorScheme='warning' onClick={onModalClose}>Cancel</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </ModalOverlay>
        </Modal>
        {/* </Box>
        </Box> */}
      </Flex>
    </ContentWrapper>
  );
}
