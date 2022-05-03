import React, { useState, useEffect, useRef } from "react"
import { Flex, useDisclosure } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import Box1 from "../components/Boxes/Box1"
import Box2 from "../components/Boxes/Box2"
import Box3 from "../components/Boxes/Box3"
import Sidebarprofile from "../components/SidebarProfile"
import SidebarCreateChat from "../components/SidebarCreateChat"
import SidebarCreateGroupChat from "../components/SidebarCreateGroupChat"

const Chatscreen = ({ history }) => {
    const [sidebox, setSideBox] = useState(false)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isOpen: isOpenCreateChat, onOpen: onOpenCreateChat, onClose: onCloseCreateChat} = useDisclosure()
    const {isOpen: isOpenCreateGroupChat, onOpen: onOpenCreateGroupChat, onClose: onCloseCreateGroupChat} = useDisclosure()
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
        if (!userInfo) {
            history.push("/")
        } 
    }, [userInfo, history])
    return (
    <>
        {userInfo && (
            <Flex height='100vh' overflowY='hidden'>
                <Box1
                    setSideBox={setSideBox}
                    isOpen={isOpen} 
                    onOpen={onOpen} 
                    onClose={onClose}
                    isOpenCreateChat={isOpenCreateChat}
                    onOpenCreateChat={onOpenCreateChat}
                    onCloseCreateChat={onCloseCreateChat}
                    isOpenCreateGroupChat={isOpenCreateGroupChat}
                    onOpenCreateGroupChat={onOpenCreateGroupChat}
                    onCloseCreateGroupChat={onCloseCreateGroupChat}
                />
                <Sidebarprofile isOpen={isOpen} onClose={onClose}/>
                <SidebarCreateChat isOpenCreateChat={isOpenCreateChat} onCloseCreateChat={onCloseCreateChat}/>
                <SidebarCreateGroupChat isOpenCreateGroupChat={isOpenCreateGroupChat} onCloseCreateGroupChat={onCloseCreateGroupChat}/>
                <Box2 setSideBox={setSideBox}/>
                {sidebox && <Box3 setSideBox={setSideBox} />}
            </Flex>
        )} 
    </>
)}


export default Chatscreen