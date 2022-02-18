import React, {useState, useEffect, useRef} from 'react'
import { EditIcon, SearchIcon } from '@chakra-ui/icons'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Button, Container, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Spacer, VStack } from '@chakra-ui/react'
import ChatListItem from '../ChatListItem'
import Userloading from '../UserLoading'
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_CURRENT_RESET, CHAT_CURRENT_SET } from '../../constants/chatConstants';
import { fetchAllChats } from '../../actions/chatActions';

const Box1 = ({isOpen, onOpen, onClose, isOpenCreateChat, onOpenCreateChat, onCloseCreateChat, isOpenCreateGroupChat, onOpenCreateGroupChat, onCloseCreateGroupChat}) => {
    const avatarIconURL = "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg"
    const [sidebox, setSideBox] = useState(false)
    const [localSearch, setLocalSearch] = useState("")
    const localSearchInput = useRef(null)
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin
    const chatAllList = useSelector(state => state.chatAllList)
    const { loading, chats, error } = chatAllList
    const chatOneToOneCreate = useSelector(state => state.chatOneToOneCreate)
    const {loading: createChatLoading, chat: createdChat, error: createChatError} = chatOneToOneCreate
    const chatCurrentSet = useSelector(state => state.chatCurrentSet)
    const { currentChat } = chatCurrentSet
    useEffect(() => {
        if(userInfo){
            dispatch(fetchAllChats(localSearch))
        }
    }, [createdChat, localSearch])
    const logoutHandler = () => {
        console.log('i was clicked!')
    }
    const searchButtonClickHandler = () => {
        localSearchInput.current.focus()
    }
    const chatOpener = (userId) => {
        dispatch({type: CHAT_CURRENT_RESET})
        dispatch({type: CHAT_CURRENT_SET, payload: chats.find(chat => chat._id === userId)})
    }
    return (
        <Box w="25%" minWidth='25%'>
                <Flex flexDirection="column" mt={2}>
                    <Container py={2}>
                        <Flex flexDirection="row">
                            <Box py={1} pr={2}>
                                    <Avatar as='button' name="sample user" src={avatarIconURL} boxSize="40px" borderRadius="50%" onClick={onOpen} _focus={{outline: 'none'}}/>            
                            </Box>
                            <Heading d={{base: "none", lg: "flex"}} size="lg" py={1}>Chats</Heading>
                            <Spacer/>
                            <Button onClick={onOpenCreateChat} variant='flush' w='1' borderRadius="full" bgColor="#EDF2F7"><EditIcon/></Button>
                            <Box>
                                <Flex p={2}>
                                    <Menu borderRadius="50%" placement="left-end" offset={[14,-5]}>
                                        <MenuButton><Icon as={MoreVertIcon}/></MenuButton>
                                        <MenuList  minWidth='170px'>
                                            <MenuItem color="blackAlpha.600" onClick={onOpenCreateGroupChat}>New Group</MenuItem>
                                            <MenuItem color="blackAlpha.600">Logout</MenuItem>
                                            <MenuItem color="blackAlpha.600">Contact Us</MenuItem>
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
                    <VStack spacing={2} mt={2}>
                            {loading ? <Userloading/> : (
                                chats.map(chat => (
                                    <ChatListItem
                                        key={chat._id}
                                        id={chat._id}
                                        name={chat.chatName}
                                        displayPicture={chat.users[0].displayPicture}
                                        lastMessage={chat.lastMessage ? chat.isGroupChat ? `${chat.lastMessage.sender.name}: ${chat.lastMessage.content}`: chat.lastMessage.content : null}
                                        timeStamp={chat.lastMessage ? chat.lastMessage.createdAt : ""}
                                        initiateChat={chatOpener}
                                    />
                                ))
                            )}
                    </VStack>        
                </Flex>
            </Box>
    )
}

export default Box1