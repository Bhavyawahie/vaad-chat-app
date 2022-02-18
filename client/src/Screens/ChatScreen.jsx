import React, { useState, useEffect, useRef } from "react";
import Picker from 'emoji-picker-react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { EditIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Icon, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Sidebarprofile from "../components/SidebarProfile";
import SidebarCreateChat from "../components/SidebarCreateChat";
import { fetchAllChats, searchLocalUser } from "../actions/chatActions";
import UserLoading from "../components/UserLoading";
import ChatListItem from "../components/ChatListItem";
import { CHAT_CURRENT_RESET, CHAT_CURRENT_SET } from "../constants/chatConstants";
import SidebarCreateGroupChat from "../components/SidebarCreateGroupChat";

const Chatscreen = ({ history }) => {
    const [sidebox, setSideBox] = useState(false)
    const [localSearch, setLocalSearch] = useState("")
    const localSearchInput = useRef(null)
    const avatarIconURL = "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg"
    const dispatch = useDispatch();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isOpen: isOpenCreateChat, onOpen: onOpenCreateChat, onClose: onCloseCreateChat} = useDisclosure()
    const {isOpen: isOpenCreateGroupChat, onOpen: onOpenCreateGroupChat, onClose: onCloseCreateGroupChat} = useDisclosure()
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin
    const chatAllList = useSelector(state => state.chatAllList)
    const { loading, chats, error } = chatAllList
    const chatOneToOneCreate = useSelector(state => state.chatOneToOneCreate)
    const {loading: createChatLoading, chat: createdChat, error: createChatError} = chatOneToOneCreate
    const chatCurrentSet = useSelector(state => state.chatCurrentSet)
    const { currentChat } = chatCurrentSet
    useEffect(() => {
        if (!userInfo) {
            history.push("/")
        } 
        dispatch(fetchAllChats(localSearch))
    }, [userInfo, history, createdChat, localSearch])
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
    console.log(currentChat)
    return (
    <>
        <Flex height='100vh'>
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
                            {loading ? <UserLoading/> : (
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
            <Sidebarprofile isOpen={isOpen} onClose={onClose}/>
            <SidebarCreateChat isOpenCreateChat={isOpenCreateChat} onCloseCreateChat={onCloseCreateChat}/>
            <SidebarCreateGroupChat isOpenCreateGroupChat={isOpenCreateGroupChat} onCloseCreateGroupChat={onCloseCreateGroupChat}/>
            <Box bg="white" w="75%" minWidth="50%" borderLeft="1px solid rgb(229,229,229)">
                { currentChat ? (
                <Flex flexDirection="column" justifyContent='stretch' height='100vh'>
                    <Flex height='8.4%' flexDirection="row" justifyContent="flex-start" borderBottom='1px solid rgb(229,229,229)' py={3}>
                            <Flex w='80%' ml={4} onClick={() => setSideBox(true) }>
                                <Box>
                                    <Avatar src={currentChat.users[0].displayPicture} boxSize="40px" borderRadius="50%"></Avatar>
                                </Box>
                                <Text fontSize='lg' ml={3}>{currentChat.chatName}</Text>
                            </Flex>
                    </Flex>
                    <Flex height='84%' justifyContent='center' alignItems='center'>BC</Flex>
                    <Flex height='7.6%' px={2}>
                        <Button variant='flushed' _hover={{backgroundColor: "rgba(229,229,229)"}}><Icon as={InsertEmoticonIcon}/></Button>
                        <Input placeholder="Type a Message"/>
                        <Button>Send</Button>
                    </Flex>
                </Flex>)
                : <Flex minHeight="100vh" justifyContent="center" alignItems="center" as='Text' fontSize="xl">Click on the chats to get started</Flex>}
            </Box>
            {sidebox && <Box bg="white" w='25%' minWidth="25%" >
                <Text>Box 3</Text>
            </Box>}
        </Flex>
    </>
)}


export default Chatscreen;
