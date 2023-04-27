import React from 'react'
import { Avatar, Box, Button, DrawerHeader, Flex, Heading, IconButton,Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { CloseIcon } from '@chakra-ui/icons'
import { getReciever } from '../../utils/chatLogics'
import groupIcon from '../../img/groupIcon.png'
import UserListItem from '../UserListItem'
import { MESSAGE_ALL_LIST_RESET } from '../../constants/messageConstants'
import { CHAT_CURRENT_RESET, CHAT_CURRENT_SET } from '../../constants/chatConstants'

const Box3 = ({setSideBox}) => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const chatCurrentSet = useSelector(state => state.chatCurrentSet)
    const { currentChat } = chatCurrentSet
    const chatAllList = useSelector(state => state.chatAllList)
    const {chats} = chatAllList
    const chatOpener = (chatId) => {
        setSideBox(false)
        if(currentChat && chatId !== currentChat._id){
            dispatch({type: MESSAGE_ALL_LIST_RESET})
        }
        dispatch({type: CHAT_CURRENT_RESET})
        dispatch({type: CHAT_CURRENT_SET, payload: chats.find(chat => chat._id === chatId)})
    }
    return (
        <Box bg="white" w='25%' minWidth="25%" borderLeft="1px solid rgb(229,229,229)">
            <Flex justifyContent='center' alignItems='center' flexDirection='column' w='100%'>
                <Flex width='100%' py={4} px={2} alignItems='center'>
                    <Box>
                        <IconButton size='sm' variant='ghost' onClick={() => setSideBox(false)} icon={<CloseIcon opacity='80%'/>}/>
                    </Box>
                    <Text fontSize='xl' fontWeight='semibold' ml={3}>{currentChat.isGroupChat ? 'Group Chat Info' : 'Contact Info'}</Text>
                </Flex>
                {currentChat.isGroupChat ? (
                    <Flex justifyContent='center' alignItems='center' flexDirection='column' w='100%' px={2}>
                        <Avatar size='2xl' mt={6} src={groupIcon}/>
                        <Text as='h3' fontSize='2xl' mt={2} mb={4}>{currentChat.chatName}</Text>
                        {currentChat.users.map(user => (
                            <UserListItem 
                                key={user._id}
                                user={user}
                                initiateChat={chatOpener}
                            />
                        ))}
                    </Flex>
                    ): (
                    <Flex justifyContent='center' alignItems='center' flexDirection='column'>
                        <Avatar size='2xl' mt={6} src={getReciever(userInfo, currentChat.users).displayPicture}/>
                        <Text as='h3' fontSize='2xl' my={2}>{getReciever(userInfo, currentChat.users).name}</Text>
                        <Text fontSize='lg'>{getReciever(userInfo, currentChat.users).email}</Text>
                    </Flex>
                )}
            </Flex>
        </Box>
    )
}

export default Box3