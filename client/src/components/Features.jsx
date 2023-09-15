import React from 'react'
import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    useMediaQuery
} from '@chakra-ui/react'
import side1 from '../img/mockup_2.png'
import side2 from '../img/mockup_3.png'


const Features = () => {
    const [isLargerThan425] = useMediaQuery('(min-width: 426px)')
    return (
        <Container maxW={'5xl'} mt={isLargerThan425 ? 16 : 4} mb={20}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Flex direction={'column'} justify={'center'} spacing={4}>
                    <Heading my={4}>Communicate more efficiently by using <br/><span className="chakra-text css-9tyv4a"> Vaad.</span></Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        Send messages easily using just your browser and with a myriad of features that can make your experience different from other applications.
                    </Text>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
                        }>
                    </Stack>
                </Flex>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={side1}
                        objectFit={'cover'}
                        boxShadow={'sm'}
                    />
                </Flex>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={24}>
                <Flex flexDir={'column'} justify={'center'} spacing={4} order={isLargerThan425 ? '2' : ''}>
                    <Heading  my={4}>Send messages in <br/><span className="chakra-text css-9tyv4a">Real-Time</span>, without any delay between us</Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        Enjoy seamless and instant messaging with effortless convenience. Enhance the joy of communication with faster, delay-free message delivery.
                    </Text>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
                        }>
                    </Stack>
                </Flex>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={side2}
                        objectFit={'cover'}
                        boxShadow={'sm'}
                    />
                </Flex>
            </SimpleGrid>
        </Container>
    )
}

export default Features