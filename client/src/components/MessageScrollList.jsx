import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Flex } from '@chakra-ui/react'
import ScrollableFeed from 'react-scrollable-feed'
import { isSameSenderMargin } from '../utils/chatLogics'
import { formatISODate } from '../utils/dateAndTimeFormater'

const MessageScrollList = () => {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const messageListAll = useSelector(state => state.messageListAll)
    const {messages} = messageListAll
    return (
        <ScrollableFeed className='messageScrollList'>
            {messages && messages.map((message, index) => (
                <Flex width='max-content' key={message._id} backgroundColor={`#EDF2F7`} py={2} px={4} my={5} borderRadius='20px' marginLeft={isSameSenderMargin(messages, message, index, userInfo.id)}>
                    <Box>
                        {message.content}
                    </Box>
                    <Box d='flex' fontSize={{ base: '6px', md: '9px', lg: '11px' }} alignItems='flex-end' pt={2} ml={3} color='blackAlpha.400'>
                        {formatISODate(message.createdAt)}
                    </Box>
                </Flex>
            ))}
        </ScrollableFeed>
    )
}

export default MessageScrollList