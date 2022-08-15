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
import { FiCheck, FiFrown, FiMeh, FiSmile } from "react-icons/fi";

import { useForm, SubmitHandler } from "react-hook-form";
import { AspectRatio } from "@chakra-ui/react";
import axios from "axios";

import i18n, { t } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { ContentWrapper } from "../components/utils";
import { MdDone } from "react-icons/md";
import { CheckIcon } from "@chakra-ui/icons";

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
  const [itHelped, setItHelped] = useState<boolean | undefined>();
  const onModalClose = () => {
    onClose();
    setItHelped(undefined);
  };

  return (
    <ContentWrapper headerProps={{ text: "Optimism 🌻" }}>
      <Flex flexDir="column">
        <Container maxW="100rem" centerContent>
          <SimpleGrid>
            <Text fontSize={20} textAlign="center" mb={10}>
              Write down the thoughts that came up in these 10 minutes.
            </Text>
            <Stack spacing={5}>
              <Flex alignItems='center'>
              <Text fontSize='26' mr={3}>💡</Text>
              <Textarea
                {...register(`situations.${0}`)}
                placeholder="Room for thoughts 1"
                focusBorderColor={useColorModeValue(
                  "neutral.400",
                  "neutral.100"
                )}
              />
              </Flex>
              <Flex alignItems='center'>
              <Text fontSize='26' mr={3}>💡</Text>
              <Textarea
                {...register(`situations.${1}`)}
                placeholder="Room for thougts 2"
                focusBorderColor={useColorModeValue(
                  "neutral.400",
                  "neutral.100"
                )}
              />
              </Flex>
              <Flex alignItems='center'>
              <Text fontSize='26' mr={3}>💡</Text>
              <Textarea
                {...register(`situations.${2}`)}
                placeholder="Room for thoughts 3"
                focusBorderColor={useColorModeValue(
                  "neutral.400",
                  "neutral.100"
                )}
              />
              </Flex>
              <Center>
                <Button
                  mt={5}
                  onClick={onOpen}
                  // display={"inline-block"}
                  colorScheme="success"
                  rightIcon={<CheckIcon/>}
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
                            setItHelped(true);
                          }}
                          aria-label="celebrating emoji"
                          variant={itHelped === true ? "solid" : "ghost"}
                          colorScheme={itHelped === true ? 'yellow' : 'unset'}
                        >
                          {" "}
                          <Text fontSize={33}> 🥳 </Text>{" "}
                        </Button>
                        <Button
                          onClick={() => {
                            setValue("feedback", false);
                            setIsSubmitDisabled(false);
                            setItHelped(false);
                          }}
                          aria-label="vomiting emoji"
                          variant={itHelped === false ? "solid" : "ghost"}
                          colorScheme={itHelped === false ? 'yellow' : 'unset'}
                         
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
                          onModalClose();
                          navigate("/resources");
                          setIsNavReady(true);
                        }}
                      >
                        {t("submit")}
                      </Button>
                      <Button
                        colorScheme="warning"
                        onClick={() => {
                          onModalClose();
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
