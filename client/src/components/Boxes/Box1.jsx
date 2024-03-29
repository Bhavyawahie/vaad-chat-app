import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Box, Button, Container, Flex, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Spacer, VStack, useToast } from '@chakra-ui/react'
import { EditIcon, SearchIcon } from '@chakra-ui/icons'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChatListItem from '../ChatListItem'
import Userloading from '../UserLoading'
import { CHAT_CURRENT_RESET, CHAT_CURRENT_SET, CHAT_ONETOONE_CREATE_RESET } from '../../constants/chatConstants'
import { fetchAllChats } from '../../actions/chatActions'
import { logout } from '../../actions/userActions'
import { getReciever } from '../../utils/chatLogics'
import { MESSAGE_ALL_LIST_RESET } from '../../constants/messageConstants'
import { Link } from 'react-router-dom'
import groupIcon from '../../img/groupIcon.png'
import { checkDate } from '../../utils/dateAndTimeFormater'

// eslint-disable-next-line no-unused-vars
const Box1 = ({setSideBox, isOpen, onOpen, onClose, isOpenCreateChat, onOpenCreateChat, onCloseCreateChat, isOpenCreateGroupChat, onOpenCreateGroupChat, onCloseCreateGroupChat}) => {
    const githubLink = 'https://www.github.com/bhavyawahie'
    const toast = useToast()
    const [localSearch, setLocalSearch] = useState("")
    const localSearchInput = useRef(null)
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const chatAllList = useSelector(state => state.chatAllList)
    // eslint-disable-next-line no-unused-vars
    const { loading, chats, error } = chatAllList
    const chatOneToOneCreate = useSelector(state => state.chatOneToOneCreate)
    // eslint-disable-next-line no-unused-vars
    const {loading: createChatLoading, chat: createdChat, error: createChatError} = chatOneToOneCreate
    const chatGroupCreate = useSelector(state => state.chatGroupCreate)
    // eslint-disable-next-line no-unused-vars
    const {loading: createGroupChatLoading, chat: createdGroupChat, error: createGroupChatError} = chatGroupCreate 
    const messageSend = useSelector(state => state.messageSend)
    const { message } = messageSend
    const chatCurrentSet = useSelector(state => state.chatCurrentSet)
    const { currentChat } = chatCurrentSet
    useEffect(() => {
        if(userInfo){
            dispatch(fetchAllChats(localSearch))
        }
    }, [createdChat, createdGroupChat,localSearch, message, dispatch, userInfo])
    const logoutHandler = () => {
        dispatch(logout())
    }
    const searchButtonClickHandler = () => {
        localSearchInput.current.focus()
    }
    const chatOpener = (chatId) => {
        setSideBox(false)
        if(currentChat && chatId !== currentChat._id){
            dispatch({type: MESSAGE_ALL_LIST_RESET})
        }
        dispatch({type: CHAT_CURRENT_RESET})
        dispatch({type: CHAT_CURRENT_SET, payload: chats.find(chat => chat._id === chatId)})
    }
    return (
        <Box w="30%" minW="30%">
                {createChatError && (() => {
                    toast({position: "top-right", title: `${createChatError}`, status: "warning", isClosable: true, duration: "3000"}) 
                    dispatch({type: CHAT_ONETOONE_CREATE_RESET})
                    })()
                }
                <Flex flexDirection="column" mt={2}>
                    <Container py={2}>
                        <Flex flexDirection="row">
                            <Flex alignItems='center'>
                                <Avatar as='button' name={userInfo.name} src={userInfo.displayPicture} boxSize='2.5rem' mr={2} onClick={onOpen} _focus={{outline: 'none'}}/>            
                            </Flex>
                            <Heading d={{base: "none", lg: "flex"}} size="lg" py={1}>Chats</Heading>
                            <Spacer/>
                            <IconButton onClick={onOpenCreateChat} variant='ghost' w='1' borderRadius="full" bgColor="#EDF2F7" icon={<EditIcon/>}/>
                            <Box>
                                <Flex py={2} ml={2}>
                                    <Menu borderRadius="50%" placement="left-end" offset={[14,-5]}>
                                        <MenuButton><Icon as={MoreVertIcon}/></MenuButton>
                                        <MenuList  minWidth='170px'>
                                            <MenuItem color="blackAlpha.600" onClick={onOpenCreateGroupChat}>New Group</MenuItem>
                                            <MenuItem color="blackAlpha.600" onClick={logoutHandler}>Logout</MenuItem>
                                            <Link to={{pathname: githubLink}} target='_blank'>
                                                <MenuItem color="blackAlpha.600">Contact Us</MenuItem>
                                            </Link>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            </Box>
                        </Flex>
                    </Container>
                    <Container>
                        <InputGroup my={2} variant='filled'>
                            <InputLeftElement borderRadius="25px"><Button variant="flush" onClick={searchButtonClickHandler} _focus={{outline: "none"}}><SearchIcon color="blackAlpha.400"/></Button></InputLeftElement>
                            <Input ref={localSearchInput} placeholder="Search" borderRadius="25px" onChange={(e) => setLocalSearch(e.target.value)}/>
                        </InputGroup>
                    </Container>
                    <VStack spacing={0} mt={2} px={2} overflowY='scroll' height='100vh'>
                            {loading ? <Userloading/> : (
                                chats.map(chat => (
                                    <ChatListItem
                                        key={chat._id}
                                        id={chat._id}
                                        name={chat.isGroupChat ? chat.chatName : getReciever(userInfo, chat.users).name}
                                        displayPicture={chat.isGroupChat? groupIcon : getReciever(userInfo, chat.users).displayPicture}
                                        lastMessage={chat.lastMessage ? chat.isGroupChat ? `${chat.lastMessage.sender.name}: ${chat.lastMessage.content}`: chat.lastMessage.content : null}
                                        timeStamp={chat.lastMessage ? checkDate(chat.lastMessage.createdAt) : ""}
                                        initiateChat={chatOpener}
                                        openContext={() => alert(`clicked (right)`)}
                                        bg={currentChat ? currentChat._id === chat._id ? '#cee5f2' : "#FFF" : ""}
                                        hover={currentChat === chat ? "" : "#EDF2F7"}
                                    />
                                ))
                            )}
                    </VStack>        
                </Flex>
            </Box>
    )
}

export default Box1