import { useEffect, useRef, useState, Suspense } from "react";
import {
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
  Link,
  Center,
  Portal,
  useColorModeValue,
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
import { AddIcon } from "@chakra-ui/icons";
import { RadioGroup } from "@chakra-ui/react";
import { Radio } from "@chakra-ui/react";
import { FiFrown, FiMeh, FiSmile } from "react-icons/fi";
import React from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { ContentWrapper, useMobile } from '../components/utils';

import i18n, { t } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

// import safetyNet from "../safetyNet.png";
import "./../assets/css/safetyNet.scss";
import { resourceUsage } from "process";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    tr: { translation: translationsTr },
    de: { translation: translationsDe },
    al: { translation: translationsAl },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

interface ISafetyNetItem {
  id: number;
  name: string;
  type: string;
  strategies: string[];
  feedback?: {
    itHelped: boolean;
    comment: string;
    timestamp: string;
  }[];
}

function AddItemView() {
  const [nameInput, setNameInput] = useState<string>("");
  const [strategyInput1, setStrategyInput1] = useState<string>("");
  const [strategyInput2, setStrategyInput2] = useState<string>("");
  const [strategyInput3, setStrategyInput3] = useState<string>("");
  const [categoryInput, setCategoryInput] = useState("people");
  const [continueClicked, setContinueClicked] = useState(false);
  const [itHelped, setItHelped] = useState<boolean | undefined>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset } = useForm<ISafetyNetItem>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const mobile = useMobile();

  const handleItemInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };
  const onSubmit: SubmitHandler<ISafetyNetItem> = (data) => {
    console.log("submitting", data);
    axios.post(`http://127.0.0.1:4010/safetyNet`, data);
  };
  const onModalClose = () => {
    onClose();
    setItHelped(undefined);
  };
  const clearInputs = () => {
    reset();
    setValue("type", "people");
    setNameInput("");
    setStrategyInput1("");
    setStrategyInput2("");
    setStrategyInput3("");
    setCategoryInput("people");
    setContinueClicked(false);
  };

  return (
    <Flex direction="column">
      <Text fontSize={20} marginBottom={5}>
        {" "}
        {t("happyMaker")}{" "}
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          focusBorderColor={useColorModeValue("neutral.400", "neutral.100")}
          {...register("name")}
          onChange={handleItemInput}
          value={nameInput}
          isDisabled={continueClicked}
        />
        <Text fontSize={20} marginTop={7} marginBottom={5}>
          {" "}
          {t("chooseCategory")}{" "}
        </Text>
        <RadioGroup
          onChange={setCategoryInput}
          value={categoryInput}
          colorScheme="neutral"
          isDisabled={continueClicked}
        >
          <Flex direction="row" wrap='wrap' justifyContent='space-around'>
            <Radio {...register("type")} value="people" ml={2.5} mr={2.5} width='100px'>
              People
              <Text fontSize={40}>👩‍👦</Text>{" "}
            </Radio>
            <Radio {...register("type")} value="activities" ml={2.5} mr={2.5} width='100px'>
              Activities
              <Text fontSize={40}>🤾🏾</Text>{" "}
            </Radio>
            {/* <Radio {...register("type")} value="situationControl" ml={2.5} mr={2.5} width='100px'>
              {t("situationControl")}
              <Text fontSize={40}>🌈</Text>
            </Radio>
            <Radio {...register("type")} value="relaxation" ml={2.5} mr={2.5} width='100px'>
              {t("relaxation")}
              <Text fontSize={40}>🦥</Text>
            </Radio> */}
            <Radio {...register("type")} value="pets" ml={2.5} mr={2.5} width='100px'>
              {t("pets")}
              <Text fontSize={40}>🐾</Text>{" "}
            </Radio>
            <Radio {...register("type")} value="personalStrengths" ml={2.5} mr={2.5} width='100px'>
              Personal strengths
              <Text fontSize={40}>💪🏽</Text>{" "}
            </Radio>
            <Radio {...register("type")} value="other" ml={2.5} mr={2.5} width='100px'>
              {t("other")}
              <Text fontSize={40}>💭</Text>
            </Radio>
          </Flex>
        </RadioGroup>

        {!continueClicked && (
          <Button
            marginTop={10}
            marginBottom={5}
            colorScheme="success"
            onClick={() => setContinueClicked(true)}
            isDisabled={nameInput.trim() === ""}
          >
            {t("continue")}
          </Button>
        )}
      </form>
      <Flex
        direction="column"
        mt={5}
        display={continueClicked ? undefined : "none"}
      >
        <Text fontSize={20} marginTop={2} marginBottom={5}>
          {" "}
          {t("chooseWays")}{" "}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Input
              {...register(`strategies.0`)}
              placeholder="first"
              focusBorderColor={useColorModeValue("neutral.400", "neutral.100")}
              value={strategyInput1}
              onChange={(e: any) => setStrategyInput1(e.target.value)}
            />
            <Input
              {...register(`strategies.1`)}
              placeholder="second"
              focusBorderColor={useColorModeValue("neutral.400", "neutral.100")}
              value={strategyInput2}
              onChange={(e: any) => setStrategyInput2(e.target.value)}
            />
            <Input
              {...register(`strategies.2`)}
              placeholder="third"
              focusBorderColor={useColorModeValue("neutral.400", "neutral.100")}
              value={strategyInput3}
              onChange={(e: any) => setStrategyInput3(e.target.value)}
            />
          </Stack>
        </form>
        <Flex marginTop={5} justifyContent='space-evenly'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button
              type="submit"
              onClick={() => {
                // prevent react from clearing the inputs before the form submit is handled
                setTimeout(() => {
                  clearInputs();
                }, 0);
              }}
              marginRight={3}
              marginBottom={mobile ? '25px' : 'unset'}
              colorScheme="primary"
              whiteSpace={mobile ? 'initial' : 'unset'}
              isDisabled={
                strategyInput1.trim() === "" ||
                strategyInput2.trim() === "" ||
                strategyInput3.trim() === ""
              }
            >
              {t("addResource")}
            </Button>
          </form>
          <Button
            onClick={onOpen}
            marginRight={3}
            marginBottom={mobile ? '25px' : 'unset'}
            colorScheme="success"
            whiteSpace={mobile ? 'initial' : 'unset'}
            isDisabled={
              strategyInput1.trim() === "" ||
              strategyInput2.trim() === "" ||
              strategyInput3.trim() === ""
            }
          >
            {t("allResources")}
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onModalClose}>
          <ModalOverlay>
            <ModalContent width={mobile ? 'calc(100vw - 40px)' : 'unset'}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader fontSize="lg" fontWeight="bold">
                  {t("feedback")}
                </ModalHeader>
                <ModalBody>
                  <Stack direction="row" spacing={3}>
                    <Button
                      onClick={() => {
                        setValue(`feedback.${0}.itHelped`, true);
                        setItHelped(true);
                      }}
                      aria-label="positive"
                      variant={itHelped === true ? "solid" : "ghost"}
                      colorScheme={itHelped === true ? 'yellow' : 'unset'}
                    // icon={<FiSmile size={30} color="green" />}
                    >
                      <Text fontSize={33}> 🥳 </Text>
                    </Button>
                    <Button
                      onClick={() => {
                        setValue(`feedback.${0}.itHelped`, false);
                        setItHelped(false);
                      }}
                      aria-label="negative"
                      variant={itHelped === false ? 'solid' : "ghost"}
                      colorScheme={itHelped === false ? 'yellow' : 'unset'}
                    // icon={<FiFrown size={30} color="red" />}
                    >
                      <Text fontSize={33}> 🤮 </Text>
                    </Button>
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme='success'
                    onClick={() => {
                      onModalClose();
                      // prevent react from clearing the inputs before the form submit is handled
                      setTimeout(() => {
                        clearInputs();
                        navigate("/resources");
                      }, 0);
                      // props.onBackClick();
                    }}
                    type="submit"
                    isDisabled={typeof itHelped === "undefined"}
                    mr={3}
                  >
                    {t("submit")}
                  </Button>
                  <Button colorScheme='warning' onClick={onModalClose}>{t("cancel")}</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </Flex>
    </Flex>
  );
}

function FrontPage() {
  const [addItemClicked, setAddItemClicked] = useState(false);
  const [items, setItems] = useState<ISafetyNetItem[]>([]);
  const mobile = useMobile();
  const { t } = useTranslation();
  const displayIcon = (iconType: string) => {
    return items.some((item) => {
      if (item.type === iconType) {
        return true;
      }
      return false;
    });
  };
  const renderItem = (item: ISafetyNetItem) => {
    return (
      <Flex marginLeft={5}>
        <li>{item.name}</li>
      </Flex>
    );
  };
  // to fetch data everytime the front page is loaded
  useEffect(() => {
    const baseUrl = "http://127.0.0.1:4010"; // localhost + port as base url
    const fetchItemsWrapper = async () => {
      const fetchItems = await fetch(`${baseUrl}/safetyNet`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test",
        },
      });
      // const fetchItems = await fetch('https://motivator.api.live.mindtastic.lol/safetyNet')
      if (fetchItems.ok) {
        console.log("Entered first if");
        const responseData: ISafetyNetItem[] = await fetchItems.json();
        console.log(responseData);
        if (responseData.length > 0) {
          console.log("Entered second if");
          setItems(responseData);
        }
      } else {
        console.log("Failed to fetch safety net items.");
      }
    };
    fetchItemsWrapper();
  }, []);

  if (items) {
    return (
      <Suspense fallback="Loading...">
        <Flex direction="column" alignItems='center'>
          {!addItemClicked && (
            <Text fontSize={20} marginBottom={5} textAlign='center'>
              {t("welcome")}
            </Text>
          )}
          {!addItemClicked && (
            <>
              <Flex
                // className="container"
                backgroundColor="white"
                borderRadius={170}
                paddingBottom={5}
              >
                <ul className="circle-container">
                  {/* <li>
                    {displayIcon("relaxation") && (
                      <Popover>
                        <PopoverTrigger>
                          <button className="btn">
                            <Text fontSize={40}>🦥</Text>
                          </button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent bg="tomato" color="white">
                            <PopoverArrow bg="tomato" />
                            <PopoverCloseButton />
                            <PopoverHeader fontWeight="semibold">
                              Relaxation
                            </PopoverHeader>
                            <PopoverBody>
                              <Text>
                                {items
                                  .filter(
                                    (item) => item.type === "relaxation"
                                  )
                                  .map(renderItem)}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    )}
                  </li> */}
                   <li>
                    {displayIcon("other") && (
                      <Popover>
                        <PopoverTrigger>
                          <button className="btn">
                            <Text fontSize={40}>👩‍👦</Text>
                          </button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent bg="tomato" color="white">
                            <PopoverArrow bg="tomato" />
                            <PopoverCloseButton />
                            <PopoverHeader>Other</PopoverHeader>
                            <PopoverBody>
                              <Text>
                                {items
                                  .filter((item) => item.type === "people")
                                  .map(renderItem)}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    )}
                  </li>
                  <li>
                    {displayIcon("other") && (
                      <Popover>
                        <PopoverTrigger>
                          <button className="btn">
                            <Text fontSize={40}>🤾🏾</Text>
                          </button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent bg="tomato" color="white">
                            <PopoverArrow bg="tomato" />
                            <PopoverCloseButton />
                            <PopoverHeader>Other</PopoverHeader>
                            <PopoverBody>
                              <Text>
                                {items
                                  .filter((item) => item.type === "activities")
                                  .map(renderItem)}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    )}
                  </li>
                  <li>
                    {displayIcon("pet") && (
                      <Popover>
                        <PopoverTrigger>
                          <button className="btn">
                            <Text fontSize={40}>🐾</Text>
                          </button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent bg="tomato" color="white">
                            <PopoverArrow bg="tomato" />
                            <PopoverCloseButton />
                            <PopoverHeader>Pets</PopoverHeader>
                            <PopoverBody>
                              <Text>
                                {items
                                  .filter((item) => item.type === "pets")
                                  .map(renderItem)}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    )}
                  </li>
                  <li>
                    {displayIcon("pet") && (
                      <Popover>
                        <PopoverTrigger>
                          <button className="btn">
                            <Text fontSize={40}>💪🏽</Text>
                          </button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent bg="tomato" color="white">
                            <PopoverArrow bg="tomato" />
                            <PopoverCloseButton />
                            <PopoverHeader>Pets</PopoverHeader>
                            <PopoverBody>
                              <Text>
                                {items
                                  .filter((item) => item.type === "personalStrengths")
                                  .map(renderItem)}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    )}
                  </li>
                  {/* <li>
                    {displayIcon("situationControl") && (
                      <Popover>
                        <PopoverTrigger>
                          <button className="btn">
                            <Text fontSize={40}>🌈</Text>
                          </button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent bg="tomato" color="white">
                            <PopoverArrow bg="tomato" />
                            <PopoverCloseButton />
                            <PopoverHeader>Situation Control</PopoverHeader>
                            <PopoverBody>
                              <Text>
                                {items
                                  .filter(
                                    (item) => item.type === "situationControl"
                                  )
                                  .map(renderItem)}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    )}
                  </li> */}
                  <li>
                    {displayIcon("other") && (
                      <Popover>
                        <PopoverTrigger>
                          <button className="btn">
                            <Text fontSize={40}>💭</Text>
                          </button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent bg="tomato" color="white">
                            <PopoverArrow bg="tomato" />
                            <PopoverCloseButton />
                            <PopoverHeader>Other</PopoverHeader>
                            <PopoverBody>
                              <Text>
                                {items
                                  .filter((item) => item.type === "other")
                                  .map(renderItem)}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    )}
                  </li>
                </ul>
              </Flex>
              {!addItemClicked && (
                <Button
                  mt={5}
                  mb={mobile ? '25px' : 'unset'}
                  colorScheme="primary"
                  aria-label="Add item"
                  leftIcon={<AddIcon />}
                  onClick={() => setAddItemClicked(true)}
                >
                  Add item
                </Button>
              )}
            </>
          )}
          {addItemClicked && (
            <AddItemView />
          )}
        </Flex>
      </Suspense>
    );
  } else {
    console.log("NO ENTRIES");
    return (
      <Flex>
        <Sidebar />
      </Flex>
    );
  }
}

export default function SafetyNet() {
  const { t } = useTranslation();
  return <ContentWrapper headerProps={{ text: t('safetyNet') }}>
    <FrontPage />
  </ContentWrapper>

}
