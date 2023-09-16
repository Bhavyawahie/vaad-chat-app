import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Container, Flex, Heading, Spacer, Text, useMediaQuery } from '@chakra-ui/react'

const Header = ({location}) => {
    const flag = ['/login', '/register'].includes(location.pathname)
    const [isLargerThan1440] = useMediaQuery('(min-width: 1439px)')
    return (
        <Flex boxShadow={isLargerThan1440 ? '' :'sm'} position={flag && 'absolute'}>
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