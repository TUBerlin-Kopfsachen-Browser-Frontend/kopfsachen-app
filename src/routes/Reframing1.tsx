import * as React from "react";
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
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, Suspense } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/ReframingCard";
import { FiFrown, FiMeh, FiSmile } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";
import { AspectRatio } from "@chakra-ui/react";
import axios from "axios";
import i18n, { t } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { ContentWrapper, useMobile } from "../components/utils";
import { CheckIcon } from "@chakra-ui/icons";

interface IResources {
  feedback: boolean;
}

export default function ReframingText() {
  const { title, text } = data;
  const { title1, text1 } = data1;
  const { title2, text2 } = data2;
  const { title3, text3 } = data3;
  const mobile = useMobile();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IResources>();
  const onSubmit: SubmitHandler<IResources> = (data) =>
    axios.post(`http://127.0.0.1:4010/safetyNet/1`, data);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useTranslation();
  const [isNavReady, setIsNavReady] = useState(false);
  const [itHelped, setItHelped] = useState<boolean | undefined>();
  const onModalClose = () => {
    onClose();
    setItHelped(undefined);
  };
  return (
    <ContentWrapper
      headerProps={{ text: "Reframing 🪞" }}
    >
      <Flex direction="column">
        <Flex direction="row" wrap="wrap">
          <Card title={title} text={text} width={mobile ? "100%" : "500px"} />
          <Card title={title1} text={text1} width={mobile ? "100%" : "500px"} />
          <Card title={title2} text={text2} width={mobile ? "100%" : "500px"} />
          <Card title={title3} text={text3} width={mobile ? "100%" : "500px"} />
        </Flex>
        {/* <Flex justifyContent='center'> */}
        <Button
          onClick={onOpen}
          mt={3}
          ml={mobile ? "unset" : 4}
          mb={mobile ? "25px" : "unset"}
          colorScheme="success"
          whiteSpace={mobile ? "initial" : "unset"}
          maxWidth="485px"
          rightIcon={<CheckIcon/>}
        >
          I have come to a new assessment of the situations
        </Button>
        {/* </Flex> */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader fontSize="lg" fontWeight="bold">
                  {" "}
                  How did you like this exercise?{" "}
                </ModalHeader>

                <ModalBody>
                  <Stack direction="row" spacing={3}>
                    <Button
                      onClick={() => {
                        setValue("feedback", true);
                        setIsSubmitDisabled(false);
                        setItHelped(true);
                      }}
                      aria-label="positive"
                      variant={itHelped === true ? "solid" : "ghost"}
                      colorScheme={itHelped === true ? 'yellow' : 'unset'}
                    > <Text fontSize={33}> 🥳 </Text> </Button>
                    <Button
                      onClick={() => {
                        setValue("feedback", false);
                        setIsSubmitDisabled(false);
                        setItHelped(false);
                      }}
                      aria-label="negative"
                      variant={itHelped === false ? "solid" : "ghost"}
                      colorScheme={itHelped === false ? 'yellow' : 'unset'}
                    > <Text fontSize={33}> 🤮 </Text> </Button>
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme='success'
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
                    colorScheme='warning'
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
      </Flex>
    </ContentWrapper >
  );
}

const data = {
  title: "1.",
  text: "Now it is about changing the perspective and putting the situation into a new framing. It is not necessary to find a positive interpretation of the situation, a neutral interpretation can also help you to improve the negative mood.",
};

const data1 = {
  title1:
    "2. If it is a particular action/behaviour that you do not want to do, the following questions will help you to come to a more positive/neutral assessment.",
  text1:
    `A) Broaden the context/ look at it in a different context:
    What advantage could an unloved activity have?\nB) Offer a different evaluation:
    What could a certain behaviour be useful for?\nC) Change the perspective:
    What meaning could it have in 10 years?`,
};

const data2 = {
  title2:
    "3. If someone's behaviour is currently bothering you, think about the following questions:",
  text2:
    `1. What are the possible reasons for this behaviour (which may have nothing to do with you)?\n2. What needs of the other person could be behind it? (Belonging, understanding, security, etc.)\n3. What does this person need with this need? What do they need differently than before?\n4. Who does this person need something from? 5. What do they not need?\n6. What, in particular, can you do next?`
};

const data3 = {
  title3: "4. ",
  text3: "Now go through these questions with all the situations.",
};
