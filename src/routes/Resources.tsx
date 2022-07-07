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
            emoji={"🥅"}
            emojiaria="net"
            link="/resources/safetynet"
          />
          <ResourceCard
            title="Optimism"
            image="/sun_large.png"
            emoji={"🌞"}
            emojiaria="sun"
            link="/resources/optimism"
          />
          <ResourceCard
            title="Reframing"
            image="/reframing_large.png"
            emoji={"🪟"}
            emojiaria="window"
            link="/resources/reframing"
          />
          <ResourceCard
            title="Social Support"
            image="/socialsupport.png"
            emoji={"🫂"}
            emojiaria="hug"
            link="/resources/socialsupport"
          />
          <ResourceCard
            title="Situation Control"
            image="/socialsupport.png" //TODO
            emoji={"🎛️"}
            emojiaria="control panel"
            link="/resources/socialsupport" //TODO
          />
        </Wrap>
      </Center>
    </ContentWrapper>
  );
}
