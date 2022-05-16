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
    Spacer,
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

// should display entry that has been clicked
function EntryPage(props: IEntryPageProps) {
    return (
        <h1>
            {props.entry.title}
        </h1>
    );
}

const sortEntriesByTitle = (x: IEntry, y: IEntry) => {
    return x.title.localeCompare(y.title);
}

function FrontPage() {
    const [entryClicked, setEntryClicked] = useState(false);
    const [entryToDisplay, setEntryToDisplay] = useState<IEntry>();
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
                    setEntries(entriesData.sort(sortEntriesByTitle)); // sort entries by title before storing
                }
            } else {
                console.log("Failed to fetch wiki entries.");
            }
        }
        fetchEntriesWrapper();

    }, []);

    const handleClickOnEntry = (entry: IEntry) => {
        setEntryClicked(true);
        setEntryToDisplay(entry);
    }

    const renderEntry = (entry: IEntry, index: number, array: IEntry[]) => {
        let printInitial = (index === 0 || array[index - 1].title[0]?.toLowerCase() !== array[index].title[0]?.toLowerCase());
        return (
            <Flex key={entry.id} flexDirection='column'>
                {printInitial && array[index].title[0]?.toUpperCase()}
                <Button
                    marginLeft={2}
                    variant='link'
                    onClick={() => handleClickOnEntry(entry)}
                >
                    {entry.title}
                </Button>
            </Flex>
        );
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
                    {entries && entries.map(renderEntry)}
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
                    <EntryPage entry={entryToDisplay} />
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