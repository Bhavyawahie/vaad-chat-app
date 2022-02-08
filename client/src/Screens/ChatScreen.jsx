import React, { useState, useEffect, useRef } from "react";
import { EditIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Sidebarprofile from "../components/SidebarProfile";
import SidebarCreateChat from "../components/SidebarCreateChat";

const Chatscreen = ({ history }) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isOpen: isOpenCreateChat, onOpen: onOpenCreateChat, onClose: onCloseCreateChat} = useDisclosure()
    const btnRef = useRef()
    const btnRef2 = useRef()
    const localSearchInput = useRef(null)
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    useEffect(() => {
        if (!userInfo) {
            history.push("/")
        }
    }, [userInfo, history])
    const logoutHandler = () => {
        console.log('i was clicked!')
    }
    const searchButtonClickHandler = () => {
        localSearchInput.current.focus()
    }
    return (
    <>
        <Flex height='100vh'>
            <Box w="25%" minWidth='25%'>
                <Flex flexDirection="column" pt={2}>
                    <Container py={2}>
                        <Flex flexDirection="row">
                            <Box py={1} pr={2}>
                                    <Avatar as='button' name="sample user" src="https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg" boxSize="40px" borderRadius="50%" onClick={onOpen} _focus={{outline: 'none'}}/>            
                            </Box>
                            <Heading d={{base: "none", lg: "flex"}} size="lg" py={1}>Chats</Heading>
                            <Spacer/>
                            <Button  onClick={onOpenCreateChat} variant='flush' w='1' borderRadius="full" bgColor="#EDF2F7"><EditIcon/></Button>
                            <Box>
                                <Flex p={2}>
                                    <Menu borderRadius="50%">
                                        <MenuButton>Menu</MenuButton>
                                        <MenuList>
                                            <MenuItem color="blackAlpha.400">1</MenuItem>
                                            <MenuItem color="blackAlpha.400">2</MenuItem>
                                            <MenuItem color="blackAlpha.400">4</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            </Box>
                        </Flex>
                    </Container>
                    <Container>
                        <InputGroup my={2} variant='filled'>
                            <InputLeftElement borderRadius="25px"><Button variant="flush" onClick={searchButtonClickHandler} _focus={{outline: "none"}}><SearchIcon color="blackAlpha.400"/></Button></InputLeftElement>
                            <Input ref={localSearchInput} placeholder="Search" borderRadius="25px"/>
                        </InputGroup>
                    </Container>
                </Flex>
            </Box>
                    <Sidebarprofile isOpen={isOpen} onClose={onClose} btnRef={btnRef}/>
                    <SidebarCreateChat isOpenCreateChat={isOpenCreateChat} onCloseCreateChat={onCloseCreateChat} btnRef2={btnRef2}/>
            <Box bg="white" w="75%" minWidth="50%" borderLeft="1px solid rgb(229,229,229)">
                <Text>Box 2</Text>
            </Box>
            {false && <Box bg="white" w='25%' minWidth="25%" >
                <Text>Box 3</Text>
            </Box>}
        </Flex>
    </>
)}


export default Chatscreen;
