import { useEffect, useState } from "react"
import {
    ChakraProvider, Text, theme, Flex, Heading, Input, Stack, HStack
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import Logoo from "../public/net.png"
import { stringify } from "querystring"
import { networkInterfaces } from "os"
import axios from "axios"
import { Button, IconButton } from "@chakra-ui/button"
import { AddIcon } from "@chakra-ui/icons"
import { RadioGroup } from "@chakra-ui/react"
import { Radio } from "@chakra-ui/react"


// api response format for get request
interface ISafteyNetItem {
    name: string;
    type: string;
    strategies: string[];
    feedback: {
        timestamp: string;
        itHelped: boolean;
        comment: string;
    }[];
}

function AddItemView() {
    const [itemInput, setItemInput] = useState<string>('');
    const [category, setCategory] = useState('people');
    const handleItemInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemInput(e.target.value);
    };
    return (
        <Flex flexDirection='column'>
            <Text marginTop={2} marginBottom={5}> This is what makes me happy: </Text>
            <Input
                focusBorderColor="green.400"
                onChange={handleItemInput}
            />
            <Text marginTop={7} marginBottom={5}> To which category does this resource belong? </Text>
            <RadioGroup onChange={setCategory} value={category} colorScheme='green'>
                <Stack direction='row'>
                    <Radio value='people'>people</Radio>
                    <Radio value='hobbies'>hobbies</Radio>
                    <Radio value='pets'>pets</Radio>
                    <Radio value='other'>other</Radio>
                </Stack>
            </RadioGroup>
            <Flex marginTop={10}>
                <Button marginRight={3} colorScheme='green'> Add another resource </Button>
                <Button colorScheme='green'> These are all resources </Button>
            </Flex>
        </Flex>
    )
}

function FrontPage() {
    const [addItemClicked, setAddItemClicked] = useState(false);
    const [items, setItems] = useState<ISafteyNetItem[]>([]);

    // const [name1, setName1] = useState("");
    // const [name2, setName2] = useState("");
    // const [name3, setName3] = useState("");

    // to fetch data everytime the front page is loaded
    useEffect(() => {
        const baseUrl = "http://127.0.0.1:4010"; // localhost + port as base url
        const userId = 1; // random user id
        const fetchItemsWrapper = async () => {
            const fetchItems = await fetch(`${baseUrl}/safetyNet/${userId}`);
            if (fetchItems.ok) {
                const itemsData = await fetchItems.json();
                if (itemsData.length > 0) {
                    setItems(itemsData);
                }
            } else {
                console.log("Failed to fetch safety net items.");
            }
        }
        fetchItemsWrapper();


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
    //         .then(data => setItems(data.name));

    // // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, []);




    // const renderEntry = (entry: ISafteyNetItem, index: number, items: ISafteyNetItem[]) => {
    //     // let displayInitial = (index === 0 || items[index - 1].type[0]?.toLowerCase() !== items[index].type[0]?.toLowerCase());
    //     return (
    //         <Flex key={entry.name} flexDirection='column'>
    //             <Heading  marginTop={4} size='md'>
    //                 My Safety Net
    //                 {/* {displayInitial && items[index].name[0]?.toUpperCase()} */}
    //                 {/* {items[0].strategies} */}
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

    if (items) {
        // console.log(items.at(1)?.name)
        return (
            <Flex>
                <Sidebar />
                <Flex
                    flexDirection='column'
                    position='absolute'
                    top='10vh'
                    left='50vw'
                    transform="translate(-50%, -0%)"
                    maxWidth='800px'
                >
                    {/* {items.at(1)?.name} */}
                    {/* <InputBox /> */}
                    {/* <Box mt = {6} mx = "auto" alignItems = 'center' as='button' borderRadius='md' bg='turquoise' color='white' px={50} h={8}>
                       Let's go!
                    </Box> */}
                    <Heading marginBottom={5} fontSize='3xl'>
                        My Safety Net
                    </Heading>
                    {!addItemClicked && <Text marginBottom={5}>
                        Which persons or activities make you happy and give you drive in your everyday life?
                    </Text>}
                    {!addItemClicked && <Text fontSize={11} marginBottom={5}>
                        {items.map((item: ISafteyNetItem, index, items: ISafteyNetItem[]) => <li> {items[index].name} </li>)}
                    </Text>}
                    {/* <Box marginTop={5}>
                        <Image
                            borderRadius='full'
                            boxSize='150px'
                            src='net.png'
                            alt='safety net' />
                        <Button>+</Button>
                    </Box> */}
                    {!addItemClicked &&
                        <IconButton
                            colorScheme='green'
                            aria-label='Add item'
                            icon={<AddIcon />}
                            width={20}
                            onClick={() => setAddItemClicked(true)}
                        />

                    }
                    {addItemClicked && <AddItemView />}
                </Flex>
            </Flex>

        );
    }
    else {
        console.log("NO ENTRIES");
        return (
            <Flex>
                <Sidebar />
            </Flex>
        )
    }

}


// function InputBox(){
//     async function postData(){

//     await axios.post(`http://127.0.0.1:4010/safetyNet/1`,{
//         "name": "nail",
//         "type": "pet",
//         "strategies": [
//           "string"
//         ],
//         "feedback": [
//           {
//             "itHelped": true,
//             "comment": "string",
//             "timestamp": "2022-05-29T17:29:03.758Z"
//           }
//         ]
//       })

//     }

//     return(

//        <Stack spacing={3}>
//        <Input borderWidth = '2px' borderColor = 'grey' focusBorderColor='pink.400' placeholder='...' size='md' />
//        <Input borderWidth = '2px' borderColor = 'grey' focusBorderColor='pink.400' placeholder='...' size='md' />
//        <Input borderWidth = '2px' borderColor = 'grey' focusBorderColor='pink.400' placeholder='...' size='md' />
//        <Input borderWidth = '2px' borderColor = 'grey' focusBorderColor='pink.400' placeholder='...' size='md' />

//        <Box>
//         <Image borderRadius='full'
//                    boxSize='150px' 
//                 //    src='https://bit.ly/dan-abramov' 
//                    src = 'net.png'
//                    alt='Dan Abramov' />

//                    <Button onClick={postData}>+</Button>

//         </Box>

//        </Stack>



//     )
// }

export default function SafetyNet() {
    return (
        <ChakraProvider theme={theme}>
            <FrontPage />

        </ChakraProvider>
    );
}
