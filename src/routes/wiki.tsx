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
    Heading,
    Image,
    Stack,
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import bookshelf from "../bookshelf.png"

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

interface IContent {
    type: string;
    content: string;
}

const renderContentElement = (contentElement: IContent, index: number, contents: IContent[]) => {
    if (contentElement.type === 'text') {
        return (
            <Link href={contents[index].content} color='teal.500' isExternal>
                {contents[index].content.concat(' ')}
            </Link>
        );
    }
    return contents[index].content.concat(' ');
}

// should display entry that has been clicked
function EntryPage(props: IEntryPageProps) {
    return (
        <Flex flexDirection='column'>
            <img src={bookshelf} alt='book shelf' width='400px'></img>
            <Flex>
                <Heading marginBottom={5} fontSize='3xl'>
                    {props.entry.title}
                </Heading>
            </Flex>
            <Text>
                {(props.entry.contents).map(renderContentElement)}
            </Text>
        </Flex>
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

    const renderEntry = (entry: IEntry, index: number, entries: IEntry[]) => {
        let displayInitial = (index === 0 || entries[index - 1].title[0]?.toLowerCase() !== entries[index].title[0]?.toLowerCase());
        return (
            <Flex key={entry.id} flexDirection='column'>
                <Heading marginTop={4} size='I'>
                    {displayInitial && entries[index].title[0]?.toUpperCase()}
                </Heading>
                <Link
                    marginLeft={2}
                    variant='link'
                    onClick={() => handleClickOnEntry(entry)}
                    fontSize='md'
                >
                    {entry.title}
                </Link>
            </Flex>
        );
    }

    if (!entryClicked) {
        return (
            <Flex>
                <Sidebar />
                <Flex
                    flexDirection='column'
                    position='absolute'
                    top='20vh'
                    left='50vw'
                    transform="translate(-50%, -0%)"
                    maxWidth='800px'
                >
                    <Heading marginBottom={10}> Wiki </Heading>
                    <img src={bookshelf} alt='book shelf' width='400px'></img>
                    <Flex
                        fontSize='xl'
                        alignItems='flex-start'
                        flexDirection='column'
                        paddingBottom={100}
                    // paddingLeft={130}
                    >
                        {entries && entries.map(renderEntry)}
                    </Flex>
                </Flex>
            </Flex>

        );
    } else if (typeof entries !== 'undefined' && typeof entryToDisplay !== 'undefined') {
        return (
            <Flex>
                <Sidebar />
                <Flex
                    fontSize='large'
                    position='absolute'
                    top='20vh'
                    left='50vw'
                    transform="translate(-50%, -0%)"
                    maxWidth='800px'
                >
                    <EntryPage entry={entryToDisplay} />
                </Flex>
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