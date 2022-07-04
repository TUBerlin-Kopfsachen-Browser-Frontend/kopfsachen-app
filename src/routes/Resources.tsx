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
} from "@chakra-ui/react";

import Sidebar from "../components/Sidebar";
import meditation from "../../src/meditation.jpg";
import { useNavigate } from "react-router-dom";
import Logo from "../../src/net.png";
import Logo1 from "../../src/situationskontrolle.png";
import { ContentWrapper, Header } from "../components/utils";

interface IEntry {
  id: string;
  type: string;
  headline: string;
  description: string;
  textContents: string[];
  mediaContents: {
    format: "string";
    url: "string";
  }[];
  userInputForm: string;
  motivatorId: string;
  timestamp: string;
  results: string[];
}

interface IEntryPageProps {
  entry: IEntry;
}

interface IContent {
  format: string;
  url: string;
}

function Motivator() {
  const [navSize, changeNavSize] = useState("large");
  const navigate = useNavigate();
  const [entryToDisplay, setEntryToDisplay] = useState<IEntry>();
  const [entries, setEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    const baseUrl = "http://127.0.0.1:4010"; // localhost + port as base url
    const userId = 1; // random entry id
    const fetchEntriesWrapper = async () => {
      const fetchEntries = await fetch(`${baseUrl}/motivator/${userId}`);
      if (fetchEntries.ok) {
        const entriesData = await fetchEntries.json();
        if (entriesData.length > 0) {
          setEntries(entriesData); // sort entries by title before storing
        }
      } else {
        console.log("Failed to fetch wiki entries.");
      }
    };
    fetchEntriesWrapper();
  }, []);

  return <p></p>;
}

export default function Resources() {
  const navigate = useNavigate();

  return (
    <ContentWrapper headerProps={{ text: 'My Resources' }}>
      <Flex flexDirection='column' alignItems='center'>
        <Text fontSize={20} textAlign='center'>
          You have already gatherd so many resources.
        </Text>
        <Text fontSize={20} textAlign='center'>
        If you want to work on
        your already existing ones, click on the button below.
        </Text>
          <Button
            // textAlign="center"
            // rounded={"full"}
            colorScheme='primary'
            size="lg"
            onClick={() => navigate("/resources/new")}
            mt={100}
          >
            Discover New Resources!
          </Button>
          <Stack direction="row" justifyContent='flex-start' mt={100}>
            <Button
              onClick={() => navigate("/resources/safetynet")}
              variant="ghost"
              size="lg"
            >
              Safety Net
              <Image margin={2} alt={"Logo"} objectFit={"cover"} src={Logo} />
            </Button>

            <Button variant="ghost" size="lg">
              Situtation control
              <Image margin={2} alt={"Logo1"} objectFit={"cover"} src={Logo1} />
            </Button>
          </Stack>
        {/* <Motivator /> */}
      </Flex>
    </ContentWrapper>
  );
}
