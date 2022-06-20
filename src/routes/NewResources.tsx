import { useEffect, useState } from "react";
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
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Motivatiors() {
  const navigate = useNavigate();

  return (
    <Flex flexDirection="column">
      <Sidebar />
      <Button
        marginLeft={270}
        colorScheme="teal"
        variant="ghost"
        onClick={() => navigate("/resources")}
      >
        ← Back
      </Button>

      <Flex
        flexDirection="column"
        position="absolute"
        top="5vh"
        left="55vw"
        transform="translate(-50%, -10%)"
        maxWidth="800px"
      >
        <Stack>
          <Box>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text color={"green.400"} align="center" pt={"80px"}>
                My Resources
              </Text>
            </Heading>

            <Text
              fontSize={{ base: "md", lg: "2xl" }}
              color={"gray.500"}
              pt={"60px"}
              align="center"
            >
              Which one of the new resources do you want to try today?
            </Text>
          </Box>

          <Box width="100%" height={12}>
            <FormControl as="fieldset">
              <RadioGroup defaultValue="Itachi" pt={"40px"}>
                <HStack spacing="200px">
                  <Radio value="happy">
                    <Text fontSize={100}> 😄</Text>
                  </Radio>

                  <Radio value="neutral">
                    <Text fontSize={100}> 😐</Text>
                  </Radio>

                  <Radio value="sad">
                    <Text fontSize={100}> 😞</Text>
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </Box>

          <Text
            pt={"160px"}
            fontSize={{ base: "md", lg: "2xl" }}
            color={"gray.300"}
            align="center"
          >
            Reframing is about checking your own assessment of the situation
            and, if necessary, coming to a different interpretation.
          </Text>

          <Center>
            <Button
              height="48px"
              width="300px"
              textAlign="right"
              size="lg"
              bg={"green.400"}
              top={8}
              onClick={() => navigate("/reframing")}
            >
              Let's go!
            </Button>
          </Center>
        </Stack>
      </Flex>
    </Flex>
  );
}
