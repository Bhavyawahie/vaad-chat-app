import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const ChatListItem = ({id, name, displayPicture, lastMessage, initiateChat}) => {
    return (
        <Flex w='100%' px={3} py={.5} flexDirection='row' borderRadius='10px' _hover={{backgroundColor: "#EDF2F7"}} onClick={() => initiateChat(id)}>
                <Box py={1} mr={4}>
                    <Avatar name={name} src={displayPicture} backgroundColor="#DADADA"/>
                </Box>
                <Box>
                    <Text>{name}</Text>
                    <Text>{lastMessage}</Text>
                </Box>
            </Flex>
    )
}

export default ChatListItem