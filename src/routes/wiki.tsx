import { useEffect, useState } from "react";
import {
  ChakraProvider,
  Text,
  Link,
  theme,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Skeleton,
  Stack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
import Sidebar from "../components/Sidebar";
import { ContentWrapper, Header, useMobile } from "../components/utils";

// api response format as interface
interface IEntry {
  // id: string;
  title: string;
  // contents: {
  //     content: string;
  //     type: string;
  // }[];
  content: string[];
}

interface IEntryPageProps {
  entry: IEntry;
}

// interface IContent {
//     type: string;
//     content: string;
// }

const renderContentElement = (
  contentElement: string,
  index: number,
  contents: string[]
) => {
  // if (contentElement.type === 'text') {
  //     return (
  //         <Link href={contents[index].content} color='teal.500' isExternal>
  //             {contents[index].content.concat(' ')}
  //         </Link>
  //     );
  // }
  return contents[index].concat(" ");
};

// should display entry that has been clicked
function EntryPage(props: IEntryPageProps) {
  return (
    <Flex flexDirection="column">
      <img src={"/bookshelf.png"} alt="book shelf" width="400px"></img>
      <Flex>
        <Heading marginBottom={5} fontSize="3xl">
          {props.entry.title}
        </Heading>
      </Flex>
      <Text>{props.entry.content.map(renderContentElement)}</Text>
    </Flex>
  );
}

const sortEntriesByTitle = (x: IEntry, y: IEntry) => {
  return x.title.localeCompare(y.title);
};

function FrontPage() {
  const [entryToDisplay, setEntryToDisplay] = useState<IEntry>();
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchIsActive, setSearchIsActive] = useState(false);
  const mobile = useMobile();
  const focusBorderColorScheme = useColorModeValue(
    "neutral.400",
    "neutral.100"
  );

  // to fetch data everytime the front page is loaded
  useEffect(() => {
    const baseUrl = "http://127.0.0.1:4010"; // localhost + port as base url
    // const wikiEntryId = "Lorem ipsum"; // random entry id
    const fetchEntriesWrapper = async () => {
      const fetchEntries = await fetch(`${baseUrl}/wiki`);
      if (fetchEntries.ok) {
        const entriesData = await fetchEntries.json();
        if (entriesData.length > 0) {
          setEntries(entriesData.sort(sortEntriesByTitle)); // sort entries by title before storing
        }
      } else {
        console.log("Failed to fetch wiki entries.");
      }
    };
    fetchEntriesWrapper();
  }, []);

  const handleClickOnEntry = (entry: IEntry) => {
    setEntryToDisplay(entry);
  };

  const renderEntry = (entry: IEntry, index: number, entries: IEntry[]) => {
    let displayInitial =
      index === 0 ||
      entries[index - 1].title[0]?.toLowerCase() !==
        entries[index].title[0]?.toLowerCase();
    return (
      <Flex key={entry.title[0].concat(`${index}`)} flexDirection="column">
        <Heading marginTop={4} size="I">
          {displayInitial && entries[index].title[0]?.toUpperCase()}
        </Heading>
        <Link
          marginLeft={2}
          variant="link"
          onClick={() => handleClickOnEntry(entry)}
          fontSize="md"
        >
          {entry.title}
        </Link>
      </Flex>
    );
  };

  const filterEntry = (entry: IEntry) => {
    return entry.title.toLowerCase().includes(searchInput.trim().toLowerCase());
  };

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    setSearchIsActive(true);
  }

  if (typeof entryToDisplay === "undefined") {
    // front page
    let filteredEntries = entries.filter(filterEntry).map(renderEntry);
    return (
      <Flex direction={"row"}>
        <Flex flexDirection="column" maxWidth="800px" margin="auto">
          <img src={"/bookshelf.png"} alt="book shelf" width="400px"></img>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="neutral.400" />}
            />
            <Input
              placeholder="Search for entries"
              focusBorderColor={focusBorderColorScheme}
              onChange={handleInput}
            />
          </InputGroup>
          <Flex
            fontSize="xl"
            alignItems="flex-start"
            flexDirection="column"
            paddingBottom={100}
          >
            {filteredEntries}
            {searchIsActive && filteredEntries.length === 0 && (
              <Text marginTop={5} fontSize="md">
                {" "}
                No entries found.{" "}
              </Text>
            )}
            {entries.length === 0 &&
              Array.apply(null, new Array(5)).map((_, i) => (
                <Skeleton
                  height="20px"
                  width="100%"
                  marginTop="10px"
                  key={-i}
                />
              ))}
          </Flex>
        </Flex>
      </Flex>
    );
  } else {
    // entry page
    return (
      <Flex>
        {!mobile && (
          <Button
            variant="ghost"
            flexShrink={0}
            marginRight={5}
            colorScheme="neutral"
            leftIcon={<ArrowBackIcon />}
            onClick={() => setEntryToDisplay(undefined)}
          >
            Back
          </Button>
        )}
        <EntryPage entry={entryToDisplay} />

        {mobile && (
          <Button
            variant="ghost"
            flexShrink={0}
            marginRight={5}
            colorScheme="blackAlpha"
            leftIcon={<ArrowBackIcon />}
            onClick={() => setEntryToDisplay(undefined)}
          >
            Back
          </Button>
        )}
      </Flex>
    );
  }
}

export default function Wiki() {
  return (
    <ContentWrapper headerProps={{ text: "Wiki" }}>
      <FrontPage />
    </ContentWrapper>
  );
}
