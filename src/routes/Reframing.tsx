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
import { AspectRatio, useColorModeValue } from "@chakra-ui/react";
import reframing from "../reframing.png"
import { useForm, SubmitHandler } from "react-hook-form";
import { stringify } from "querystring";
import { networkInterfaces } from "os";
import axios from "axios";
import { ContentWrapper, useMobile } from "../components/utils";

interface IReframingItem {
  situations: string[];
}

export default function New() {
  const navigate = useNavigate();
  const mobile = useMobile();
  const { register, handleSubmit, setValue } = useForm<IReframingItem>();
  const onSubmit: SubmitHandler<IReframingItem> = (data) =>
    axios.post(`http://127.0.0.1:4010/safetyNet/1`, data);

  return (
    <ContentWrapper headerProps={{ text: 'Reframing', image: reframing }}>
      <Flex flexDirection="column" alignItems='center'>
        <Text fontSize={20} mb={10} textAlign='center'>
          Which situation is bothering you at the moment? {"\n"}
          Maybe there is more than one, we are going to go through each
          situaion step by step.
        </Text>
        
        <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth: '100%'}}>
          <Flex flexDirection='column'>
          <Stack spacing={5}>
            <Input
              {...register(`situations.${0}`)}
              placeholder="Situation 1"
              focusBorderColor={useColorModeValue("neutral.400", "neutral.100")}
              // size="lg"
            />
            <Input
              {...register(`situations.${1}`)}
              placeholder="Situation 2"
              focusBorderColor={useColorModeValue("neutral.400", "neutral.100")}
              // size="lg"
            />
            <Input
              {...register(`situations.${2}`)}
              placeholder="Situation 3"
              focusBorderColor={useColorModeValue("neutral.400", "neutral.100")}
              // size="lg"
            />
            <Input
              {...register(`situations.${3}`)}
              placeholder="Situation 4"
              focusBorderColor={useColorModeValue("neutral.400", "neutral.100")}
              // size="lg"
            />
          </Stack>
          
              <Button
                mt={10}
                colorScheme="success"
                type="submit"
                onClick={() => navigate("/resources/reframing1")}
                whiteSpace={mobile ? 'initial' : 'unset'}
              >
                These are all the situations that are bothering me at the
                moment
              </Button>
              </Flex>
        </form>
      </Flex>
    </ContentWrapper>
  );
}
