import React, { useEffect, useState } from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, Flex, Input, Skeleton, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../actions/userActions';
import Userloading from './UserLoading';

const SidebarCreateChat = ({isOpenCreateChat, onCloseCreateChat, btnRef2}) => {
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const userSearch = useSelector(state => state.userSearch)
    const { loading, users, error } = userSearch 
    const inputHandler = (e) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        if(search !== ""){
            dispatch(searchUser(search))
        }
    }, [inputHandler])
    return (
        <Drawer
            isOpen={isOpenCreateChat}
            placement='left'
            onClose={onCloseCreateChat}
            finalFocusRef={btnRef2}
            size='sm'
            >
            <DrawerContent shadow="none" w='25%' maxW='25%'>
                <DrawerHeader>
                    <Flex>
                        <Button variant="flushed" onClick={onCloseCreateChat} _focus={{outline: "none"}}>
                            <ArrowBackIcon/>
                        </Button>
                    </Flex>
                </DrawerHeader>
                <DrawerBody>
                    <Container>
                        <Input variant="filled" placeholder='Type here...' borderRadius="20px" value={search} onChange={inputHandler}/>
                    </Container>
                    {loading ? <Userloading/> : <span>results</span> }
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default SidebarCreateChat 
