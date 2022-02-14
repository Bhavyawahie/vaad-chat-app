import React from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

const UserListItem = ({id, name, email, displayPicture, initiateChat}) => {
    console.log()
    return (
            <Flex w='100%' px={3} py={.5} flexDirection='row' borderRadius='10px' _hover={{backgroundColor: "#EDF2F7"}} onClick={() => initiateChat(id)}>
                <Box py={1} mr={4}>
                    <Avatar name={name} src={displayPicture}/>
                </Box>
                <Box>
                    <Text>{name}</Text>
                    <Text>{email}</Text>
                </Box>
            </Flex>
    )
}

export default UserListItem