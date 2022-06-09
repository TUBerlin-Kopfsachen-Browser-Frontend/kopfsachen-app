import { useEffect, useRef, useState } from "react"
import {
    ChakraProvider, Text, theme, Flex, Heading, Input, Stack, HStack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Box
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import Logoo from "../public/net.png"

import { useForm, SubmitHandler } from "react-hook-form";
import { stringify } from "querystring"
import { networkInterfaces } from "os"
import axios from "axios"
import { Button, IconButton } from "@chakra-ui/button"
import { AddIcon } from "@chakra-ui/icons"
import { RadioGroup } from "@chakra-ui/react"
import { Radio } from "@chakra-ui/react"
import { FiFrown, FiMeh, FiSmile } from "react-icons/fi"
import React from "react"


// api get/post request format
interface ISafteyNetItem {
    name: string;
    type: string;
    strategies: string[];
    feedback?: {
        timestamp: string;
        itHelped: boolean;
        comment: string;
    }[];
}

function AddItemView() {
    const [nameInput, setNameInput] = useState<string>('');
    const [strategyInput1, setStrategyInput1] = useState<string>('');
    const [strategyInput2, setStrategyInput2] = useState<string>('');
    const [strategyInput3, setStrategyInput3] = useState<string>('');
    const [categoryInput, setCategoryInput] = useState('situationControl');
    const [continueClicked, setContinueClicked] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const handleItemInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };

    const { register, handleSubmit, setValue } = useForm<ISafteyNetItem>();
    const onSubmit: SubmitHandler<ISafteyNetItem> = data => axios.post(`http://127.0.0.1:4010/safetyNet/1`, data)
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex flexDirection='column' width={500}>
            <Text marginTop={2} marginBottom={5}> This is what makes me happy: </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    focusBorderColor="green.400"
                    {...register('name')}
                    onChange={handleItemInput}
                    isDisabled={continueClicked}
                />
                <Text marginTop={7} marginBottom={5}> To which category does this resource belong? </Text>
                <RadioGroup onChange={setCategoryInput} value={categoryInput} colorScheme='green' isDisabled={continueClicked}>
                    <Stack direction='row'>
                        <Radio {...register('type')} value='situationControl'>Situation Control</Radio>
                        <Radio {...register('type')} value='relaxation'>Relaxation</Radio>
                        <Radio {...register('type')} value='pet'>Pets</Radio>
                        <Radio {...register('type')} value='other'>Other</Radio>
                    </Stack>
                </RadioGroup>

                {!continueClicked && <Button
                    marginTop={7}
                    marginBottom={5}
                    colorScheme='green'
                    width={20} size='xs'
                    onClick={() => setContinueClicked(true)}
                    isDisabled={nameInput.trim() === ''}
                >
                    continue
                </Button>}
            </form>
            {continueClicked && <Flex flexDirection='column' mt={5}>
                <Text marginTop={2} marginBottom={5}> Think about three ways in which {nameInput} can help you right now: </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <Input
                            {...register(`strategies.${0}`)}
                            placeholder='first'
                            focusBorderColor="green.400"
                            onChange={(e: any) => setStrategyInput1(e.target.value)}
                        />
                        <Input
                            {...register(`strategies.${1}`)}
                            placeholder='second'
                            focusBorderColor="green.400"
                            onChange={(e: any) => setStrategyInput2(e.target.value)}
                        />
                        <Input
                            {...register(`strategies.${2}`)}
                            placeholder='third'
                            focusBorderColor="green.400"
                            onChange={(e: any) => setStrategyInput3(e.target.value)}
                        />
                    </Stack>
                </form>
                <Flex marginTop={10}>
                    <Button
                        marginRight={3}
                        colorScheme='green'
                        isDisabled={(strategyInput1.trim() === '') || (strategyInput2.trim() === '') || (strategyInput3.trim() === '')}
                    >
                        Add another resource
                    </Button>
                    <Button
                        onClick={onOpen}
                        marginRight={3}
                        colorScheme='green'
                        isDisabled={(strategyInput1.trim() === '') || (strategyInput2.trim() === '') || (strategyInput3.trim() === '')}
                    >
                        These are all resources
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay>
                            <ModalContent>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <ModalHeader fontSize='lg' fontWeight='bold'>
                                        How did you like this exercise?
                                    </ModalHeader>

                                    <ModalBody>
                                        <Stack direction='row' spacing={3}>
                                            <IconButton
                                                onClick={() => {
                                                    setValue(`feedback.${0}.itHelped`, true);
                                                    setIsSubmitDisabled(false);
                                                }}
                                                aria-label='positive'
                                                variant='ghost'
                                                icon={<FiSmile size={30} color='green' />}
                                            />
                                            <IconButton
                                                onClick={() => {
                                                    setValue(`feedback.${0}.itHelped`, false);
                                                    setIsSubmitDisabled(false);
                                                }}
                                                aria-label='negative'
                                                variant='ghost'
                                                icon={<FiFrown size={30} color='red' />}
                                            />
                                        </Stack>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button onClick={onClose} type='submit' isDisabled={isSubmitDisabled} mr={3} >
                                            Submit
                                        </Button>
                                        <Button onClick={() => {
                                            onClose();
                                            setIsSubmitDisabled(true);
                                        }}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalContent>
                        </ModalOverlay>
                    </Modal>
                </Flex>
            </Flex>
            }
        </Flex>
    )
}

function FrontPage() {
    const [addItemClicked, setAddItemClicked] = useState(false);
    const [items, setItems] = useState<ISafteyNetItem[]>([]);


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
    async function postData() {

        await axios.post(`http://127.0.0.1:4010/safetyNet/1`, {
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

    if (items) {
        // console.log(items.at(1)?.name)
        return (
            <Flex>
                
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
                    
                    {!addItemClicked && <Text pt ={'80px'} align={'center'} marginBottom={5}>
                        Which persons or activities make you happy and give you drive in your everyday life?
                    </Text>}
                    {!addItemClicked && <Text fontSize={11} marginBottom={5}>
                        {items.map((item: ISafteyNetItem, index, items: ISafteyNetItem[]) => <li key={item.name}> {items[index].name} </li>)}
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
            
            <Stack direction={['row']} spacing='275px'>
                    <Box >
                        <Sidebar />
                    </Box>

                    <Box w='100%' h='120px'  bg='green.400'>
                        <Text fontSize='40px' align='center' pt='50px' color='white'>Safety Net </Text>
                    </Box>
                    
            </Stack>
            <FrontPage />
        </ChakraProvider>
            

        
    );
}
