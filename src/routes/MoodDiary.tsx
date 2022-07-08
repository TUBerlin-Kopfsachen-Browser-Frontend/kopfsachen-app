import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./../assets/css/Calendar.css";
import Sidebar from "../components/Sidebar";
import ChooseMoodForm from "../components/ChooseMood";

import {
  ChakraProvider,
  theme,
  Stack,
  Box,
  Flex,
  Center,
  Square,
  Grid,
  GridItem,
  Text,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  HStack,
  Heading,
  color,
} from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FieldValues } from "react-hook-form";
import { ContentWrapper, Header } from "../components/utils";
import { AddIcon } from "@chakra-ui/icons";

interface IEntry {
  id: string;
  mood_day: string;
  mood_descr: string;
  mood_type: string;
}

interface IEntryPageProps {
  entry: IEntry;
}

const sortEntriesByDate = (x: IEntry, y: IEntry) => {
  return x.mood_day.localeCompare(y.mood_day);
};
async function onSubmit(values: FieldValues) {
  const baseUrl = "http://127.0.0.1:4010"; // localhost + port as base url
  const response = await fetch(`${baseUrl}/diary`, {
    method: "POST",
    body: JSON.stringify(values, null, 2),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer test",
    },
  });
  if (response.ok) {
    console.log("Submitted diary entry!");
  } else {
    console.log("Failed to post diary entry.");
  }
}

function SetMood({ onSubmit }: { onSubmit: (values: FieldValues) => void }) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        // size={"lg"}
        // height="70px"
        colorScheme="primary"
        color="white"
        leftIcon={<AddIcon />}
        maxWidth="345px"
      >
        Set Mood
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How are you feeling today?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChooseMoodForm
              onSubmit={(values: FieldValues) => {
                onSubmit(values);
                onToggle();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const fetchEntriesWrapper = async () => {
  const baseUrl = "http://127.0.0.1:4010"; // localhost + port as base url

  const fetchEntries = await fetch(`${baseUrl}/diary`, {
    headers: { Authorization: "Bearer test" },
  });
  if (fetchEntries.ok) {
    const entriesData = await fetchEntries.json();
    if (entriesData.length > 0) {
      console.log(entriesData);
      return entriesData.sort(sortEntriesByDate);
    }
  } else {
    console.log("Failed to fetch diary entries.");
    return undefined;
  }
};

var ReactCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState<IEntry[]>();
  const [sidebar, setSidebar] = useState(false);

  const onChange = () => {
    setDate(date);
  };

  useEffect(() => {
    fetchEntriesWrapper().then(setEntries);
  }, []);

  if (entries) {
    console.log(entries);
    return (
      <Flex flexDirection="column">
        <Stack spacing={10}>
          <Calendar
            onChange={onChange}
            view={"month"}
            value={date}
            onClickDay={(value1, event) => {
              console.log("clicked a day!");
            }}
            tileContent={({ date }) => {
              for (let cur_entry of entries) {
                if (
                  cur_entry.mood_day.split("T")[0] ===
                  moment(date).format("YYYY-MM-DD")
                ) {
                  if (cur_entry.mood_type === "positive") {
                    return <p>😄</p>;
                  } else if (cur_entry.mood_type === "neutral") {
                    return <p>😐</p>;
                  } else {
                    return <p>😞</p>;
                  }
                }
              }
              return null;
            }}
            prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
            nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
          />

          <SetMood
            onSubmit={(values) => {
              onSubmit(values).then(() => {
                fetchEntriesWrapper().then(setEntries);
              });
            }}
          />
        </Stack>
      </Flex>
    );
  } else {
    console.log("NO ENTRIES");
    return <div></div>;
  }
};

export default function MoodDiary() {
  return (
    <ContentWrapper headerProps={{ text: "Mood Diary" }}>
      <ReactCalendar />
    </ContentWrapper>
  );
}
