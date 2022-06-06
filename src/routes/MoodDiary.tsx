import React, {useEffect, useState} from "react";
import Calendar from 'react-calendar';
import moment from 'moment';
import "react-calendar/dist/Calendar.css";
import "./../assets/css/Calendar.css";
import Sidebar from "../components/Sidebar"
import ChooseMoodForm from "../components/ChooseMood";

import {
ChakraProvider,
theme,
Flex,
Center,
Icon,
Button,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalCloseButton,
ModalBody,
useDisclosure
} from "@chakra-ui/react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface IEntry {
    type: string;
    descripton: string;
    timestamp: string;
}

interface IEntryPageProps {
    entry: IEntry;
}

const sortEntriesByDate = (x: IEntry, y: IEntry) => {
    return x.timestamp.localeCompare(y.timestamp);
}

function SetMood() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Button onClick={onOpen}>Set Mood</Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>How are you feeling today?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <ChooseMoodForm />
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}


var ReactCalendar = () => {
    const [date, setDate] = useState (new Date());
    const [entries, setEntries] = useState<IEntry[]>();

    const onChange = () => {
        setDate(date)
    };

    useEffect(() => {
        const baseUrl = "http://127.0.0.1:4010"; // localhost + port as base url
        const userId = 1; // random entry iid
        const fetchEntriesWrapper = async () => {
            const fetchEntries = await fetch(`${baseUrl}/diary/${userId}`);
            if (fetchEntries.ok) {
                const entriesData = await fetchEntries.json();
                if (entriesData.length > 0) {
                    console.log(entriesData);
                    setEntries(entriesData.sort(sortEntriesByDate));
                }
            } else {
                console.log("Failed to fetch diary entries.");
            }
        }
        fetchEntriesWrapper();
    }, []);

    if (entries) {
        console.log(entries)
        return (
            <div>
                <Calendar 
                onChange={onChange} 
                view={"month"} 
                value = {date}
                onClickDay={(value1, event) => {
                    console.log("clicked a day!")
                }}
                tileContent={({ date }) => {
                    for(let cur_entry of entries) {
                        if (cur_entry.timestamp.split('T')[0] === moment(date).format("YYYY-MM-DD")){
                            if(cur_entry.type === "positive") {
                                return  <p>😄</p>;
                            } else if (cur_entry.type === "neutral") {
                                return  <p>😐</p>;
                            } else {
                                return <p>😞</p>;
                            }
                        }
                    }
                    return null
                }}
                prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
                nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
                />
            </div>
        );
    } else {
        console.log("NO ENTRIES");
        return <div></div>
    }

   
};

export default function MoodDiary() {
    
    return (
        <ChakraProvider theme={theme}>
            <Flex>
                <Sidebar />
                <Center fontSize="xl"
                    margin='auto'
                    alignItems='flex-start'
                    flexDirection='column'
                >
                    <ReactCalendar />
                    <SetMood />
                </Center>
            </Flex>
        </ChakraProvider>
    );
}
