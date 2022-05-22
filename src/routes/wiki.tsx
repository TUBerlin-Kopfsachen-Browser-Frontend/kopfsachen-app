import { useEffect, useState } from "react"
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
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"

// api response format as interface
interface IEntry {
    id: string;
    title: string;
    contents: {
        content: string;
        type: string;
    }[];
}

interface IEntryPageProps {
    entry: IEntry;
}

function EntryPage(props: IEntryPageProps) {
    return (
        <h1>
            {props.entry.title}
        </h1>
    );
}

function FrontPage() {
    const [entryClicked, setEntryClicked] = useState(false);
    const [entryToDisplay, setEntryToDisplay] = useState<number>();
    const [entries, setEntries] = useState<IEntry[]>();
    // to fetch data everytime the front page is loaded
    useEffect(() => {
        const baseUrl = "http://127.0.0.1:4010"; // localhost + port as base url
        const wikiEntryId = "Lorem ipsum"; // random entry id
        const fetchEntriesWrapper = async () => {
            const fetchEntries = await fetch(`${baseUrl}/wiki/:${wikiEntryId}`);
            if (fetchEntries.ok) {
                const entriesData = await fetchEntries.json();
                if (entriesData.length > 0) {
                    setEntries(entriesData);
                }
            } else {
                console.log("Failed to fetch wiki entries.");
            }
        }
        fetchEntriesWrapper();

    }, []);
    const handleClickOnEntry = (index: number) => {
        setEntryClicked(true);
        setEntryToDisplay(index);
    }
    if (!entryClicked) {
        return (
            <Flex>
                <Sidebar />
                <Center fontSize="xl"
                    margin='auto'
                    alignItems='flex-start'
                    flexDirection='column'
                >
                    {entries && <>
                        {entries.map(({ id, title }, index) => (
                            <Button
                                key={id}
                                variant='link'
                                onClick={() => handleClickOnEntry(index)}
                            >
                                {title}
                            </Button>
                        ))}
                    </>}
                </Center>
            </Flex>

        );
    } else if (typeof entries !== 'undefined' && typeof entryToDisplay !== 'undefined') {
        return (
            <Flex>
                <Sidebar />
                <Center fontSize="xl"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translateY(-50%, -50%)"
                >
                    <EntryPage entry={entries[entryToDisplay]} />
                </Center>
            </Flex>
        );
    } else {
        return (
            <Flex>
                <Sidebar />
            </Flex>
        );
    }
}

export default function Wiki() {
    return (
        <ChakraProvider theme={theme}>
            <FrontPage />
        </ChakraProvider>
    );
}