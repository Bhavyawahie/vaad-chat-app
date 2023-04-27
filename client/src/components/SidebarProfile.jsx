import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent,  DrawerHeader, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import {updateDisplayPicture} from '../actions/userActions'
import { USER_DISPLAYPICTURE_UPDATE_RESET } from '../constants/userConstants';

const Sidebarprofile = ({isOpen, onClose}) => {
    const toast = useToast()
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const userDisplayPictureUpdate = useSelector(state => state.userDisplayPictureUpdate)
    const {loading, success, error} = userDisplayPictureUpdate
    const uploadImageHandler = (picture) => {
        dispatch(updateDisplayPicture(picture))
    }
    return (
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            size='sm'
            >
            <DrawerContent shadow="none" w='25%' maxW='430px'>
            {error && (() => {
                    toast({position: "top-right", title: `${error}`, status: "error", isClosable: true, duration: "3000"}) 
                    dispatch({type: USER_DISPLAYPICTURE_UPDATE_RESET})
                    })()
            }
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
                            {loading ? <Flex w='8rem' h='8rem' justifyContent='center' alignItems='center'><Spinner thickness='4px'speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/></Flex> :(
                                <>
                                    <Avatar name={userInfo.name} src={userInfo.displayPicture} size='2xl' />
                                    <label for="icon-button-file" className='icon-button-file-label'>
                                    <input id="icon-button-file" type='file' accept='image/*' onChange={(e) => uploadImageHandler(e.target.files[0]) } />
                                    <Box>
                                        <PhotoCamera />
                                    </Box>
                                    </label>
                                </>)}
                        </Box>
                        <Text fontSize='2xl'>{userInfo.name}</Text>
                        <Text fontSize='lg'>{userInfo.email}</Text>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default Sidebarprofile;
