import React, { useEffect, useRef, useState } from 'react'
import { ArrowBackIcon, ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Container, Drawer, DrawerBody, DrawerContent, DrawerHeader, Flex, IconButton, Input, Text, Tooltip, useToast, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../actions/userActions';
import Userloading from './UserLoading';
import UserListItem from './UserListItem';
import { USER_SEARCH_RESET } from '../constants/userConstants';
import { createGroupChat } from '../actions/chatActions';
import UserBadgeItem from './UserBadgeItem';
import groupIcon from '../img/groupIcon.png'

const SidebarCreateGroupChat = ({isOpenCreateGroupChat, onCloseCreateGroupChat}) => {
    const toast =  useToast()
    const btnRef = useRef()
    const [search, setSearch] = useState("")
    const [notSubmitted, setNotSubmitted] = useState(true)
    const [groupName, setGroupName] = useState("")
    const [groupParticipants, setGroupParticipants] = useState([])
    const dispatch = useDispatch()
    const userSearch = useSelector(state => state.userSearch)
    // eslint-disable-next-line no-unused-vars
    const { loading, users, error } = userSearch 
    const inputHandler = (e) => {
        setSearch(e.target.value)
    }
    const chatParticipantsHandler = (userId) => {
        const isDuplicate = (data, obj) => data.some((el) => Object.entries(obj).every(([key, value]) => value === el[key]))
        setGroupParticipants(prevVal => {
            if(!isDuplicate(prevVal, userId)){
                return [...prevVal, userId]
            } else {
                toast({position: "top-right", title: `User Already Added`, status: "warning", duration: "3000"}) 
                return [...prevVal]
            }
        })
        setSearch("")
        dispatch({type: USER_SEARCH_RESET})
    }
    const chatParticipantsCheckOffHandler = (userId) => {
        setGroupParticipants(prevVal => prevVal.filter(user => user._id !== userId))
    }
    const drawerResetHandler = () => {
        onCloseCreateGroupChat()
        setSearch("")
        dispatch({type: USER_SEARCH_RESET})
        setGroupParticipants([])
        setGroupName("")
        setNotSubmitted(true)
    }
    const groupChatHandler = () => {
        const groupParticipantsIds = groupParticipants.map(({_id}) => _id)
        console.log(groupParticipantsIds)
        dispatch(createGroupChat(groupParticipantsIds, groupName))
        drawerResetHandler()
    }
    useEffect(() => {
        if(search !== "") {
            dispatch(searchUser(search))
        } else{
            dispatch({type: USER_SEARCH_RESET})
        }
    }, [dispatch, search])
    // useEffect(() => {
    //     console.log(groupParticipants)
    // }, [groupParticipants])
    
    return (
        <Drawer
            isOpen={isOpenCreateGroupChat}
            placement='left'
            onClose={onCloseCreateGroupChat}
            initialFocusRef={btnRef}
            size='sm'
            onOverlayClick={() => drawerResetHandler()}
            >
            <DrawerContent shadow="none" w='25%' maxW='25%'>
                    <DrawerHeader>
                        <Flex>
                            <Button variant="flushed" onClick={() => notSubmitted ? drawerResetHandler() : setNotSubmitted(true)} _focus={{outline: "none"}}>
                                <ArrowBackIcon/>
                            </Button>
                            <Text p={1}>{ notSubmitted ? `Add Participant` : `New group`}</Text>
                        </Flex>
                    </DrawerHeader>
                    {notSubmitted ? <DrawerBody overflow='hidden'>
                        <Container>
                            <Input variant="filled" placeholder='Type here...' borderRadius="20px" mb={5} value={search} onChange={inputHandler} ref={btnRef}/>
                        </Container>
                        <Container maxH='20vh' overflowY='scroll' mt={2} mb={4}>
                            {
                                groupParticipants.map(participant => (
                                    <Flex display='inline-flex' key={participant._id}>
                                        <UserBadgeItem
                                            participant={participant}
                                            strikeOff={chatParticipantsCheckOffHandler}
                                        />
                                    </Flex>
                                ))
                            }
                        </Container>
                            <VStack spacing={2} overflow='scroll' height='3xs'>
                                {loading ? <Userloading/> : (
                                    users.map(user => (
                                        <UserListItem
                                            key={user._id}
                                            user={user}
                                            initiateChat={chatParticipantsHandler}
                                        />
                                    ))
                                )}
                            </VStack>
                        { groupParticipants.length >= 2 && (
                            <Flex justifyContent='center' alignItems='center'>
                                <IconButton variant='solid' backgroundColor='#cee5f2' size='lg' position='absolute' onClick={() => setNotSubmitted(false)}><ArrowForwardIcon/></IconButton>
                            </Flex>
                        )}
                    </DrawerBody> : (
                        <DrawerBody>
                            <Flex alignItems="center" justifyContent="center" flexDirection='column'>
                                <Box my={8}>
                                    <Tooltip label='Default Group-icon' placement='right-end'>
                                        <Avatar size='2xl' src={groupIcon} my={2} />
                                    </Tooltip>
                                </Box>
                                <Container>
                                    <Input variant='flushed' placeholder='Group Subject' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                                </Container>
                                {groupName.length >= 1 && <Flex justify='center' alignItems='center' mt={10}>
                                    <IconButton bg='#cee5f2' onClick={groupChatHandler} py={5}>
                                        <CheckIcon/>
                                    </IconButton>
                                </Flex>}
                            </Flex>
                        </DrawerBody>
                    )}
                </DrawerContent>
            </Drawer>
    )
}

export default SidebarCreateGroupChat