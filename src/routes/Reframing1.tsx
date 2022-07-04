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
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AspectRatio } from "@chakra-ui/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { stringify } from "querystring";
import { networkInterfaces } from "os";
import axios from "axios";

interface IReframingItem {
  situations: string[];
}

export default function New() {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<IReframingItem>();
  const onSubmit: SubmitHandler<IReframingItem> = (data) =>
    axios.post(`http://127.0.0.1:4010/safetyNet/1`, data);

  return (
    <Flex direction="column">
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
        left="55vw"
        transform="translate(-50%, -10%)"
        maxWidth="800px"
      >
        <Stack>
          <Center>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text color={"green.400"} pt={"50px"}>
                Reframing
              </Text>
            </Heading>
          </Center>

          <Stack>
            <Center>
              <Text
                fontSize={{ base: "md", lg: "2xl" }}
                color={"white"}
                pt={"50px"}
              >
                Which Situation is bothering you at the moment? {"\n"}
                Maybe there is more than one, we are going to go through each
                situaion step by step.
              </Text>
            </Center>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} pt={"1px"}>
              <Input
                {...register(`situations.${0}`)}
                placeholder="Situation 1"
                size="lg"
              />
              <Input
                {...register(`situations.${1}`)}
                placeholder="Situation 2"
                size="lg"
              />
              <Input
                {...register(`situations.${2}`)}
                placeholder="Situation 3"
                size="lg"
              />
              <Input
                {...register(`situations.${3}`)}
                placeholder="Situation 4"
                size="lg"
              />
            </Stack>

            <Center>
              <Stack direction="row" spacing={20} pt={"50px"}>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  size="lg"
                  type="submit"
                  onClick={() => navigate("/resources/reframing2")}
                >
                  These are all the situation that are bothering me at the
                  moment
                </Button>
              </Stack>
            </Center>
          </form>
        </Stack>
      </Flex>
    </Flex>
  );
}
