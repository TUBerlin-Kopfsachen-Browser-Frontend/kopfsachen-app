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
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import Logoo from "../public/net.png"


import { Input } from '@chakra-ui/react'
import { Stack, HStack} from '@chakra-ui/react'
import { stringify } from "querystring"
import { networkInterfaces } from "os"
import axios from "axios"


// api response format as interface
interface IEntry {
    name: string;
    type: string;
    strategies: {
        content: string;
    }[];
}

interface IEntryPageProps {
    entry: IEntry;
}



function FrontPage() {
    const [entryClicked, setEntryClicked] = useState(false);
    const [entryToDisplay, setEntryToDisplay] = useState<IEntry>();
    const [entries, setEntries] = useState<IEntry[]>();

    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [name3, setName3] = useState("");

    const baseUrl = "http://127.0.0.1:4010";
    
       
    // to fetch data everytime the front page is loaded
    
    useEffect(() => {
         // localhost + port as base url
        
        const safetyNetEntryId = "laboris Excepteur sunt id"; // random entry id
        const fetchEntriesWrapper = async () => {
            const fetchEntries = await fetch(`${baseUrl}/safetyNet/1`);
            if (fetchEntries.ok) {
                const entriesData = await fetchEntries.json();
                if (entriesData.length > 0) {
                    setEntries(entriesData); // sort entries by title before storing
                }
            } else {
                console.log("Failed to fetch wiki entries.");
            }
        }
        fetchEntriesWrapper();

    
    }, []);
    

    
    // useEffect(() => {
    //     // POST request using fetch inside useEffect React hook
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    //     };
    //     const baseUrl = "http://127.0.0.1:4010";
    //     fetch(`${baseUrl}/safetyNet`, requestOptions)
    //         .then(response => response.json())
    //         .then(data => setEntries(data.name));
    
    // // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, []);
    

    

    // const renderEntry = (entry: IEntry, index: number, entries: IEntry[]) => {
    //     // let displayInitial = (index === 0 || entries[index - 1].type[0]?.toLowerCase() !== entries[index].type[0]?.toLowerCase());
    //     return (
    //         <Flex key={entry.name} flexDirection='column'>
    //             <Heading  marginTop={4} size='md'>
    //                 My Safety Net
    //                 {/* {displayInitial && entries[index].name[0]?.toUpperCase()} */}
    //                 {/* {entries[0].strategies} */}
    //             </Heading>
    //             <Link
    //                 marginLeft={2}
    //                 variant='link'
    //                 fontSize='md'
    //             >
                    
                    
    //             </Link>
    //             {entry.name + '=====>' + entry.type}
    //         </Flex>
    //     );
    // }
    async function postData(){
        
        await axios.post(`http://127.0.0.1:4010/safetyNet/1`,{
            "name": "nail",
            "type": "pet",
            "strategies": [
              "string"
            ],
            "feedback": [
              {
                "itHelped": true,
                "comment": "string",
                "timestamp": "2022-05-29T17:29:03.758Z"
              }
            ]
          })
        
        }

    if(entries){
        console.log(entries.at(1)?.name)
        return (
            <Flex>
                <Sidebar />
                <Center fontSize="xl"
                    margin='auto'
                    alignItems='flex-start'
                    flexDirection='column'
                >
                    {/* {entries && entries.map(renderEntry)} */}
                    <Box mt = {4}>
                    Trage 3 Wege ein, auf denen dir <br></br> {entries.at(1)?.name} gerade helfen kann.
                    </Box>
                    <InputBox />
                    <Button onClick={postData} mt = {6} mx = "auto" alignItems = 'center' as='button' borderRadius='md' bg='turquoise' color='white' px={50} h={8}>
                       Let's go!
                    </Button>
                    
                    
                </Center>
            </Flex>

        );
    }
     else {
        console.log("NO ENTRIES");
        return(
        <Flex>
            <VStack w="100%" h="100px" bg="gray.200"></VStack>
                <Sidebar />
            </Flex>
        )
    }
    
}


function InputBox(){

    return(
       
       <Stack spacing={3}>
       <Input borderWidth = '2px' borderColor = 'grey' focusBorderColor='pink.400' placeholder='...' size='md' />
       <Input borderWidth = '2px' borderColor = 'grey' focusBorderColor='pink.400' placeholder='...' size='md' />
       <Input borderWidth = '2px' borderColor = 'grey' focusBorderColor='pink.400' placeholder='...' size='md' />
        
       
       <Box>
        <Image borderRadius='full'
                   boxSize='150px' 
                //    src='https://bit.ly/dan-abramov' 
                   src = 'net.png'/>
                   
                   <Button>+</Button>

        </Box>
        
       </Stack>
       
        
       
    )
}

export default function SafetyNet() {
    return (
        <ChakraProvider theme={theme}>
            <FrontPage />            
        </ChakraProvider>
    );
}
