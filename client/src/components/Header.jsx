import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Container, Flex, Heading, Spacer, Text } from '@chakra-ui/react'

const Header = ({location}) => {
    return (
        <Flex boxShadow='sm'>
            <Container maxW='container.xl'>
                <Flex>
                    <Box p={4} color='black' display='flex' alignItems='flex-end'>
                        <Link to='/'>
                            <Heading as='h1' size='xl' pl={3} bgGradient={'linear(to-t, cyan.600, cyan.100)'} bgClip='text' className='brand'>Vaad</Heading>
                        </Link>
                    </Box>
                        <Spacer/>
                    {location.pathname === '/' && <Box p={4} display='flex'>
                        <Link to='#privacy'>
                            <Text ml={2} p={2}>Privacy</Text>
                        </Link>
                        <Link to={location.pathname === '/' ? '/login' : '/'}>
                            <Button ml={2} p={2} variant='solid' bg={'cyan.600'} color='#FFFFFF'>{location.pathname === '/' ? "Login": ""}</Button>
                        </Link>
                    </Box>}    
                </Flex>
            </Container>
        </Flex>
    )
}

export default Header