import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Container } from '@chakra-ui/react'
import ScrollableFeed from 'react-scrollable-feed'
import { isSameSenderMargin } from '../utils/chatLogics'

const MessageScrollList = () => {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const messageListAll = useSelector(state => state.messageListAll)
    const {messages} = messageListAll
    return (
        <ScrollableFeed className='messageScrollList'>
            {messages && messages.map((message, index) => (
                <Box width='max-content' key={message._id} d='flex' backgroundColor={message.sender._id === userInfo.id ? "#BEE3F8" : "#B9F5D0"} justifyContent={message.sender._id === userInfo.id ? `flex-end`: `flex-start`} py={2} px={4} my={4} borderRadius='20px' marginLeft={isSameSenderMargin(messages, message, index, userInfo.id)}>{message.content}</Box>
            ))}
        </ScrollableFeed>
    )
}

export default MessageScrollList