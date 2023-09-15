import React from 'react';
import {
    Box,
    Heading,
    Flex,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    Image,
    useColorModeValue,
    createIcon,
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';


const HeroSection = () => {
    return (
    <Container as='flex' maxW={'3xl'} dir={'row'} bg={'white'}>
        <Flex>
        <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}>
                Experience Messaging 
                <Text as={'span'} color={'cyan.300'}>
                    {" "} Reimagined:
                </Text> Connect, Share, and Thrive
            </Heading>
            <Text color={'gray.500'}>
            "Unlock a world of seamless communication. Our feature-packed messaging app empowers you to connect, share, and thrive, all in one place."
            </Text>
            <Stack
                direction={'column'}
                spacing={3}
                align={'center'}
                alignSelf={'center'}
                position={'relative'}>
                <Link to='/register'>
                    <Button
                    colorScheme={'blue'}
                    bg={'cyan.400'}
                    rounded={'full'}
                    px={6}
                    _hover={{
                        bg: 'cyan.500',
                    }}>
                        Sign Up
                    </Button>
                </Link>
                <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                    <a href="#features">Learn more</a>
                </Button>
            </Stack>
        </Stack>
        </Flex>
    </Container>
    )
}

export default HeroSection