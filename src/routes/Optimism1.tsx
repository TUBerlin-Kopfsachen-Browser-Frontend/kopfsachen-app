import * as React from "react";
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
  Button,
  ButtonGroup,
  SimpleGrid,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, Suspense } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Cards";
import { FiFrown, FiMeh, FiSmile } from "react-icons/fi";

import { useForm, SubmitHandler } from "react-hook-form";
import { AspectRatio } from "@chakra-ui/react";
import axios from "axios";

import i18n, { t } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { ContentWrapper } from "../components/utils";

interface IResources {
  feedback: boolean;
  situations: string[];
}

export default function ReframingText() {
  const navigate = useNavigate();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, setValue } = useForm<IResources>();
  const onSubmit: SubmitHandler<IResources> = (data) =>
    axios.post(`http://127.0.0.1:4010/safetyNet/1`, data);

  const { t } = useTranslation();
  const [isNavReady, setIsNavReady] = useState(false);

  return (
    <ContentWrapper headerProps={{ text: "Optimism", image: "/sun.png" }}>
      <Flex flexDir="column">
        <Container maxW="100rem" centerContent>
          <SimpleGrid>
            <Text fontSize={20} textAlign="center" color={"black"} mb={10}>
              Write down the thoughts that came up in these 10 minutes.
            </Text>
            <Stack spacing={5}>
              <Textarea
                {...register(`situations.${0}`)}
                placeholder="Thought 1"
                focusBorderColor={useColorModeValue(
                  "neutral.400",
                  "neutral.100"
                )}
              />
              <Textarea
                {...register(`situations.${1}`)}
                placeholder="Thougt 2"
                focusBorderColor={useColorModeValue(
                  "neutral.400",
                  "neutral.100"
                )}
              />
              <Textarea
                {...register(`situations.${2}`)}
                placeholder="Thought 3"
                focusBorderColor={useColorModeValue(
                  "neutral.400",
                  "neutral.100"
                )}
              />
              <Textarea
                {...register(`situations.${2}`)}
                placeholder="Thought 4"
                focusBorderColor={useColorModeValue(
                  "neutral.400",
                  "neutral.100"
                )}
              />

              <Center>
                <Button
                  mt={5}
                  onClick={onOpen}
                  w={"30%"}
                  display={"inline-block"}
                  colorScheme="success"
                >
                  Done
                </Button>
              </Center>
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay>
                <ModalContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader fontSize="lg" fontWeight="bold">
                      How did you like this exercise?
                    </ModalHeader>

                    <ModalBody>
                      <Stack direction="row" spacing={3}>
                        <Button
                          onClick={() => {
                            setValue("feedback", true);
                            setIsSubmitDisabled(false);
                          }}
                          aria-label="celebrating emoji"
                          variant="ghost"
                          // icon={<FiSmile size={30} color='green' />}
                        >
                          {" "}
                          <Text fontSize={33}> 🥳 </Text>{" "}
                        </Button>
                        <Button
                          onClick={() => {
                            setValue("feedback", false);
                            setIsSubmitDisabled(false);
                          }}
                          aria-label="vomiting emoji"
                          variant="ghost"
                          // icon={<FiFrown size={30} color='red' />}
                        >
                          {" "}
                          <Text fontSize={33}> 🤮 </Text>{" "}
                        </Button>
                      </Stack>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        colorScheme="success"
                        isDisabled={isSubmitDisabled}
                        type="submit"
                        mr={3}
                        onClick={() => {
                          onClose();
                          navigate("/resources");
                          setIsNavReady(true);
                        }}
                      >
                        {t("submit")}
                      </Button>
                      <Button
                        colorScheme="warning"
                        onClick={() => {
                          onClose();
                          setIsSubmitDisabled(true);
                        }}
                      >
                        {t("cancel")}
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </ModalOverlay>
            </Modal>
          </SimpleGrid>
        </Container>
      </Flex>
    </ContentWrapper>
  );
}
