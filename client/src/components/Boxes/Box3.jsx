import React from 'react'
import { Avatar, Box, Button, DrawerHeader, Flex, Heading, IconButton,Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { CloseIcon } from '@chakra-ui/icons'

const Box3 = ({setSideBox}) => {
    const chatCurrentSet = useSelector(state => state.chatCurrentSet)
    const { currentChat } = chatCurrentSet
    return (
        <Box bg="white" w='25%' minWidth="25%" borderLeft="1px solid rgb(229,229,229)">
            <Flex justifyContent='center' alignItems='center' flexDirection='column' w='100%'>
                <Flex width='100%' py={4} px={2} alignItems='center'>
                    <Box>
                        <IconButton size='sm' variant='ghost' onClick={() => setSideBox(false)} icon={<CloseIcon opacity='80%'/>}/>
                    </Box>
                    <Text fontSize='xl' fontWeight='semibold' ml={3}>Contact Info</Text>
                </Flex>
                <Avatar size='2xl' mt={6}></Avatar>
                <Text as='h3'>Name</Text>
                <Text>exmaple@gmail.com</Text>
            </Flex>
        </Box>
    )
}

export default Box3