import React from 'react'
import Header from '../components/Header'
import { Box, Button, Container, Flex, Heading, Image, Input, Spacer, Stack, VStack } from '@chakra-ui/react'
import image from '../image.png'


const homeScreen = ({history, location}) => {
    // useEffect(() => {
    //     if(userInfo){
    //         history.push('/chats')
    //     }
    // }, [userInfo, history])
    return (
        <>
            <Header location={location}/>
            <Flex>
                <Container maxW="container.xl" mt={4}>
                    <Flex>
                        <Flex flexDirection="column">
                            <Box mt={16} ml={10}>
                                <Heading as='h1' size="4xl">
                                    Hang out,<br /> anytime, <br /> anywhere    
                                </Heading>
                            </Box>
                            <Box mt={12} ml={10}>
                                <VStack>
                                    <Input placeholder='Email Address'type="email" borderRadius="xl" variant="filled" />
                                    <Input placeholder='Password' type="password" borderRadius="xl" variant="filled" />
                                </VStack>
                            </Box>
                            <Flex mt={4} ml={10}>
                                <Box>
                                    <Button bg="#9F08FF" color='white' borderRadius="2xl">Login</Button>
                                </Box>
                            </Flex>
                        </Flex>
                        <Spacer/>
                        <Box>
                            <Image src={image} boxSize='660px'/>
                        </Box>
                    </Flex>
                </Container>
            </Flex>
        </>
    )
}

export default homeScreen
