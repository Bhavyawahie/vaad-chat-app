import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import { Avatar, Box, Button, Flex, Icon, Input, Text } from '@chakra-ui/react'
import { fetchAllMessages, sendMessage } from '../../actions/messageActions'
import MessageScrollList from '../MessageScrollList'
import { getReciever } from '../../utils/chatLogics'

const Box2 = ({setSideBox}) => {
    const groupChatImgURL = `https://nirc.icai.org/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/default-group.png`
    const [messageField, setMessageField] = useState("")
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const messageSend = useSelector(state => state.messageSend)
    const { messages: messageSent, error} = messageSend
    const messageListAll = useSelector(state => state.messageListAll)
    const {loading: loadingMessage, error: errorMessage } = messageListAll
    const chatCurrentSet = useSelector(state => state.chatCurrentSet)
    const {currentChat} = chatCurrentSet
    const sendMessageHandler = () => {
        dispatch(sendMessage(currentChat._id, messageField))
        setMessageField("")
    }
    useEffect(() => {
        if(currentChat){
            dispatch(fetchAllMessages(currentChat._id))
        }
    }, [currentChat, messageSent])
    return (
        <Box bg="white" w="75%" minWidth="50%" borderLeft="1px solid rgb(229,229,229)">
                { currentChat ? (
                <Flex flexDirection="column" justifyContent='stretch' height='100vh'>
                    <Flex height='9%' flexDirection="row" justifyContent="flex-start" borderBottom='1px solid rgb(229,229,229)' py={3}>
                            <Flex w='80%' ml={4} onClick={() => setSideBox(true) }>
                                <Box>
                                    <Avatar src={currentChat.isGroupChat ? groupChatImgURL : getReciever(userInfo, currentChat.users).displayPicture} boxSize="2.5rem" borderRadius="50%"></Avatar>
                                </Box>
                                <Text fontSize='lg' ml={3}>{  currentChat.isGroupChat ? currentChat.chatName : getReciever(userInfo, currentChat.users).name}</Text>
                            </Flex>
                    </Flex>
                    <Flex height='83.4%' w='100%'>
                        <Flex w="100%" h="100%" justifyContent='center' alignItems='center' flexDirection='column' alignItems='flex-end' overflowY="hidden">
                            {loadingMessage ? <span>loading</span> : <MessageScrollList/>}
                        </Flex>
                    </Flex>
                    <Flex height='7.6%' px={2}>
                        <Button variant='flushed' _hover={{backgroundColor: "rgba(229,229,229)"}}><Icon as={InsertEmoticonIcon}/></Button>
                        <Input placeholder="Type a Message" borderRadius='25px' w='90%' value={messageField} onChange={(e) => setMessageField(e.target.value)} onKeyPress={(e) => (e.key === 'Enter') && sendMessageHandler()}/>
                        <Button onClick={sendMessageHandler}>Send</Button>
                    </Flex>
                </Flex>)
                : <Flex minHeight="100vh" justifyContent="center" alignItems="center" as='Text' fontSize="xl">Click on the chats to get started</Flex>}
            </Box>
    )
}

export default Box2