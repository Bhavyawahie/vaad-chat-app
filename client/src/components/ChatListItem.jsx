import React from 'react'
import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react'

const ChatListItem = ({id, name, displayPicture, lastMessage, timeStamp, initiateChat, openContext}) => {
    return (
        <Flex w='100%' px={3} py={1} flexDirection='row' borderRadius='10px' _hover={{backgroundColor: "#EDF2F7"}} onClick={() => initiateChat(id)} onContextMenu={() => openContext(id)}>
                <Box mr={4} ml={1}>
                    <Avatar name={name} src={displayPicture} backgroundColor="#DADADA" />
                </Box>
                <Box as='Flex' justifyContent='center' width='500px'>
                    <Flex justifyContent="space-between">
                        <Box fontSize="lg" isTruncated>{name}</Box>
                        <Spacer/>
                        <Box fontSize="xs" color="blackAlpha.400">{timeStamp.split('.')[0]}</Box>
                    </Flex>
                    <Text fontSize="sm" color="blackAlpha.800">{lastMessage}</Text>
                </Box>
            </Flex>
    )
}

export default ChatListItem