import * as React from "react";
import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Center,
  Button,
  Heading,
  Image,
  Stack,
  useBreakpointValue,
  Wrap,
} from "@chakra-ui/react";

import Sidebar from "../components/Sidebar";
import meditation from "../../src/meditation.jpg";
import { useNavigate } from "react-router-dom";
import Logo from "../../src/net.png";
import Logo1 from "../../src/situationskontrolle.png";
import { ContentWrapper, Header } from "../components/utils";
import ResourceCard from "../components/ResourceCard";

export default function Resources() {
  const navigate = useNavigate();

  return (
    <ContentWrapper headerProps={{ text: "My Resources" }}>
      <Center>
        <Wrap spacing="30px" align="center">
          <ResourceCard
            title="Saftey Net"
            image="/net_large.png"
            emoji={"🕸️"}
            emojiaria="spider web"
            link="/resources/safetynet"
          />
          <ResourceCard
            title="Optimism"
            image="/sun_large.png"
            emoji={"🌻"}
            emojiaria="sunflower"
            link="/resources/optimism-preview"
          />
          <ResourceCard
            title="Reframing"
            image="/reframing_large.png"
            emoji={"🪞"}
            emojiaria="mirror"
            link="/resources/reframing-preview"
          />
          <ResourceCard
            title="Social Support"
            image="/socialsupport.png"
            emoji={"🫂"}
            emojiaria="people hugging"
            link="/resources/socialsupport-preview"
          />
          <ResourceCard
            title="Situation Control"
            image="/socialsupport.png" //TODO
            emoji={"🎮"}
            emojiaria="controller"
            link="/resources/socialsupport" //TODO
          />
        </Wrap>
      </Center>
    </ContentWrapper>
  );
}
