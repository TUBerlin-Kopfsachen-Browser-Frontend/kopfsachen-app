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
import { ContentWrapper, useMobile } from "../components/utils";

export default function New() {
  const navigate = useNavigate();
  const mobile = useMobile();
  return (
    <ContentWrapper headerProps={{text: 'Reframing'}}>
    <Flex flexDirection='column'>
      {/* <Button
            marginLeft={270}
            colorScheme="teal"
            variant="ghost"
            onClick={() => navigate("/newresources")}
            >
              ← Back
            </Button> */}
      <Text fontSize={20} mb={5}>
        Find out what's behind it!
      </Text>
      <Stack>
        <AspectRatio
          ratio={16/9}
        >
          <iframe
            title="reframe"
            src="https://www.youtube-nocookie.com/embed/sOwtIkAO3ZI"
            allowFullScreen
          />
        </AspectRatio>
      </Stack>
      <Flex flexDirection="row" justifyContent='space-evenly'>
          <Button colorScheme="warning" mr={3} mt={10} whiteSpace={mobile ? 'initial' : 'unset'}>
            Choose another strategy
          </Button>
          <Button
            colorScheme="success"
            onClick={() => navigate("/resources/reframing1")}
            whiteSpace={mobile ? 'initial' : 'unset'}
            mt={10}
          >
            I want to practice that
          </Button>
        </Flex>
    </Flex>
    </ContentWrapper>
  );
}
