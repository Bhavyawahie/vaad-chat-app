import React, { useEffect, useRef, useState } from 'react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, Flex, IconButton, Input, Skeleton, StackDivider, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../actions/userActions';
import Userloading from './UserLoading';
import UserListItem from './UserListItem';
import { USER_SEARCH_RESET } from '../constants/userConstants';
import { createOneToOneChat } from '../actions/chatActions';
import UserBadgeItem from './UserBadgeItem';

const SidebarCreateGroupChat = ({isOpenCreateGroupChat, onCloseCreateGroupChat}) => {
    const btnRef = useRef()
    const [search, setSearch] = useState("")
    const [notSubmitted, setNotSubmitted] = useState(true)
    const [groupName, setGroupName] = useState("")
    const [groupParticipants, setGroupParticipants] = useState([])
    const dispatch = useDispatch()
    const userSearch = useSelector(state => state.userSearch)
    const { loading, users, error } = userSearch 
    const inputHandler = (e) => {
        setSearch(e.target.value)
    }
    const chatParticipantsHandler = (userId) => {
        setGroupParticipants(prevVal => {
            return [...prevVal, userId]
        })
        setSearch("")
        dispatch({type: USER_SEARCH_RESET})
        // dispatch(createOneToOneChat(userId))
        // onCloseCreateChat()
    }
    const chatParticipantsCheckOffHandler = (userId) => {
        setGroupParticipants(prevVal => prevVal.filter(user => user._id !== userId))
    }
    const drawerResetHandler = () => {
        onCloseCreateGroupChat()
        setSearch("")
        dispatch({type: USER_SEARCH_RESET})
        setGroupParticipants([])
        setNotSubmitted(true)
    }
    useEffect(() => {
        if(search !== "") {
            dispatch(searchUser(search))
        } else{
            dispatch({type: USER_SEARCH_RESET})
        }
    }, [search])
    useEffect(() => {
        console.log(groupParticipants)
    }, [groupParticipants])
    
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
                            <Button variant="flushed" onClick={() => drawerResetHandler()} _focus={{outline: "none"}}>
                                <ArrowBackIcon/>
                            </Button>
                            <Text p={1}>{ notSubmitted ? `Add Participant` : `hi`}</Text>
                        </Flex>
                    </DrawerHeader>
                    {notSubmitted ? <DrawerBody overflow='hidden'>
                        <Container>
                            <Input variant="filled" placeholder='Type here...' borderRadius="20px" mb={5} value={search} onChange={inputHandler} ref={btnRef}/>
                        </Container>
                        <Container maxH='20vh' overflowY='scroll' mt={2} mb={4}>
                            {
                                groupParticipants.map(participant => (
                                    <Flex display='inline-flex'>
                                        <UserBadgeItem
                                            key={participant._id}
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
                                <IconButton variant='solid' backgroundColor='#cee5f2' size='lg' position='absolute'><ArrowForwardIcon onClick={(e) => setNotSubmitted(false)} /></IconButton>
                            </Flex>
                        )}
                    </DrawerBody> : (
                        <DrawerBody>
                            <Flex alignItems="center" justifyContent="center">Hi Bc</Flex>
                        </DrawerBody>
                    )}
                </DrawerContent>
            </Drawer>
    )
}

export default SidebarCreateGroupChat