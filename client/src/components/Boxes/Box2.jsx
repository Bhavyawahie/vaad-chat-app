import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import { Avatar, Box, Button, Flex, Icon, Input, Text } from '@chakra-ui/react'
import {MESSAGE_ALL_LIST_SUCCESS} from '../../constants/messageConstants'
import { fetchAllMessages, sendMessage } from '../../actions/messageActions'
import MessageScrollList from '../MessageScrollList'
import { getReciever } from '../../utils/chatLogics'
import MessageLoader from '../MessageLoader'
import groupIcon from '../../img/groupIcon.png'
import io from 'socket.io-client'

let socket, selectedChatCompare
const Box2 = ({setSideBox}) => {
    // eslint-disable-next-line no-unused-vars
    const groupChatImgURL = `https://nirc.icai.org/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/default-group.png`
    const [messageField, setMessageField] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [chatConnected, setchatConnected] = useState(false)
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const messageSend = useSelector(state => state.messageSend)
    // eslint-disable-next-line no-unused-vars
    const { message: messageSent, error} = messageSend
    const messageListAll = useSelector(state => state.messageListAll)
    // eslint-disable-next-line no-unused-vars
    const {loading: loadingMessage, error: errorMessage } = messageListAll
    const chatCurrentSet = useSelector(state => state.chatCurrentSet)
    const {currentChat} = chatCurrentSet
    const sendMessageHandler = () => {
        dispatch(sendMessage(currentChat._id, messageField))
        setMessageField("")
    }
    useEffect(() => {
        socket = io('https://jittery-office.onrender.com/')
        socket.emit('setup', {id: userInfo.id, name: userInfo.name, email: userInfo.email})
        socket.on('connection', () => setchatConnected(true))
    }, [userInfo])

    useEffect(() => {
        if(currentChat){
            dispatch(fetchAllMessages(currentChat._id))
            selectedChatCompare = currentChat
        }
    }, [dispatch, currentChat])


    useEffect( () => {
        socket.on('messageRecieved', (newRecievedMessage) => {
            if(!selectedChatCompare || selectedChatCompare._id !== newRecievedMessage.chat._id){
                // NOTIFY THE USER BY UPDATING THE UNREAD CHAT (Add it to the chat model)
            } 
            else {
                dispatch({
                    type: MESSAGE_ALL_LIST_SUCCESS,
                    payload: newRecievedMessage
                })
            }
        })
    }, [dispatch])
    
    return (
        <Box bg="white" w="75%" borderLeft="1px solid rgb(229,229,229)">
                { currentChat ? (
                <Flex flexDirection="column" justifyContent='space-between' height='100vh'>
                    <Flex flexDirection="row" justifyContent="flex-start" borderBottom='1px solid rgb(229,229,229)' py={3} h="75px">
                            <Flex w='80%' ml={4} onClick={() => setSideBox(true) }>
                                <Box>
                                    <Avatar src={currentChat.isGroupChat ? groupIcon : getReciever(userInfo, currentChat.users).displayPicture} boxSize="2.5rem" borderRadius="50%"></Avatar>
                                </Box>
                                <Text fontSize='lg' ml={3}>{  currentChat.isGroupChat ? currentChat.chatName : getReciever(userInfo, currentChat.users).name}</Text>
                            </Flex>
                    </Flex>
                    <Flex w='100%' h='82vh' flexGrow='8'>
                        <Flex w="100%" h='100%' flexDirection='column' overflowY="hidden">
                            {loadingMessage ? <MessageLoader/> : <MessageScrollList/>}
                        </Flex>
                    </Flex>
                    <Flex flexDirection='column' justifyContent='flex-end' mb={3} maxH='70px'>
                        <Flex px={2}>
                            <Button variant='flushed' _hover={{backgroundColor: "rgba(229,229,229)"}}><Icon as={InsertEmoticonIcon}/></Button>
                            <Input autoFocus={true} placeholder="Type a Message" borderRadius='25px' w='90%' value={messageField} onChange={(e) => setMessageField(e.target.value)} onKeyPress={(e) => (messageField.trim() !== ""  && e.key === 'Enter') && sendMessageHandler()}/>
                            <Button ml={1} onClick={sendMessageHandler} disabled={(messageField === "" || messageField.trim() === "")} >Send</Button>
                        </Flex>
                    </Flex>
                </Flex>)
                : <Flex minHeight="100vh" justifyContent="center" alignItems="center" as='Text' fontSize="xl">Click on the chats to get started</Flex>}
            </Box>
    )
}

export {socket}
export default Box2