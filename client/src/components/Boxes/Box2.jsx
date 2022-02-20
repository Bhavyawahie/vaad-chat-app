import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import { Avatar, Box, Button, Flex, Icon, Input, Text } from '@chakra-ui/react'
import { fetchAllMessages, sendMessage } from '../../actions/messageActions'

const Box2 = ({setSideBox}) => {
    const [messageField, setMessageField] = useState("")
    const dispatch = useDispatch()
    const messageSend = useSelector(state => state.messageSend)
    const {loading, message, error} = messageSend
    const chatCurrentSet = useSelector(state => state.chatCurrentSet)
    const {currentChat} = chatCurrentSet
    const messageListAll = useSelector(state => state.messageListAll)
    const {loading: loadingMessage, messages, error: errorMessage } = messageListAll
    const sendMessageHandler = () => {
        dispatch(sendMessage(currentChat._id, messageField))
        setMessageField("")
    }
    useEffect(() => {
        if(currentChat){
            dispatch(fetchAllMessages(currentChat._id))
        }
    }, [currentChat])
    console.log(messages)
    return (
        <Box bg="white" w="75%" minWidth="50%" borderLeft="1px solid rgb(229,229,229)">
                { currentChat ? (
                <Flex flexDirection="column" justifyContent='stretch' height='100vh'>
                    <Flex height='9%' flexDirection="row" justifyContent="flex-start" borderBottom='1px solid rgb(229,229,229)' py={3}>
                            <Flex w='80%' ml={4} onClick={() => setSideBox(true) }>
                                <Box>
                                    <Avatar src={currentChat.users[0].displayPicture} boxSize="40px" borderRadius="50%"></Avatar>
                                </Box>
                                <Text fontSize='lg' ml={3}>{currentChat.chatName}</Text>
                            </Flex>
                    </Flex>
                    <Flex height='83.4%' justifyContent='center' alignItems='center'>BC</Flex>
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