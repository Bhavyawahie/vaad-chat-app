import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import { Avatar, Box, Button ,Flex, Icon, Input, Text } from '@chakra-ui/react'

const Box2 = ({setSideBox}) => {
    const chatCurrentSet = useSelector(state => state.chatCurrentSet)
    const {currentChat} = chatCurrentSet
    return (
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
    )
}

export default Box2