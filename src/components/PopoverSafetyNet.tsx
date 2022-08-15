import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Text,
    Portal,
    Flex
} from "@chakra-ui/react";


interface ISafetyNetItem {
    id: number;
    name: string;
    type: string;
    strategies: string[];
    feedback?: {
        itHelped: boolean;
        comment: string;
        timestamp: string;
    }[];
}

interface IPopoverSafetyNetProps {
    popoverProps: IPopoverProps;
}

interface IPopoverProps {
    icon: string;
    type: string;
    items: ISafetyNetItem[];
}

const renderItem = (item: ISafetyNetItem) => {
    return (
      <Flex marginLeft={5}>
        <li>{item.name}</li>
      </Flex>
    );
  };

const renderType = (type: string) => {
    if (type === 'personalStrengths') {
        return 'Personal strengths'
    }
    return type[0].toUpperCase().concat(type.slice(1))
}

export default function PopoverSafetyNet(props: IPopoverSafetyNetProps) {
    return <Popover>
        <PopoverTrigger>
            <button className="btn">
                <Text fontSize={40}>{props.popoverProps.icon}</Text>
            </button>
        </PopoverTrigger>
        <Portal>
            <PopoverContent bg="yellow.200" color="black" borderColor="black">
                <PopoverArrow bg="yellow.400" borderTopWidth={1} borderLeftWidth={1} borderColor='black'/>
                <PopoverCloseButton />
                <PopoverHeader fontWeight='bold' fontStyle='oblique' bg="yellow.400" borderColor="black">{renderType(props.popoverProps.type)}</PopoverHeader>
                <PopoverBody>
                    <Text fontStyle='oblique'>
                        {props.popoverProps.items
                            .filter((item) => item.type === props.popoverProps.type)
                            .map(renderItem)}
                    </Text>
                </PopoverBody>
            </PopoverContent>
        </Portal>
    </Popover>
}