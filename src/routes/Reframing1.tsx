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
import Card from "../components/Cards";
import { FiFrown, FiMeh, FiSmile } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";
import { AspectRatio } from "@chakra-ui/react";
import axios from "axios";
import i18n, { t } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { ContentWrapper, useMobile } from "../components/utils";

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

  return (
    <ContentWrapper
      headerProps={{ text: "Reframing", image: "/reframing.png" }}
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
        >
          Ich bin zu einer neuen Bewertung der Situationen gekommen.
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
                    <IconButton
                      onClick={() => {
                        setValue("feedback", true);
                        setIsSubmitDisabled(false);
                      }}
                      aria-label="positive"
                      variant="ghost"
                      icon={<FiSmile size={30} color="green" />}
                    />
                    <IconButton
                      onClick={() => {
                        setValue("feedback", false);
                        setIsSubmitDisabled(false);
                      }}
                      aria-label="negative"
                      variant="ghost"
                      icon={<FiFrown size={30} color="red" />}
                    />
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button
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
      </Flex>
    </ContentWrapper>
  );
}

const data = {
  title: "1.",
  text: "Nun geht es darum die Perspektive zu wechseln und die Situationen in einen neuen Rahmen zu stellen. Es ist dabei nicht zwingend nötig eine positive Interpretaion der Situation zu finden, auch eine neutrale Interpretation kann dir helfen, die negative Stimmung zu bessern.",
};

const data1 = {
  title1:
    "2. Geht es um eine bestimmte Handlung/ Verhalten, die du nicht ausführen möchtest, helfen dir die folgenden Fragen zu einer positiveren/ neutralen Bewertung zu kommen.",
  text1:
    "A) Kontext erweitern/ in einem anderen Kontext betrachten: Welchen Vorteil könnte eine ungeliebte Tätigkeit haben?\nB) Andere Bewertung anbieten:Wozu könnte ein gewisses Verhalten dienen? Welche Funktion könnte es haben?\nC) Perspektive ändern:Welche Bedeutung könnte es in 10 Jahren haben?",
};

const data2 = {
  title2:
    "3. Belastet dich aktuell das Verhalten einer anderen Person, denk über folgende Fragen nach:",
  text2:
    "1. Was sind mögliche Gründe für dieses Verhalten (die ggf. nichts mit dir zu tun haben)?\n2. Welche Bedürfnisse der anderen Person könnten dahinter stehen? (Zugehörigkeit, Verständnis, Sicherheit etc.)\n3. Was braucht diese Person mit diesem Bedürfnis? Was braucht sie anders als bisher?\n4. Von wem braucht diese Person etwas?\n5. Was braucht sie nicht?\n6. Was konkret kannst du als nächstes tun?",
};

const data3 = {
  title3: "4. ",
  text3: "Gehe diese Fragen nun mit allen Situationen durch. ",
};
