import { useEffect, useRef, useState, Suspense } from "react";
import {
  Image,
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

import i18n, { t } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import "./../assets/css/neutral.css";

export default function Neutral1() {
  return (
    <ChakraProvider theme={theme}>
      <Stack direction={["row"]} spacing="275px">
        <Sidebar />
        <Box className="container">
          <Image src="logo192.png" alt="Snow"></Image>
          <Button className="btn1">Button</Button>
          <Button className="btn2">Button</Button>
        </Box>
      </Stack>
    </ChakraProvider>
  );
}
