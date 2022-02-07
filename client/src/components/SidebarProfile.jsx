import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, Input } from '@chakra-ui/react';
import React from 'react';

const Sidebarprofile = ({isOpen, onClose, btnRef}) => {
    return (
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
            size='sm'
            >
            <DrawerContent shadow="none" w='25%' maxW='25%'>
                <DrawerCloseButton/>
                <DrawerHeader>Create your account</DrawerHeader>
                <DrawerBody>
                    <Input placeholder='Type here...' />
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
