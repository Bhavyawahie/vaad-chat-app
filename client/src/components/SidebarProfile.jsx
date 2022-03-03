import { ArrowBackIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

const Sidebarprofile = ({isOpen, onClose}) => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    return (
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            size='sm'
            >
            <DrawerContent shadow="none" w='25%' maxW='25%'>
            <DrawerHeader>
                    <Flex>
                        <Button variant="flushed" onClick={onClose} _focus={{outline: "none"}}>
                            <ArrowBackIcon/>
                        </Button>
                        <Text p={1}>Profile</Text>
                    </Flex>
                </DrawerHeader>
                <DrawerBody>
                    <Flex flexDir='column' alignItems='center' justifyContent='center'>
                        <Box my={8} position='relative'>
                            <Avatar name={userInfo.name} src={userInfo.displayPicture} size='2xl'/>
                                <label for="icon-button-file" className='icon-button-file-label'>
                                    <Input id="icon-button-file" type="file" accept='image/*'/>
                                    <IconButton aria-label="upload picture" isRound variant='ghost' width='8rem' height='8rem'>
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                        </Box>
                        <Text>{userInfo.name}</Text>
                    </Flex>
                </DrawerBody>
                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
                    <Button colorScheme='blue'>Save</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default Sidebarprofile;
