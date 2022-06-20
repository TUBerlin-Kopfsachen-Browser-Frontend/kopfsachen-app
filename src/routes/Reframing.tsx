import * as React from "react";
import {
  Icon,
  ChakraProvider,
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
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AspectRatio } from "@chakra-ui/react";

export default function New() {
  const navigate = useNavigate();

  return (
    <Flex flexDirection="column">
      <Sidebar />
      <Button
        marginLeft={270}
        colorScheme="teal"
        variant="ghost"
        onClick={() => navigate("/newresources")}
      >
        ← Back
      </Button>

      <Flex
        flexDirection="column"
        position="absolute"
        top="5vh"
        left="50vw"
        transform="translate(-50%, -10%)"
        maxWidth="800px"
      >
        <Stack>
          <Box>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text color={"green.400"} pl={"370px"} pt={"80px"}>
                Reframing
              </Text>
            </Heading>

            <Text
              fontSize={{ base: "md", lg: "4xl" }}
              color={"white"}
              pt={"90px"}
              pl={"300px"}
            >
              Find out what's behind it!
            </Text>
          </Box>

          <Stack>
            <AspectRatio
              maxW="560px"
              ratio={1}
              pt={"200px"}
              ml={"230px"}
              pr={"580px"}
            >
              <iframe
                title="reframe"
                src="https://www.youtube-nocookie.com/embed/sOwtIkAO3ZI"
                allowFullScreen
              />
            </AspectRatio>
          </Stack>

          <Stack spacing={8} direction="row" align="center"></Stack>
          <Center>
            <Stack direction="row" spacing={20} pl={"180px"} pt={"80px"}>
              <Button colorScheme="teal" variant="solid" size="lg">
                Choose another strategy
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                size="lg"
                onClick={() => navigate("/reframing1")}
              >
                I want to practice that
              </Button>
            </Stack>
          </Center>
        </Stack>
      </Flex>
    </Flex>
  );
}
