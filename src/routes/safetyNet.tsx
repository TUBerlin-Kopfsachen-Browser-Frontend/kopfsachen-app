import { useEffect, useRef, useState, Suspense } from "react"
import {
    ChakraProvider, Text, theme, Flex, Heading, Input, Stack, HStack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Box, Select, Link, Center, Portal
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"

import { translationsEn, translationsTr, translationsDe, translationsAl } from "../components/translationText"
import { useNavigate } from "react-router-dom"

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

import {
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor,
} from '@chakra-ui/react'

import i18n, { t } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

// import safetyNet from "../safetyNet.png";
import "./../assets/css/safetyNet.scss";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translationsEn },
            tr: { translation: translationsTr },
            de: { translation: translationsDe },
            al: { translation: translationsAl }
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });
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

// interface IAddItemViewProps {
//     onBackClick: () => void;
// }

function AddItemView(
    // props: IAddItemViewProps
) {
    const [nameInput, setNameInput] = useState<string>('');
    const [strategyInput1, setStrategyInput1] = useState<string>('');
    const [strategyInput2, setStrategyInput2] = useState<string>('');
    const [strategyInput3, setStrategyInput3] = useState<string>('');
    const [categoryInput, setCategoryInput] = useState('situationControl');
    const [continueClicked, setContinueClicked] = useState(false);
    const [itHelped, setItHelped] = useState<boolean | undefined>();
    const navigate = useNavigate();
    const handleItemInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };

    const { t } = useTranslation();

    const { register, handleSubmit, setValue, reset } = useForm<ISafteyNetItem>();
    const onSubmit: SubmitHandler<ISafteyNetItem> = data => {
        console.log('submitting', data);
        axios.post(`http://127.0.0.1:4010/safetyNet/1`, data);
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onModalClose = () => {
        onClose();
        setItHelped(undefined);
    }
    const clearInputs = () => {
        reset();
        setValue('type', 'situationControl');
        setNameInput("");
        setStrategyInput1("");
        setStrategyInput2("");
        setStrategyInput3("");
        setCategoryInput('situationControl');
        setContinueClicked(false);
    }
    return (
        <Flex flexDirection='column' width={500}>
            <Text fontSize={20} marginTop={12} marginBottom={5}> {t('happyMaker')} </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    focusBorderColor="green.400"
                    {...register('name')}
                    onChange={handleItemInput}
                    value={nameInput}
                    isDisabled={continueClicked}
                />
                <Text fontSize={20} marginTop={7} marginBottom={5}> {t('chooseCategory')} </Text>
                <RadioGroup onChange={setCategoryInput} value={categoryInput} colorScheme='green' isDisabled={continueClicked}>
                    <Stack direction='row' spacing={10}>
                        <Radio {...register('type')} value='situationControl'>{t('situationControl')}<Text fontSize={40}>🎚</Text></Radio>
                        <Radio {...register('type')} value='relaxation'>{t('relaxation')}<Text fontSize={40}>🦥</Text></Radio>
                        <Radio {...register('type')} value='pet'>{t('pets')}<Text fontSize={40}>🐾</Text> </Radio>
                        <Radio {...register('type')} value='other'>{t('other')}<Text fontSize={40}>💭</Text></Radio>
                    </Stack>
                </RadioGroup>

                {!continueClicked && <Button
                    marginTop={10}
                    marginBottom={5}
                    colorScheme='green'
                    onClick={() => setContinueClicked(true)}
                    isDisabled={nameInput.trim() === ''}
                >
                    {t('continue')}
                </Button>}
            </form>
            <Flex flexDirection='column' mt={5} display={continueClicked ? undefined : 'none'}>
                <Text fontSize={20} marginTop={2} marginBottom={5}> {t('chooseWays')} </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <Input
                            {...register(`strategies.0`)}
                            placeholder='first'
                            focusBorderColor="green.400"
                            value={strategyInput1}
                            onChange={(e: any) => setStrategyInput1(e.target.value)}
                        />
                        <Input
                            {...register(`strategies.1`)}
                            placeholder='second'
                            focusBorderColor="green.400"
                            value={strategyInput2}
                            onChange={(e: any) => setStrategyInput2(e.target.value)}
                        />
                        <Input
                            {...register(`strategies.2`)}
                            placeholder='third'
                            focusBorderColor="green.400"
                            value={strategyInput3}
                            onChange={(e: any) => setStrategyInput3(e.target.value)}
                        />
                    </Stack>
                </form>
                <Flex marginTop={10}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Button
                            type='submit'
                            onClick={() => {
                                // prevent react from clearing the inputs before the form submit is handled
                                setTimeout(() => {
                                    clearInputs();
                                }, 0);
                            }}
                            marginRight={3}
                            colorScheme='green'
                            isDisabled={(strategyInput1.trim() === '') || (strategyInput2.trim() === '') || (strategyInput3.trim() === '')}
                        >
                            {t('addResource')}
                        </Button>
                    </form>
                    <Button
                        onClick={onOpen}
                        marginRight={3}
                        colorScheme='green'
                        isDisabled={(strategyInput1.trim() === '') || (strategyInput2.trim() === '') || (strategyInput3.trim() === '')}
                    >
                        {t('allResources')}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        onClose={onModalClose}
                    >
                        <ModalOverlay>
                            <ModalContent>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <ModalHeader fontSize='lg' fontWeight='bold'>
                                        {t('feedback')}
                                    </ModalHeader>

                                    <ModalBody>
                                        <Stack direction='row' spacing={3}>
                                            <IconButton
                                                onClick={() => {
                                                    setValue(`feedback.${0}.itHelped`, true);
                                                    setItHelped(true);
                                                }}
                                                aria-label='positive'
                                                variant={itHelped === true ? 'solid' : 'ghost'}
                                                icon={<FiSmile size={30} color='green' />}
                                            />
                                            <IconButton
                                                onClick={() => {
                                                    setValue(`feedback.${0}.itHelped`, false);
                                                    setItHelped(false);
                                                }}
                                                aria-label='negative'
                                                variant={itHelped === false ? 'solid' : 'ghost'}
                                                icon={<FiFrown size={30} color='red' />}
                                            />
                                        </Stack>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button
                                            onClick={() => {
                                                onModalClose();
                                                // prevent react from clearing the inputs before the form submit is handled
                                                setTimeout(() => {
                                                    clearInputs();
                                                    navigate('/resources');
                                                }, 0);
                                                // props.onBackClick();
                                            }}
                                            type='submit'
                                            isDisabled={typeof itHelped === 'undefined'}
                                            mr={3}
                                        >
                                            {t('submit')}
                                        </Button>
                                        <Button onClick={onModalClose}>
                                            {t('cancel')}
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalContent>
                        </ModalOverlay>
                    </Modal>
                </Flex>
            </Flex>
        </Flex>
    )
}

function FrontPage() {
    const [addItemClicked, setAddItemClicked] = useState(false);
    const [items, setItems] = useState<ISafteyNetItem[]>([]);
    const displayIcon = (iconType: string) => {
        return items.some(item => {
            if (item.type === iconType) {
                return true;
            }
            return false;
        });
    }
    const renderItem = (item: ISafteyNetItem) => {
        return <Flex marginLeft={5}><li>{item.name}</li></Flex>
    }

    const { t } = useTranslation();
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



    if (items) {
        return (
            <Suspense fallback="Loading...">
                <Flex>

                    <Flex
                        flexDirection='column'
                        position='absolute'
                        top='10vh'
                        left='50vw'
                        transform="translate(-50%, -0%)"
                        maxWidth='800px'
                    >


                        {!addItemClicked && <Text fontSize={20} pt={'80px'} align={'center'} marginBottom={5}>
                            {t('welcome')}
                        </Text>}
                        {!addItemClicked && <Center flexDirection='column'>
                            <Flex className="container" backgroundColor='white' borderRadius={170} paddingBottom={5}>
                                <ul className="circle-container">
                                    <li>{
                                        displayIcon('relaxation') &&
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="btn"><Text fontSize={40}>🦥</Text></button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent bg='tomato' color='white'>
                                                    <PopoverArrow bg='tomato'/>
                                                    <PopoverCloseButton/>
                                                    <PopoverHeader fontWeight='semibold'>Relaxation</PopoverHeader>
                                                    <PopoverBody><Text>{items.filter(item => item.type === 'relaxation').map(renderItem)}</Text></PopoverBody>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    }</li>
                                    <li>{
                                        displayIcon('pet') &&
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="btn"><Text fontSize={40}>🐾</Text></button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent bg='tomato' color='white'>
                                                    <PopoverArrow bg='tomato'/>
                                                    <PopoverCloseButton />
                                                    <PopoverHeader>Pets</PopoverHeader>
                                                    <PopoverBody><Text>{items.filter(item => item.type === 'pet').map(renderItem)}</Text></PopoverBody>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    }</li>
                                    <li>{
                                        displayIcon('situationControl') &&
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="btn"><Text fontSize={40}>🎚</Text></button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent bg='tomato' color='white'>
                                                    <PopoverArrow bg='tomato'/>
                                                    <PopoverCloseButton />
                                                    <PopoverHeader>Situation Control</PopoverHeader>
                                                    <PopoverBody><Text>{items.filter(item => item.type === 'situationControl').map(renderItem)}</Text></PopoverBody>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    }</li>
                                    <li>{
                                        displayIcon('other') &&
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="btn"><Text fontSize={40}>💭</Text></button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent bg='tomato' color='white'>
                                                    <PopoverArrow bg='tomato'/>
                                                    <PopoverCloseButton />
                                                    <PopoverHeader>Other</PopoverHeader>
                                                    <PopoverBody><Text>{items.filter(item => item.type === 'other').map(renderItem)}</Text></PopoverBody>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    }</li>
                                </ul>
                            </Flex>
                            {!addItemClicked &&
                                <Button
                                    mt={10}
                                    colorScheme='green'
                                    aria-label='Add item'
                                    leftIcon={<AddIcon />}
                                    onClick={() => setAddItemClicked(true)}
                                >
                                    Add item
                                </Button>
                            }
                        </Center>}
                        {addItemClicked && <AddItemView
                        // onBackClick={() => setAddItemClicked(false)}
                        />}
                    </Flex>
                </Flex>
            </Suspense>
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

export default function SafetyNet() {
    const { t } = useTranslation();
    return (
        <ChakraProvider theme={theme}>

            <Stack direction={['row']} spacing='275px'>
                <Box >
                    <Sidebar />
                </Box>

                <Box w='100%' h='120px' bg='green.400'>
                    <Text fontSize='40px' align='center' pt='50px' color='white'>{t('safetyNet')} </Text>
                </Box>

            </Stack>
            <FrontPage />
        </ChakraProvider>



    );
}
